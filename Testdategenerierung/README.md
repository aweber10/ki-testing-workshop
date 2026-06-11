# Testdatengenerierung

Übungen zur KI-gestützten Generierung und Validierung von SOAP-Requests für einen fiktiven `RechnungswesenService`.

---

## Zu testende Schnittstelle

Der `RechnungswesenService` bietet zwei Operationen:

| Operation | Beschreibung |
|---|---|
| `pruefeBuchbarkeit` | Prüft einen Beleg ohne ihn anzulegen. Liefert einen 9-stelligen Prüfcode (0 = ok, >0 = Fehler je Stelle). |
| `insertBeleg` | Legt einen Beleg an. Liefert bei Erfolg eine `belegID`, bei Fehlern einen SOAP Fault mit Klartextmeldung. |

---

## Tools

| Tool | Link |
|---|---|
| SOAP-Testclient | [soap_testclient.html](https://aweber10.github.io/ki-testing-workshop/Testdategenerierung/System/soap_testclient.html) |
| XML/XSD-Validator | [xml_validator.html](https://aweber10.github.io/ki-testing-workshop/Testdategenerierung/Validator/xml_validator.html) |

---

## Schnittstellenspezifikation

| Datei | Beschreibung |
|---|---|
| [rechnungswesen-training.wsdl](Schnittstellenspezifikation/rechnungswesen-training.wsdl) | WSDL-Beschreibung des Service |
| [rechnungswesen-training.xsd](Schnittstellenspezifikation/rechnungswesen-training.xsd) | Fachliches Schema (Schulungsversion) |
| [soap-envelope.xsd](Schnittstellenspezifikation/soap-envelope.xsd) | SOAP 1.1 Envelope Schema (W3C) |
| [soap-wrapper.xsd](Schnittstellenspezifikation/soap-wrapper.xsd) | Wrapper-Schema für Vollvalidierung (Envelope + Fachschema) |

---

## Beispieldaten

| Datei | Beschreibung |
|---|---|
| [beispiel_01_pruefeBuchbarkeit.xml](Beispieldaten/beispiel_01_pruefeBuchbarkeit.xml) | Beispiel-Request für `pruefeBuchbarkeit` |
| [beispiel_02_insertBeleg_ohne_ust.xml](Beispieldaten/beispiel_02_insertBeleg_ohne_ust.xml) | `insertBeleg` – Gehaltsbuchung ohne Umsatzsteuer |
| [beispiel_03_insertBeleg_mit_ust.xml](Beispieldaten/beispiel_03_insertBeleg_mit_ust.xml) | `insertBeleg` – Reisekostenabrechnung mit USt (7 % und 19 %) |

---

## Handbuch

Das Handbuch beschreibt die Belegerfassungsmaske und enthält in den Anhängen A–C alle gültigen Kontotitel, Kostenstellen und USt-Schlüssel der Schulungsumgebung.

[belegerfassung_handbuch_v1.0.md](../Testfallspezifikation/Dokumentation/belegerfassung_handbuch_v1.0.md)

> **Tipp:** Das Handbuch kann heruntergeladen und dem Chatbot direkt als Datei übergeben werden – so muss der Inhalt nicht manuell in den Prompt kopiert werden.

---

## Übungen

| Nr. | Datei | Thema |
|---|---|---|
| 1 | [Übung1_Fehler_systematisch_provozieren.md](Übung1_Fehler_systematisch_provozieren.md) | Fehler gezielt durch manipulierte Requests auslösen |
| 2 | [Übung2_USt_Fallen.md](Übung2_USt_Fallen.md) | Typische USt-Fehler erkennen und provozieren |
| 3 | [Übung3_Testvarianten_generieren.md](Übung3_Testvarianten_generieren.md) | Systematische Testvarianten mit KI generieren |
| 4 | [Übung4_Von_Fachanforderung_zum_Request.md](Übung4_Von_Fachanforderung_zum_Request.md) | Aus einer fachlichen Anforderung einen validen SOAP-Request ableiten |
