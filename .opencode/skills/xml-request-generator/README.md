# XML/SOAP Request Generator — opencode Skill

Dieser Skill generiert mehrere XML- oder SOAP-Testanfragen mit systematischen Feldvariationen. Grundlage ist ein vom Nutzer bereitgestelltes Beispiel-XML. Der Skill kennt keine feste XML-Struktur — er arbeitet ausschließlich mit den Dateien, die du ihm gibst.

## Voraussetzungen

Keine. Der Skill läuft vollständig innerhalb von opencode. Es müssen weder Node.js, Python noch andere Werkzeuge installiert sein.

## Dateien

```
xml-request-generator/
├── SKILL.md   ← Workflow-Instruktion für opencode (diese Datei wird geladen)
└── README.md  ← Diese Datei
```

## Skill laden

Öffne opencode und führe folgenden Befehl im Chat aus:

```
/skill xml-request-generator
```

Alternativ kannst du opencode direkt auf die SKILL.md verweisen:

```
/skill path/to/xml-request-generator/SKILL.md
```

## Benötigte Eingabedateien

Lege die folgenden Dateien bereit, bevor du den Skill startest. Du kannst sie per Drag-and-drop in das opencode-Fenster ziehen oder den Dateipfad angeben.

| Datei | Pflicht | Zweck |
|---|---|---|
| Beispiel-XML | **Ja** | Dient als Vorlage für alle generierten Anfragen |
| XSD-Datei | Nein | Wird zur Validierung der Ausgabe verwendet |
| WSDL-Datei | Nein | Wird zur Prüfung von Operationsnamen und Namespaces verwendet |

> **Hinweis:** Das Beispiel-XML sollte eine vollständige, gültige Anfrage enthalten — also alle Felder, die die Schnittstelle erwartet, auch wenn manche Werte noch Platzhalter sind.

## Ablauf

Nach dem Laden führt opencode dich Schritt für Schritt durch den Prozess:

1. **Analyse** — opencode liest dein Beispiel-XML und zeigt alle Felder, die variiert werden könnten.
2. **Feldauswahl** — Du wählst, welche Felder variieren sollen, und gibst die erlaubten Werte an.
3. **Variationsstrategie** — Du entscheidest, wie die Werte kombiniert werden (alle Kombinationen, Round-robin oder benannte Testfälle).
4. **Ausgabeeinstellungen** — Du legst Zielverzeichnis und Dateinamensmuster fest.
5. **Generierung** — opencode schreibt die Anfragen als einzelne XML-Dateien.
6. **Validierung** *(optional)* — opencode prüft jede generierte Datei gegen das bereitgestellte XSD/WSDL und gibt einen Validierungsbericht aus.

## Beispiel-Einstieg

```
Ich möchte Testanfragen für eine SOAP-Schnittstelle generieren.
Hier ist mein Beispiel-XML: [Datei einfügen]
Hier ist das zugehörige XSD: [Datei einfügen]
```

opencode analysiert die Dateien und stellt dann gezielte Rückfragen.

## Hinweise

- Felder, die voneinander abhängen (z.B. Brutto- und Nettobetrag), werden vom Skill erkannt und explizit nachgefragt — er berechnet nichts still im Hintergrund.
- Die Struktur des Beispiel-XMLs wird nicht verändert: Elementnamen, Reihenfolge, Namespaces und XML-Deklaration bleiben erhalten.
- Bei sehr vielen Kombinationen (mehr als 20) fragt opencode vor der Generierung nach Bestätigung.
