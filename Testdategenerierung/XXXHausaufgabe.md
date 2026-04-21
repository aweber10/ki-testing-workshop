# Hausaufgabe: Automatisierte Testsuite mit OpenCode

## Hintergrund

Im Training habt ihr SOAP-Requests einzeln im Chat erzeugt und manuell in den Testclient kopiert. Das funktioniert für 3–5 Requests. Für eine vollständige Testsuite mit 15+ Requests stößt ihr an zwei Grenzen: Die Ausgabelänge pro Chatbot-Antwort ist begrenzt, und das Hin-und-Her-Kopieren kostet Zeit und ist fehleranfällig.

KI-gestützte Coding-Werkzeuge wie OpenCode arbeiten direkt auf eurem Dateisystem. Sie lesen Quelldateien (WSDL, XSD, Handbuch), erzeugen mehrere Ausgabedateien in einem Durchlauf und können iterativ korrigieren – ohne dass ihr etwas kopieren müsst.

---

## Voraussetzung

Installiert euch [OpenCode](https://opencode.ai) in der Desktop-Version (oder ein ähnliches KI-Werkzeug) und konfiguriert es für eines eurer LLMs (z.B. GPT-OSS-120B).

---

## Vorbereitung

Legt folgende Dateien aus dem Training in ein gemeinsames Verzeichnis:

```
testsuite/
├── rechnungswesen-training.wsdl
├── rechnungswesen-training.xsd
└── belegerfassung_handbuch.md
```

Startet OpenCode in diesem Verzeichnis.

---

## Auftrag an OpenCode

Gebt OpenCode folgenden Auftrag (passt ihn gerne an – es ist euer Prompt):

> Lies die WSDL, XSD und das Handbuch in diesem Verzeichnis. Erzeuge eine Testsuite von mindestens 15 verschiedenen SOAP-Requests für die Operation `pruefeBuchbarkeit`:
>
> - 5 Requests sollen gültige Buchungsszenarien abbilden (erwarteter Prüfcode: `000000000`).
> - 10 Requests sollen gezielt Fehler auslösen – mindestens ein Fehlerszenario pro Prüfstelle 1–7.
>
> Regeln:
> - Verwende ausschließlich Kontotitel aus Anhang A und Kostenstellen aus Anhang B des Handbuchs.
> - Schreibe jeden Request als eigene XML-Datei mit sprechendem Dateinamen (z.B. `gut_01_gehaltsbuchung_netto.xml`, `fehler_stelle3_unbekanntes_konto.xml`).
> - Erzeuge eine README.md mit einer Übersichtstabelle: Dateiname, Szenario, erwarteter Prüfcode, betroffene Stelle(n).

---

## Prüfung

Testet alle erzeugten Requests im SOAP-Testclient (`soap_testclient.html`):

1. XML-Datei öffnen, Inhalt in den Testclient kopieren, senden.
2. Prüfcode und Meldungen mit der erwarteten Tabelle abgleichen.
3. Ergebnis dokumentieren:

| # | Datei | Erwartung | Tatsächlicher Prüfcode | Korrekt? | Korrektur |
|---|-------|-----------|------------------------|----------|-----------|
| 1 | …     | 000000000 | …                      | ja/nein  | …         |

---

## Iterative Korrektur

Wenn Requests nicht das erwartete Ergebnis liefern:

1. Kopiert den Prüfcode und die Fehlermeldung aus dem Testclient.
2. Gebt sie an OpenCode zurück: *„Request X hat Prüfcode Y statt Z geliefert. Fehlermeldung: [Meldung]. Korrigiere die Datei."*
3. Prüft erneut.

Dokumentiert, wie viele Korrektur-Durchläufe nötig waren, bis alle Requests das erwartete Ergebnis liefern.

---

## Reflexion

- Wie viele der 15 Requests waren beim ersten Durchlauf korrekt?
- Welche Fehlertypen hat das Werkzeug wiederholt gemacht (trotz WSDL + XSD + Handbuch als Kontext)?
- Wo war der Vorteil gegenüber dem Chat-Ansatz aus dem Training am deutlichsten spürbar?
- Wo hat es nicht geholfen oder sogar gestört?