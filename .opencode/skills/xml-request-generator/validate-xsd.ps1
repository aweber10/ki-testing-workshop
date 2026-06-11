<#
.SYNOPSIS
    Validates one or more XML files against an XSD schema using .NET's built-in
    System.Xml validation engine (no external tools or npm packages required).

.DESCRIPTION
    Loads the given XSD file once, then validates every *.xml file in the
    specified folder. Reports VALID or INVALID (with detailed error messages)
    for each file and returns exit code 1 if any file fails validation.

.PARAMETER XsdPath
    Absolute or relative path to the XSD schema file.

.PARAMETER XmlFolder
    Folder that contains the generated XML request files to validate.
    Defaults to "generated_requests" relative to the current directory.

.EXAMPLE
    pwsh -File validate-xsd.ps1 `
         -XsdPath  "Schnittstellenspezifikation/rechnungswesen-training.xsd" `
         -XmlFolder "generated_requests"
#>

param(
    [Parameter(Mandatory = $true)]
    [string] $XsdPath,

    [Parameter(Mandatory = $false)]
    [string] $XmlFolder = "generated_requests"
)

# ── Resolve paths ────────────────────────────────────────────────────────────
$XsdPath   = (Resolve-Path $XsdPath).Path
$XmlFolder = (Resolve-Path $XmlFolder).Path

Write-Host ""
Write-Host "XSD  : $XsdPath"
Write-Host "Folder: $XmlFolder"
Write-Host ""

$files = Get-ChildItem -Path $XmlFolder -Filter "*.xml" | Sort-Object Name

if ($files.Count -eq 0) {
    Write-Warning "No *.xml files found in '$XmlFolder'."
    exit 0
}

# ── Build SchemaSet once (outside the loop for efficiency) ───────────────────
# Read targetNamespace from the XSD so Add() receives the correct value.
# .NET's XmlReader validates only elements that belong to the loaded
# targetNamespace; elements from other namespaces (e.g. soapenv:Envelope,
# wsse:Security) are silently skipped — this is intentional and sufficient
# for validating the business payload inside a SOAP envelope.
$xsdDoc   = [xml](Get-Content -LiteralPath $XsdPath -Raw)
$targetNs = $xsdDoc.DocumentElement.GetAttribute("targetNamespace")
# $targetNs may be empty for schemas without a targetNamespace — that is fine.

$schemaSet = New-Object System.Xml.Schema.XmlSchemaSet
$schemaSet.Add($targetNs, $XsdPath) | Out-Null
$schemaSet.Compile()   # eagerly compile once rather than per-file

# ── Validate each file ────────────────────────────────────────────────────────
$results     = @()
$anyInvalid  = $false

foreach ($file in $files) {

    $fileErrors = [System.Collections.Generic.List[string]]::new()

    $settings = New-Object System.Xml.XmlReaderSettings
    $settings.Schemas        = $schemaSet
    $settings.ValidationType = [System.Xml.ValidationType]::Schema

    # Capture every validation warning and error
    $settings.add_ValidationEventHandler({
        param($sender, $e)
        $fileErrors.Add("[$($e.Severity)] $($e.Message)")
    })

    $reader = [System.Xml.XmlReader]::Create($file.FullName, $settings)
    try {
        while ($reader.Read()) {}
    }
    catch {
        $fileErrors.Add("[Fatal] $($_.Exception.Message)")
    }
    finally {
        $reader.Close()
    }

    $valid = ($fileErrors.Count -eq 0)
    if (-not $valid) { $anyInvalid = $true }

    $results += [PSCustomObject]@{
        File   = $file.Name
        Valid  = if ($valid) { "VALID" } else { "INVALID" }
        Errors = $fileErrors
    }
}

# ── Print results ─────────────────────────────────────────────────────────────
$colWidth = ($results | ForEach-Object { $_.File.Length } | Measure-Object -Maximum).Maximum + 2

foreach ($r in $results) {
    $marker = if ($r.Valid -eq "VALID") { "[OK]  " } else { "[FAIL]" }
    Write-Host "$marker $($r.File.PadRight($colWidth)) $($r.Valid)"
    foreach ($err in $r.Errors) {
        Write-Host "       $err"
    }
}

Write-Host ""
$validCount   = ($results | Where-Object { $_.Valid -eq "VALID"   }).Count
$invalidCount = ($results | Where-Object { $_.Valid -eq "INVALID" }).Count
Write-Host "Result: $validCount valid, $invalidCount invalid  (total: $($results.Count))"
Write-Host ""

# Return a non-zero exit code so CI pipelines can detect failures
if ($anyInvalid) { exit 1 } else { exit 0 }
