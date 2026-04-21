# Übung 3 – Gültige Requests aus WSDL/XSD generieren

**Ziel:** Den Chatbot einsetzen, um aus der technischen Schnittstellenbeschreibung (WSDL/XSD) und den fachlichen Regeln im Handbuch mehrere gültige SOAP-Requests zu erzeugen – und zu prüfen, ob sie tatsächlich funktionieren.

## Vorgehen

1. **Kontext vorbereiten.** Gebt dem Chatbot:
    - Die WSDL (`rechnungswesen-training.wsdl`)
    - Die XSD (`rechnungswesen-training.xsd`)
    - Aus dem Handbuch: die Buchungsregeln (Kapitel 3 + 9) sowie die Anhänge A (Kontoverzeichnis), B (Kostenstellenverzeichnis) und C (USt-Schlüssel)

2. **Auftrag formulieren.** Beispiel:

    > *„Auf Basis der beigefügten WSDL/XSD und der fachlichen Regeln im Handbuch: Erzeuge 5 verschiedene gültige SOAP-Requests für die Operation `pruefeBuchbarkeit`. Jeder Request soll ein anderes Buchungsszenario abbilden. Verwende ausschließlich Kontotitel aus Anhang A und Kostenstellen aus Anhang B. Gib für jeden Request an, welches Szenario er abdeckt."*

3. **Requests einzeln im Testclient senden.** Für jeden Request dokumentieren:

    | # | Szenario | Prüfcode | Ergebnis | Korrektur nötig? |
    |---|----------|----------|----------|------------------|
    | 1 | …        | …        | OK / Fehler | …             |

4. **Fehlerhafte Requests reparieren.** Wenn ein Request nicht `000000000` liefert: Findet den Fehler selbst (Prüfcode + Meldung lesen), bevor ihr den Chatbot fragt.

## Varianten für die Szenarien

Falls der Chatbot zu wenig Variation liefert, fordert gezielt:

- Netto-Buchung (ohne USt) auf einem Personalkonto
- Brutto-Buchung mit 7 % Vorsteuer
- Brutto-Buchung mit 19 % Vorsteuer
- Buchung mit mehreren Positionen auf unterschiedlichen Kostenstellen
- Buchung mit dem Belegkonto `VERB. LOHN U. GEHALT` (Bilanzkonto – keine Kostenstelle!)

## Auswertung

- Wie viele der 5 Requests liefen beim ersten Versuch fehlerfrei durch?
- Welche Fehler hat der Chatbot gemacht – trotz WSDL/XSD *und* Handbuch als Kontext?
- Hat die Qualität sich verbessert, wenn ihr die Fehlermeldung aus dem ersten Versuch als Feedback zurückgegeben habt?