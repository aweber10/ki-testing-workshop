# Übung 4 – Von der Fachanforderung zum Request

**Ziel:** Den Chatbot produktiv einsetzen, um aus einer unvollständigen Fachanforderung einen ausführbaren Request zu erzeugen – und seine Schwächen dabei zu erkennen.

**Anforderung aus dem Fachbereich:**

> „Bitte verbucht die Februar-Reisekosten des Vertriebsteams: 285,60 € brutto inkl. 19 % Vorsteuer."

**Ziel:** Ein `insertBeleg`-Request, der im Testclient erfolgreich durchläuft.

## Vorgehen

1. **Anforderung analysieren (ohne KI).** Macht euch eine Liste: Welche Informationen fehlen noch für einen vollständigen Request? Denkt an Belegkopf-Felder *und* Positionsfelder.
2. **Chatbot ins Boot holen.** Gebt ihm die Anforderung, das Handbuch und den Auftrag, **Rückfragen zu stellen statt zu raten**. Beispielhafte Formulierung:

    > *„Ich möchte einen insertBeleg-Request für die folgende Anforderung erzeugen: [Anforderung]. Bevor du den Request baust, prüfe die Anforderung auf Vollständigkeit. Stelle mir offene Fragen einzeln und nacheinander, warte nach jeder Frage auf meine Antwort. Erfinde keine Werte – wenn etwas unklar ist, frage."*

3. **Rückfragen beantworten.** Antworten kommen aus Handbuch und Anhängen A/B – nicht aus dem Bauch. Wenn das Handbuch mehrere gültige Optionen zulässt, entscheidet im Team und begründet.
4. **Request generieren lassen, in den Testclient kopieren, senden.**

## Prüfung vor dem Senden

Bevor ihr auf „Senden" klickt, beantwortet im Team:

- Sind Kontotitel und Kostenstelle **wirklich** aus Anhang A / B des Handbuchs? Oder hat der Chatbot sie erfunden?
- Was gehört in `belegbetrag` – 285,60 € oder der Netto-Betrag?
- Was gehört in die `aobjKontierungen/betrag` – 285,60 € oder der Netto-Betrag?
- Ist das Format des USt-Schlüssels korrekt? (Tipp: führende Null prüfen)

## Typische Fallen (zur Warnung)

Chatbots – insbesondere kleinere Modelle – neigen bei dieser Aufgabe zu:

- **Halluzinierten Kostenstellen** („Kostenstelle 4000 für Vertrieb") statt Nutzung der eingerichteten (Anhang B).
- **Erfundenen Kontotiteln** („SPESEN", „REISE", „AUSLAGEN") statt der tatsächlich vorhandenen.
- **Format-Schludrigkeit** beim USt-Schlüssel (`VSt 19%` statt korrekt).
- **Vermischung von Netto und Brutto** zwischen Belegbetrag, Positionsbetrag und Kostenstellen-Betrag.

**Euer Job:** Genau diese Fehler vor dem Senden finden.

## Reflexion

Am Ende der Aufgabe beantwortet kurz:

- Wie viele Rückfragen hat der Chatbot von sich aus gestellt? Waren sie die richtigen?
- An welchen Stellen habt ihr ihn korrigieren müssen?
- Wo war er zuverlässig, wo war er riskant?
- Was würdet ihr beim nächsten Mal im Prompt anders machen, um Halluzinationen zu reduzieren?