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