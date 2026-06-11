#!/usr/bin/env node
/**
 * validate-xsd.js
 *
 * Validates every *.xml file in a folder against an XSD schema using libxmljs2
 * (libxml2 bindings for Node.js).
 *
 * If libxmljs2 is not yet installed next to this script, it is installed
 * automatically via `npm install` — no manual setup required.
 *
 * Validation strategy for full SOAP envelopes
 * ─────────────────────────────────────────────
 * libxmljs2's validate() requires the root element to be declared in the
 * schema. SOAP envelopes have a soapenv:Envelope root that is not part of
 * the business schema. The script therefore:
 *   1. Detects whether the document root is a SOAP Envelope.
 *   2. If so, extracts every direct child of soapenv:Body as a fragment,
 *      re-injects any missing namespace declarations, and validates each
 *      fragment individually against the business XSD.
 *   3. If the root is already a business element, validates the whole doc.
 *
 * Usage:
 *   node validate-xsd.js --xsd <schema.xsd> --folder <xml-folder>
 *
 * Exit codes:
 *   0 – all files valid
 *   1 – at least one file invalid (or a fatal error occurred)
 */

'use strict';

const path       = require('path');
const fs         = require('fs');
const { execSync } = require('child_process');

// ── CLI argument parsing ──────────────────────────────────────────────────────
const args     = process.argv.slice(2);
let   xsdPath  = null;
let   xmlFolder = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--xsd'    && args[i + 1]) xsdPath   = path.resolve(args[++i]);
  if (args[i] === '--folder' && args[i + 1]) xmlFolder = path.resolve(args[++i]);
}

if (!xsdPath || !xmlFolder) {
  console.error('Usage: node validate-xsd.js --xsd <schema.xsd> --folder <xml-folder>');
  process.exit(1);
}

// ── Auto-install libxmljs2 if not present ─────────────────────────────────────
const scriptDir  = __dirname;
const modulesDir = path.join(scriptDir, 'node_modules');
const pkgName    = 'libxmljs2';
const pkgDir     = path.join(modulesDir, pkgName);

if (!fs.existsSync(pkgDir)) {
  console.log(`[setup] ${pkgName} not found – running npm install in ${scriptDir} …`);
  try {
    execSync(`npm install ${pkgName}`, { cwd: scriptDir, stdio: 'inherit' });
    console.log(`[setup] ${pkgName} installed.\n`);
  } catch (err) {
    console.error(`[setup] npm install failed: ${err.message}`);
    process.exit(1);
  }
}

// Resolve the module from the local node_modules with proper error handling.
// Using require.resolve() first lets us give a clear message if the package
// was installed but cannot be loaded (e.g. ABI mismatch on a new Node version).
let libxml;
try {
  const pkgMain = require.resolve(pkgName, { paths: [scriptDir] });
  libxml = require(pkgMain);
} catch (loadErr) {
  console.error(`[error] Could not load ${pkgName}: ${loadErr.message}`);
  console.error('        This usually means the native addon was built for a different Node.js version.');
  console.error('        Try: npm install --prefix "' + scriptDir + '" ' + pkgName);
  process.exit(1);
}

// ── Validate inputs ───────────────────────────────────────────────────────────
if (!fs.existsSync(xsdPath))   { console.error(`[error] XSD not found: ${xsdPath}`);        process.exit(1); }
if (!fs.existsSync(xmlFolder)) { console.error(`[error] Folder not found: ${xmlFolder}`);    process.exit(1); }

// ── Load schema ───────────────────────────────────────────────────────────────
const schemaDoc = libxml.parseXml(fs.readFileSync(xsdPath, 'utf8'));

console.log(`XSD   : ${xsdPath}`);
console.log(`Folder: ${xmlFolder}`);
console.log('');

// ── Collect XML files ─────────────────────────────────────────────────────────
const files = fs
  .readdirSync(xmlFolder)
  .filter(f => f.toLowerCase().endsWith('.xml'))
  .sort();

if (files.length === 0) {
  console.warn('[warn] No *.xml files found in the specified folder.');
  process.exit(0);
}

// ── Helper: extract fragments to validate from a document ────────────────────
// For a SOAP envelope: return serialised Body children with namespace decls.
// For everything else: return the full document serialisation as-is.
const SOAP_ENV_NS = 'http://schemas.xmlsoap.org/soap/envelope/';

function extractFragments(xmlDoc) {
  const root = xmlDoc.root();
  const rootNs = root.namespace();

  if (rootNs && rootNs.href() === SOAP_ENV_NS && root.name() === 'Envelope') {
    // SOAP envelope: pick direct children of Body
    const bodyNodes = xmlDoc.find(
      '//*[local-name()="Body" and namespace-uri()="' + SOAP_ENV_NS + '"]/*'
    );
    return bodyNodes.map(node => {
      let xml = node.toString();
      // Re-inject namespace declarations that were on ancestor nodes
      xmlDoc.namespaces().forEach(ns => {
        const prefix = ns.prefix();
        const href   = ns.href();
        const decl   = prefix ? `xmlns:${prefix}="${href}"` : `xmlns="${href}"`;
        if (!xml.includes(decl)) {
          xml = xml.replace(/^(<[^\s>]+)/, `$1 ${decl}`);
        }
      });
      return xml;
    });
  }

  // Not a SOAP envelope – validate the full document
  return [xmlDoc.toString()];
}

// ── Validate each file ────────────────────────────────────────────────────────
let validCount   = 0;
let invalidCount = 0;
const colWidth   = Math.max(...files.map(f => f.length)) + 2;

for (const name of files) {
  const xmlPath = path.join(xmlFolder, name);
  let xmlDoc;

  try {
    xmlDoc = libxml.parseXml(fs.readFileSync(xmlPath, 'utf8'));
  } catch (parseErr) {
    console.log(`[FAIL] ${name.padEnd(colWidth)} INVALID`);
    console.log(`       [ParseError] ${parseErr.message}`);
    invalidCount++;
    continue;
  }

  const fragments = extractFragments(xmlDoc);
  const allErrors = [];

  for (const fragment of fragments) {
    let fragDoc;
    try {
      fragDoc = libxml.parseXml(fragment);
    } catch (e) {
      allErrors.push(`[ParseError] ${e.message}`);
      continue;
    }
    const ok = fragDoc.validate(schemaDoc);
    if (!ok) {
      fragDoc.validationErrors.forEach(e =>
        allErrors.push(`[line ${e.line}] ${e.message.trim()}`)
      );
    }
  }

  if (allErrors.length === 0) {
    console.log(`[OK]   ${name.padEnd(colWidth)} VALID`);
    validCount++;
  } else {
    console.log(`[FAIL] ${name.padEnd(colWidth)} INVALID`);
    allErrors.forEach(e => console.log(`       ${e}`));
    invalidCount++;
  }
}

// ── Summary ───────────────────────────────────────────────────────────────────
console.log('');
console.log(`Result: ${validCount} valid, ${invalidCount} invalid  (total: ${files.length})`);
console.log('');

process.exit(invalidCount > 0 ? 1 : 0);
