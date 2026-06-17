# Übung 3 – Testvarianten mit KI-Unterstützung generieren und prüfen

**Ziel:** Den Chatbot als Werkzeug zur systematischen Testdatengenerierung einsetzen —
mit validierten Beispielen als Vorlage, fachlicher Steuerung durch euch und
maschineller Prüfung vor dem ersten Senden. Nebenbei lernt ihr, wie ihr einen
Prompt so schärft, dass das Modell weniger dazuerfindet.

**Werkzeuge:**
- Chatbot eurer Wahl
- [XML/XSD Validator](https://aweber10.github.io/ki-testing-workshop/Testdategenerierung/Validator/xml_validator.html)
- [SOAP-Testclient](https://aweber10.github.io/ki-testing-workshop/Testdategenerierung/System/soap_testclient.html)
- Handbuch (Anhänge A, B, C)

---

## Vorgehen

### 1. Kontext vorbereiten

Gebt dem Chatbot folgende Materialien:

- Den Prompt aus dem Kursordner: [prompt_testvarianten.md](Prompt/prompt_testvarianten.md)
- Die drei Beispiel-XMLs (`beispiel_01_pruefeBuchbarkeit.xml`, `beispiel_02_insertBeleg_ohne_ust.xml`, `beispiel_03_insertBeleg_mit_ust.xml`)

Noch nichts weiter — wartet auf Schritt 1 des Prompts.

---

### 2. Variationsauftrag formulieren

Nachdem der Chatbot die Beispiele analysiert hat, gebt ihm folgenden Auftrag:

> *„Verwende `beispiel_02_insertBeleg_ohne_ust.xml` als Vorlage. Kopiere die
> Vorlage zeichengenau und ändere ausschließlich die Felder `kontotitel`,
> `aobj` (Kostenstelle) und `belegbetrag`. **Füge KEINE Elemente hinzu, die nicht
> in der Vorlage stehen.
> Wenn die Vorlage das Feld nicht enthält, enthält auch kein generierter Request
> dieses Feld.** Verwende ausschließlich Werte aus Anhang A (Kontotitel) und
> Anhang B (Kostenstellen) des Handbuchs. Decke folgende Szenarien ab:"*

Szenarien:

| # | Szenario |
|---|----------|
| 1 | Gehaltsbuchung, eine Position, Kostenstelle 1010 (Vorlage — zum Aufwärmen) |
| 2 | Gehaltsbuchung, eine Position, Kostenstelle 1020 |
| 3 | Ausbildungsvergütung, eine Position, Kostenstelle 1020 |
| 4 | Zwei Positionen: GEHÄLTER (1010) + AUSBILDUNGSVERGÜTUNG (1020) |
| 5 | Buchung auf VERB. LOHN U. GEHALT als Belegkonto, GEHÄLTER als Position |

> **Hinweis für fortgeschrittene Teilnehmer:** Formuliert den Auftrag zuerst OHNE die fettgedruckte
> Negativregel (nur „variiere die Felder …"). Beobachtet, was das Modell
> dazuerfindet — häufig ein erfundenes Login- oder Auth-Element. Ergänzt dann
> die Negativregel und vergleicht das Ergebnis. Dieser Vorher/Nachher-Vergleich
> ist der eigentliche Lerneffekt der Übung.

**Wichtig vor dem nächsten Schritt:** Prüft jeden generierten Request bevor ihr
ihn in den Validator ladet:

- Hat der Chatbot Elemente hinzugefügt, die NICHT in der Vorlage stehen
  (z. B. ein erfundenes Login-, Auth- oder Header-Element)?
- Sind alle Kontotitel wirklich aus Anhang A — oder hat der Chatbot welche erfunden?
- Stimmt `belegbetrag` mit der Summe aller Positionsbeträge überein?
- Sind alle fachlichen Namespace-Präfixe (`rw:`) korrekt gesetzt?

---

### 3. Requests im Validator prüfen

Öffnet den [XML/XSD Validator](https://aweber10.github.io/ki-testing-workshop/Testdategenerierung/Validator/xml_validator.html).

Ladet die Schemata (alle drei Dateien auf einmal):
[soap-wrapper.xsd](../Schnittstellenspezifikation/soap-wrapper.xsd), [soap-envelope.xsd](../Schnittstellenspezifikation/soap-envelope.xsd), [rechnungswesen-training.xsd](../Schnittstellenspezifikation/rechnungswesen-training.xsd)

Für jeden generierten Request:
1. Request in das XML-Feld einfügen
2. Validieren
3. Ergebnis dokumentieren:

| # | Szenario | Validator | Fehler (falls vorhanden) | Korrektur nötig? |
|---|----------|-----------|--------------------------|------------------|
| 1 | Gehalt 1010 | OK / Fehler | … | … |
| 2 | Gehalt 1020 | OK / Fehler | … | … |
| 3 | Ausbildung 1020 | OK / Fehler | … | … |
| 4 | Zwei Positionen | OK / Fehler | … | … |
| 5 | VERB. LOHN U. GEHALT | OK / Fehler | … | … |

> **Beobachtung:** Manchmal sagt der Validator „valide", obwohl der Chatbot ein
> Login- oder Auth-Element dazuerfunden hat. Das liegt nicht am Validator — der
> SOAP-Rahmen lässt an seinen Rändern bewusst Zusatzelemente zu. Geprüft wird
> der Aufbau, nicht ob ein Element fachlich hierhergehört. Heißt für euch:
> valide ≠ fachlich korrekt — den Blick auf die Vorlage nimmt euch der Validator
> nicht ab.

**Fehler beheben:** Versucht Schema-Fehler zuerst selbst zu verstehen (Zeile +
Fehlermeldung lesen). Erst dann den Chatbot um Erklärung bitten — und prüfen,
ob seine Erklärung mit dem Schema übereinstimmt.

---

### 4. Valide Requests im Testclient senden

Nur Requests die den Validator fehlerfrei passiert haben, kommen in den Testclient.

Für `pruefeBuchbarkeit`: Prüfcode dokumentieren.
Für `insertBeleg`: Erfolg (belegKey > 0) oder SOAP Fault dokumentieren.

| # | Szenario | Prüfcode / Ergebnis | Anmerkung |
|---|----------|---------------------|-----------|
| 1 | … | … | … |
| … | … | … | … |

---

## Reflexion

- Bei welchen Szenarien hat der Chatbot auf Anhieb korrekte Werte geliefert?
- Wo hat er Werte erfunden oder fachliche Regeln ignoriert — obwohl die
  Beispiele als Vorlage vorlagen?
- Welchen Unterschied hat die Negativregel („füge KEINE Elemente hinzu …")
  gemacht? Hat sie das Erfinden vollständig verhindert oder nur reduziert?
- Was hat der Validator gefunden, das ihr beim manuellen Prüfen übersehen hättet —
  und was hat er NICHT gefunden, weil es schemavalide war?
- Welchen Schritt würdet ihr beim nächsten Mal anders formulieren?
