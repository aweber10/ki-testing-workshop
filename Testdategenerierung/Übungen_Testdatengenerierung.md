# Übungen: Requests bauen und prüfen mit KI-Unterstützung

## Kontext

Der `RechnungswesenService` bietet u.a. zwei Operationen:

- **`pruefeBuchbarkeit`** – liefert einen 9-stelligen Prüfcode zurück, jede Stelle für einen Prüfbereich (0 = ok, >0 = Fehler). Keine Buchung.
- **`insertBeleg`** – legt den Beleg tatsächlich an. Liefert bei Fehlern einen SOAP Fault mit Klartextmeldung.

Eure Werkzeuge: **Handbuch**, **SOAP-Testclient** (`soap_testclient.html`) und ein **KI-Chatbot** eurer Wahl.

---

## Aufgabe 1 – Fehler systematisch provozieren

**Ziel:** Versteht, welche Prüfungen `insertBeleg` durchführt und wie das System Fehler meldet.

Kopiert den folgenden Request in den Testclient. Es handelt sich um eine Gehaltsbuchung ohne USt.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:rw="http://webservice.mach.de/rechnungswesen/v11/">
  <soapenv:Body>
    <rw:insertBeleg>
      <belegdaten>
        <status>1</status>
        <belegart>Umbuchung</belegart>
        <buchungsdatum>2026-03-31</buchungsdatum>
        <belegdatum>2026-03-31</belegdatum>
        <konto>LOHN-UND GEHALTSVER</konto>
        <waehrung>EUR</waehrung>
        <beleg>0</beleg>
        <belegbetrag>5000.00</belegbetrag>
        <text>Gehalt März 2026</text>
        <belPositionen>
          <positionsart>Sachbuchung</positionsart>
          <kontotitel>GEHÄLTER</kontotitel>
          <betrag>5000.00</betrag>
          <betragHW>5000.00</betragHW>
          <soll>true</soll>
          <brutto>false</brutto>
          <aobjKontierungen>
            <koReSicht>Kostenstelle</koReSicht>
            <aobj>3050</aobj>
            <betrag>5000.00</betrag>
            <betragHW>5000.00</betragHW>
            <soll>true</soll>
          </aobjKontierungen>
        </belPositionen>
      </belegdaten>
      <benutzeAutoKontierung>false</benutzeAutoKontierung>
    </rw:insertBeleg>
  </soapenv:Body>
</soapenv:Envelope>
```

Sendet zuerst den unveränderten Request – es sollte ein Beleg angelegt werden. Danach führt ihr folgende Änderungen **einzeln** durch (nicht kumulativ – immer auf den Original-Request zurückkehren):

- **a)** `belegbetrag` auf `6000.00` ändern. Welche Fehlermeldung? An welcher Stelle wird das geprüft?
- **b)** `aobjKontierungen` in der Position komplett entfernen. Welche Fehlermeldung?
- **c)** Eine `aobjKontierungen` beim Belegkonto `LOHN-UND GEHALTSVER` ergänzen (identisch zur existierenden, aber auf Belegkopfebene). Warum scheitert das?
- **d)** `status` auf `3` ändern (sofort buchen). Gibt es einen Unterschied zu Status `1`?

**Einsatz des Chatbots:** Nur, wenn eine Fehlermeldung unklar ist. Gebt ihm dann die Meldung + das relevante Handbuchkapitel. Prüft anschließend, ob seine Erklärung konsistent zum Handbuch ist.

---

## Aufgabe 2 – USt-Fallen

**Ziel:** Versteht, wie das System Brutto-Buchungen und Kostenstellen-Zuordnung prüft, und vergleicht `insertBeleg` mit `pruefeBuchbarkeit`.

⚠️ **Neuer Startpunkt – nicht der Request aus Aufgabe 1!**
Im Testclient: Operation `insertBeleg` wählen → **Beispiel laden**. Das ist eine andere Buchung: Reisekosten, brutto, mit zwei Positionen (7 % und 19 % Vorsteuer) und `ustSchluessel`-Feldern. Sendet sie einmal unverändert zur Kontrolle.

- **a)** In Position 1 `ustSchluessel` von `VSt 07%` auf `VSt 7%` ändern. Welche Fehlermeldung? Was sagt das Handbuch dazu?
- **b)** In Position 1 `aobjKontierungen/betrag` von `44.95` auf `48.10` ändern. Welche Fehlermeldung? Warum ist der Netto-Betrag hier 44,95, nicht 48,10?
- **c)** Nehmt den Body aus b) (also mit dem falschen Betrag in aobjKontierungen), wechselt die Operation auf `pruefeBuchbarkeit` und sendet erneut. Was liefert der Prüfcode? Meldet er den Fehler aus b)?

**Diskutiert im Team:** Warum ist `pruefeBuchbarkeit` bei manchen Fehlern „milder" als `insertBeleg`? Was heißt das für eure Teststrategie – reicht eine Vorabprüfung mit `pruefeBuchbarkeit`, um sicher zu sein, dass `insertBeleg` gelingt?

---

## Aufgabe 3 – Gültige Requests aus WSDL/XSD generieren

**Ziel:** Den Chatbot einsetzen, um aus der technischen Schnittstellenbeschreibung (WSDL/XSD) und den fachlichen Regeln im Handbuch mehrere gültige SOAP-Requests zu erzeugen – und zu prüfen, ob sie tatsächlich funktionieren.

### Vorgehen

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

### Varianten für die Szenarien

Falls der Chatbot zu wenig Variation liefert, fordert gezielt:

- Netto-Buchung (ohne USt) auf einem Personalkonto
- Brutto-Buchung mit 7 % Vorsteuer
- Brutto-Buchung mit 19 % Vorsteuer
- Buchung mit mehreren Positionen auf unterschiedlichen Kostenstellen
- Buchung mit dem Belegkonto `VERB. LOHN U. GEHALT` (Bilanzkonto – keine Kostenstelle!)

### Auswertung

- Wie viele der 5 Requests liefen beim ersten Versuch fehlerfrei durch?
- Welche Fehler hat der Chatbot gemacht – trotz WSDL/XSD *und* Handbuch als Kontext?
- Hat die Qualität sich verbessert, wenn ihr die Fehlermeldung aus dem ersten Versuch als Feedback zurückgegeben habt?

---

## Aufgabe 4 – Von der Fachanforderung zum Request

**Ziel:** Den Chatbot produktiv einsetzen, um aus einer unvollständigen Fachanforderung einen ausführbaren Request zu erzeugen – und seine Schwächen dabei zu erkennen.

**Anforderung aus dem Fachbereich:**

> „Bitte verbucht die Februar-Reisekosten des Vertriebsteams: 285,60 € brutto inkl. 19 % Vorsteuer."

**Ziel:** Ein `insertBeleg`-Request, der im Testclient erfolgreich durchläuft.

### Vorgehen

1. **Anforderung analysieren (ohne KI).** Macht euch eine Liste: Welche Informationen fehlen noch für einen vollständigen Request? Denkt an Belegkopf-Felder *und* Positionsfelder.
2. **Chatbot ins Boot holen.** Gebt ihm die Anforderung, das Handbuch und den Auftrag, **Rückfragen zu stellen statt zu raten**. Beispielhafte Formulierung:

    > *„Ich möchte einen insertBeleg-Request für die folgende Anforderung erzeugen: [Anforderung]. Bevor du den Request baust, prüfe die Anforderung auf Vollständigkeit. Stelle mir offene Fragen einzeln und nacheinander, warte nach jeder Frage auf meine Antwort. Erfinde keine Werte – wenn etwas unklar ist, frage."*

3. **Rückfragen beantworten.** Antworten kommen aus Handbuch und Anhängen A/B – nicht aus dem Bauch. Wenn das Handbuch mehrere gültige Optionen zulässt, entscheidet im Team und begründet.
4. **Request generieren lassen, in den Testclient kopieren, senden.**

### Prüfung vor dem Senden

Bevor ihr auf „Senden" klickt, beantwortet im Team:

- Sind Kontotitel und Kostenstelle **wirklich** aus Anhang A / B des Handbuchs? Oder hat der Chatbot sie erfunden?
- Was gehört in `belegbetrag` – 285,60 € oder der Netto-Betrag?
- Was gehört in die `aobjKontierungen/betrag` – 285,60 € oder der Netto-Betrag?
- Ist das Format des USt-Schlüssels korrekt? (Tipp: führende Null prüfen)

### Typische Fallen (zur Warnung)

Chatbots – insbesondere kleinere Modelle – neigen bei dieser Aufgabe zu:

- **Halluzinierten Kostenstellen** („Kostenstelle 4000 für Vertrieb") statt Nutzung der eingerichteten (Anhang B).
- **Erfundenen Kontotiteln** („SPESEN", „REISE", „AUSLAGEN") statt der tatsächlich vorhandenen.
- **Format-Schludrigkeit** beim USt-Schlüssel (`VSt 19%` statt korrekt).
- **Vermischung von Netto und Brutto** zwischen Belegbetrag, Positionsbetrag und Kostenstellen-Betrag.

**Euer Job:** Genau diese Fehler vor dem Senden finden.

### Reflexion

Am Ende der Aufgabe beantwortet kurz:

- Wie viele Rückfragen hat der Chatbot von sich aus gestellt? Waren sie die richtigen?
- An welchen Stellen habt ihr ihn korrigieren müssen?
- Wo war er zuverlässig, wo war er riskant?
- Was würdet ihr beim nächsten Mal im Prompt anders machen, um Halluzinationen zu reduzieren?