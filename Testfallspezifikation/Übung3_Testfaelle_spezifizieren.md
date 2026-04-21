# Übung 3 – Testfälle vollständig spezifizieren

**Aufgabe:** Der Chatbot soll für jeden Testfall eine vollständige, direkt ausführbare Spezifikation erstellen. Überlegt euch vorher:

- Welches Format braucht ihr, damit jemand den Testfall *ohne Rückfragen* in der Maske ausführen kann?
- Welche konkreten Informationen müssen enthalten sein (denkt an die Felder der Maske)?

**Qualitätsprüfung – jeden Testfall einzeln durchgehen:**

- Kann ich die Eingabedaten 1:1 in die Maske übertragen, ohne etwas nachzuschlagen?
- Sind Kontotitel und Kostenstellen aus Anhang A/B, keine erfundenen Werte?
- Ist das erwartete Ergebnis präzise genug (konkreter Prüfcode, betroffene Stelle, erwartete Meldung)?
- Bei Bruttobuchungen: Stimmt der KSt-Betrag (Netto, nicht Brutto)?

**Typischer Stolperstein:** Chatbots verwenden gerne Platzhalter wie „gültiges Konto" oder „beliebige Kostenstelle". Das ist für eine ausführbare Testfallspezifikation wertlos. Bringt den Chatbot dazu, konkrete Werte zu liefern.