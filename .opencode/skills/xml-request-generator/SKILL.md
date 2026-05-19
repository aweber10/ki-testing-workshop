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

None. The skill runs entirely within opencode using the LLM. No Node.js, Python, or command-line tools are needed.

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

For each generated file:

1. Read the XSD and the generated XML.
2. Check the following against the XSD:
   - All required elements are present
   - Element names match the schema exactly (case-sensitive)
   - Element order matches the schema where sequence is enforced
   - Data types are consistent with the schema (e.g. numeric fields contain numbers, boolean fields contain `true` or `false`)
   - No elements are present that are not defined in the schema
3. Report any violations per file. If a file is invalid, state the specific element or value that caused the violation.

If a WSDL was also provided, additionally verify:
- The operation name in the request matches an operation defined in the WSDL
- The target namespace in the request matches the namespace declared in the WSDL

After validation, display a summary:

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
