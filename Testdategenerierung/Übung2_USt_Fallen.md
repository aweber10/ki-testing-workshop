# Übung 2 – USt-Fallen

**Ziel:** Versteht, wie das System Brutto-Buchungen und Kostenstellen-Zuordnung prüft, und vergleicht `insertBeleg` mit `pruefeBuchbarkeit`.

⚠️ **Neuer Startpunkt – nicht der Request aus Aufgabe 1!**
Im Testclient: Operation `insertBeleg` wählen → **Beispiel laden**. Das ist eine andere Buchung: Reisekosten, brutto, mit zwei Positionen (7 % und 19 % Vorsteuer) und `ustSchluessel`-Feldern. Sendet sie einmal unverändert zur Kontrolle.

- **a)** In Position 1 `ustSchluessel` von `VSt 07%` auf `VSt 7%` ändern. Welche Fehlermeldung? Was sagt das Handbuch dazu?
- **b)** In Position 1 `aobjKontierungen/betrag` von `44.95` auf `48.10` ändern. Welche Fehlermeldung? Warum ist der Netto-Betrag hier 44,95, nicht 48,10?
- **c)** Nehmt den Body aus b) (also mit dem falschen Betrag in aobjKontierungen), wechselt die Operation auf `pruefeBuchbarkeit` und sendet erneut. Was liefert der Prüfcode? Meldet er den Fehler aus b)?

**Diskutiert im Team:** Warum ist `pruefeBuchbarkeit` bei manchen Fehlern „milder" als `insertBeleg`? Was heißt das für eure Teststrategie – reicht eine Vorabprüfung mit `pruefeBuchbarkeit`, um sicher zu sein, dass `insertBeleg` gelingt?