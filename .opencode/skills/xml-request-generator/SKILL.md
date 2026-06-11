---
name: xml-request-generator
description: Generate multiple XML/SOAP test requests with systematic variations, based on a user-provided example XML. Optionally validates output against a provided XSD/WSDL.
license: MIT
compatibility: opencode
metadata:
  audience: testers
  workflow: testing
---

# XML/SOAP Request Generator

This skill generates multiple XML or SOAP request files with systematic field variations for testing purposes. It works entirely from a user-provided example XML — no hardcoded schema knowledge, no external tools required.

## Prerequisites

The skill runs entirely within opencode using the LLM. No Node.js or Python is needed.

**XSD validation (Step 6)** uses one of two bundled scripts — tried in this order:

1. **PowerShell** (`validate-xsd.ps1`) — requires PowerShell 7+ (`pwsh`) on the PATH. Uses .NET `System.Xml.Schema`; no extra packages needed.
2. **Node.js** (`validate-xsd.js`) — requires Node.js (`node`) on the PATH. Uses `libxmljs2`, which is auto-installed on first run via `npm install`.

If neither runtime is available, Step 6 falls back to LLM-based schema review.

## Inputs

Provide at least one of the following before starting:

| Input | Required | Purpose |
|---|---|---|
| Example XML file | **Yes** | Serves as the generation template |
| XSD file | No | Used for output validation |
| WSDL file | No | Used to verify operation names and namespaces |

## Workflow

The skill follows these steps. opencode executes each step in sequence and confirms completion before moving to the next.

---

### Step 1 — Read the example XML

Read the provided example XML file in full. Do not modify it yet. Identify and display:

- The root element and all namespaces
- All leaf elements (elements that contain a value, not child elements)
- All XML attributes that carry values
- Repeated structures (elements that appear more than once, e.g. list items)

Present the list of identified leaf elements to the user in a numbered format.

---

### Step 2 — Select fields to vary

Ask the user: **"Which of these fields should vary across the generated requests?"**

The user may answer by number, name, or description. Accept partial answers and ask follow-up questions if needed (e.g. "Should this field use fixed values, a range, or a list?").

For each selected field, collect:

- **Values**: a list of allowed values, a numeric range, or a pattern (e.g. dates)
- **Role** (optional): a short label describing what this field controls (e.g. "tax rate", "cost center")

**Actively check for calculated dependencies between fields.** Common patterns in financial/accounting XML:

| If this field varies … | … it may affect |
|---|---|
| Position `betrag` | `belegbetrag` (must equal the sum of all position amounts) |
| Position `betrag` with `brutto=true` | `aobjKontierungen/betrag` (must be the net amount = betrag ÷ (1 + tax rate)) |
| Number of `belPositionen` elements | `belegbetrag` (recalculate sum) |

For each dependency found, ask the user explicitly:
- Should the dependent field be **recalculated automatically** (e.g. `belegbetrag` = sum of positions)?
- Or should the user **specify the value manually** for each request?
- Or should the dependency be **ignored** (only appropriate for deliberate error-injection tests)?

Document the user's decision before proceeding to Step 3.

Do not proceed to Step 3 until at least one field with at least two values is defined.

---

### Step 3 — Define variation strategy

Ask the user how the values should be combined:

- **Combinatorial**: generate one request per combination of all selected field values (can produce many files)
- **Round-robin**: cycle through each field's values independently, generating exactly N requests
- **Business cases**: the user describes named scenarios (e.g. "gross booking with 19% VAT"), each becoming one or more requests

If the user chooses combinatorial, calculate and display the total number of combinations before proceeding. Ask for confirmation if the number exceeds 20.

---

### Step 4 — Confirm output settings

Ask the user:

1. **Output directory**: where should the files be saved? (default: `generated_requests/`)
2. **Filename pattern**: how should files be named? Suggest a pattern based on the varying fields, e.g. `request_001_<fieldvalue>.xml`. The user may accept or change it.
3. **Number of requests**: only relevant for round-robin strategy.

---

### Step 5 — Generate requests

For each request to be generated:

1. Start from the exact content of the example XML (treat it as the canonical template).
2. Replace only the selected field values with the values for this request. Leave all other elements, attributes, namespaces, and formatting unchanged.
3. For repeated structures (e.g. list items): ask the user in Step 2 whether the number of repetitions should also vary. If yes, add or remove repetitions as needed while preserving element names and structure.
4. Write the file to the output directory using the confirmed filename pattern.

After all files are written, display a summary table:

| # | Filename | Varied field values |
|---|---|---|
| 1 | request_001_... | field=value, field=value |
| ... | ... | ... |

---

### Step 6 — Validate against XSD (optional)

Only execute this step if the user has provided an XSD file.

#### 6a — PowerShell validation (preferred)

Check whether PowerShell 7+ is available by running:

```
pwsh --version
```

If available, run the bundled script `validate-xsd.ps1` (located in the same directory as this SKILL.md) via the bash tool:

```
pwsh -File "<skill_dir>/validate-xsd.ps1" `
     -XsdPath   "<path/to/schema.xsd>" `
     -XmlFolder "<path/to/output_folder>"
```

The script uses .NET's `System.Xml.Schema` engine — no npm packages or external tools required. It prints one line per file (`[OK]` or `[FAIL]` with error details) and exits with code 1 if any file is invalid.

> **Scope note:** .NET's `XmlReader` with `ValidationType = Schema` validates only elements that belong to the loaded `targetNamespace`. Elements from other namespaces — such as `soapenv:Envelope`, `soapenv:Header`, and `wsse:Security` — are silently skipped. This means the SOAP envelope structure is **not** checked; only the business payload elements (e.g. `rw:insertBeleg` and its children) are validated. This is sufficient for verifying that generated field values conform to the schema.

#### 6b — Node.js validation (if PowerShell is unavailable)

Check whether Node.js is available by running:

```
node --version
```

If available, run the bundled script `validate-xsd.js` (located in the same directory as this SKILL.md):

```
node <skill_dir>/validate-xsd.js \
     --xsd    <path/to/rechnungswesen-training.xsd> \
     --folder <path/to/output_folder>
```

The script uses **libxmljs2** (libxml2 bindings). If the package is not yet installed it is auto-installed via `npm install` into a `node_modules/` folder next to the script — no manual setup required.

**How SOAP envelopes are handled:** libxmljs2 requires the XML root element to be declared in the schema. Since the business XSD does not cover the `soapenv:Envelope` root, the script automatically extracts every direct child of `soapenv:Body`, re-injects the necessary namespace declarations, and validates each fragment individually against the business XSD. This gives accurate per-operation validation without needing a separate SOAP wrapper schema.

> **Native bindings warning:** libxmljs2 contains a compiled C++ addon. `npm install` may fail on systems that lack build tools (`node-gyp`, Python, MSVC/GCC). This is common on locked corporate Windows machines. If installation fails, skip this step and proceed to **6c** (LLM fallback). The error will be visible in the `[setup]` output line.

#### 6c — LLM-based fallback (if neither PowerShell nor Node.js is available)

For each generated file:

1. Read the XSD and the generated XML.
2. Check the following against the XSD:
   - All required elements are present
   - Element names match the schema exactly (case-sensitive)
   - Element order matches the schema where sequence is enforced
   - Data types are consistent with the schema (e.g. numeric fields contain numbers, boolean fields contain `true` or `false`)
   - No elements are present that are not defined in the schema
3. Report any violations per file. If a file is invalid, state the specific element or value that caused the violation.

#### WSDL verification (either path)

If a WSDL was also provided, additionally verify:
- The operation name in the request matches an operation defined in the WSDL
- The target namespace in the request matches the namespace declared in the WSDL

#### Summary table

After validation (via either method), display:

| Filename | Valid | Issues |
|---|---|---|
| request_001_... | ✓ | — |
| request_002_... | ✗ | `<betrag>` contains non-numeric value |

---

## Notes for the LLM

- Never infer field semantics from field names. Treat all fields as opaque strings unless the user explicitly describes their meaning.
- Never add, remove, or rename XML elements beyond what the user requested.
- If a field value change affects a calculated field (e.g. a net amount derived from a gross amount and a tax rate), ask the user explicitly whether the dependent field should also be updated, and if so, how.
- If the example XML contains placeholder-like values (e.g. `0`, `true`, empty strings), point these out in Step 1 and ask whether they should be treated as fixed or as candidates for variation.
- Keep the XML declaration (`<?xml version="1.0" encoding="UTF-8"?>`) and all namespace declarations exactly as in the example.

---

## Notes for self-hosted / open-source LLMs

This skill is designed to run under any LLM that can call tools (bash, file read/write). When running on a self-hosted model (e.g. GPT-OSS 120B, Llama, Mistral), keep the following in mind:

### Context window
- Steps 1–5 can produce large outputs (full XML files, summary tables). If the model's context window is limited, **complete and confirm each step before requesting the next one**. Do not try to execute multiple steps in a single turn.
- When generating many files (combinatorial strategy with > 10 combinations), write them to disk immediately using the Write tool rather than printing them all to the chat. Reference them by filename in the summary table.

### Tool use reliability
- Always verify that a tool call succeeded before proceeding. If the bash tool returns a non-zero exit code or an error message, report it to the user and stop — do not silently continue.
- For Step 6, check `node --version` and `pwsh --version` with separate bash calls before deciding which validation path to use. Do not assume either is available.

### Numeric precision
- When recalculating dependent fields (e.g. net = gross ÷ 1.19), round to exactly 2 decimal places using standard commercial rounding (round half up). Show the calculation explicitly in the summary so the user can verify it.

### Strict instruction following
- The field lists provided by the user in Steps 2 and 3 are exhaustive. Do not add extra fields, change field names, or introduce new XML elements not present in the template — even if they appear beneficial.
