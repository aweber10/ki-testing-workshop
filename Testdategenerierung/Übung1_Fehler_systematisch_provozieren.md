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
                  xmlns:rw="http://webservice.mach.de/rechnungswesen/v11/"
                  xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
  <soapenv:Header>
    <wsse:Security>
      <wsse:UsernameToken>
        <wsse:Username>name=DUMMY,database=training,mandant=100,niederlassung=1</wsse:Username>
        <wsse:Password>dummy</wsse:Password>
      </wsse:UsernameToken>
    </wsse:Security>
  </soapenv:Header>
  <soapenv:Body>
    <rw:insertBeleg>
      <rw:belegdaten>
        <rw:status>1</rw:status>
        <rw:belegart>Umbuchung</rw:belegart>
        <rw:buchungsdatum>2026-03-31</rw:buchungsdatum>
        <rw:belegdatum>2026-03-31</rw:belegdatum>
        <rw:konto>LOHN-UND GEHALTSVER</rw:konto>
        <rw:waehrung>EUR</rw:waehrung>
        <rw:beleg>0</rw:beleg>
        <rw:belegbetrag>5000.00</rw:belegbetrag>
        <rw:text>Gehalt März 2026</rw:text>
        <rw:belPositionen>
          <rw:positionsart>Sachbuchung</rw:positionsart>
          <rw:kontotitel>GEHÄLTER</rw:kontotitel>
          <rw:betrag>5000.00</rw:betrag>
          <rw:betragHW>5000.00</rw:betragHW>
          <rw:soll>true</rw:soll>
          <rw:brutto>false</rw:brutto>
          <rw:aobjKontierungen>
            <rw:koReSicht>Kostenstelle</rw:koReSicht>
            <rw:aobj>3050</rw:aobj>
            <rw:betrag>5000.00</rw:betrag>
            <rw:betragHW>5000.00</rw:betragHW>
            <rw:soll>true</rw:soll>
          </rw:aobjKontierungen>
        </rw:belPositionen>
      </rw:belegdaten>
      <rw:benutzeAutoKontierung>false</rw:benutzeAutoKontierung>
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