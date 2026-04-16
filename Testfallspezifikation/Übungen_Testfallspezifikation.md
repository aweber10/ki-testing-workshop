# Übungsaufgabe: Testfallspezifikation für `pruefeBuchbarkeit`

## Kontext

Das Finanz-Team eurer Firma nutzt die Belegerfassungsmaske, um Buchungen manuell zu erfassen. Bevor Belege in den Buchungsstapel geschrieben werden, führt das System eine Buchbarkeitsprüfung durch (`pruefeBuchbarkeit`). Ihr sollt Testfälle spezifizieren, die sicherstellen, dass diese Prüfung korrekt funktioniert.

**Eure Unterlagen:** Benutzerhandbuch (inkl. Anhänge A–C) und die Belegerfassungsmaske (`belegerfassung.html`).

**Eure Werkzeuge:** Ein KI-Chatbot eurer Wahl. *Ihr entscheidet selbst, welchen Kontext ihr dem Chatbot gebt und wie ihr eure Aufgaben formuliert.*

---

## Schritt 1 – Die Funktion verstehen und Äquivalenzklassen ableiten

**Aufgabe:** Nutzt den KI-Chatbot, um euch bei der Analyse der Funktion `pruefeBuchbarkeit` zu unterstützen. Ziel ist eine vollständige Liste von Äquivalenzklassen (gültige und ungültige) sowie relevanten Grenzwerten für alle 9 Prüfstellen.

Beachtet dabei:

- Welche Teile des Handbuchs braucht der Chatbot als Kontext, um gute Ergebnisse zu liefern?
- Was passiert, wenn ihr ihm *nur* Kapitel 9 gebt vs. das gesamte Handbuch?
- Liefert der Chatbot auf Anhieb ein vollständiges Ergebnis oder müsst ihr nachfragen?

**Ergebnis dokumentieren:** Erstellt eine bereinigte Liste aller Äquivalenzklassen. Haltet in einer separaten Spalte fest, ob die Klasse vom Chatbot kam oder vom Team ergänzt wurde.

**Diskussionspunkt:** Welche Klassen hat der Chatbot übersehen – und warum vermutlich?

---

## Schritt 2 – Testfälle auswählen

**Aufgabe:** Lasst den Chatbot eine handhabbare Menge von Testfällen aus euren Äquivalenzklassen ableiten. Vollständige Abdeckung aller Klassen mit möglichst wenigen Testfällen.

Dabei ist wichtig:

- Gebt dem Chatbot eure bereinigte Liste aus Schritt 1 – nicht die Rohergebnisse.
- Prüft, ob der Chatbot bei der Auswahl Klassen unterschlägt oder zusammenfasst, die getrennt getestet werden sollten.
- Achtet darauf, dass sowohl reine Positivtests als auch gezielte Fehlerfälle für jede Prüfstelle enthalten sind.

**Ergebnis dokumentieren:** Finale Testfallliste mit kurzer Begründung, warum jeder Testfall dabei ist.

---

## Schritt 3 – Testfälle vollständig spezifizieren

**Aufgabe:** Der Chatbot soll für jeden Testfall eine vollständige, direkt ausführbare Spezifikation erstellen. Überlegt euch vorher:

- Welches Format braucht ihr, damit jemand den Testfall *ohne Rückfragen* in der Maske ausführen kann?
- Welche konkreten Informationen müssen enthalten sein (denkt an die Felder der Maske)?

**Qualitätsprüfung – jeden Testfall einzeln durchgehen:**

- Kann ich die Eingabedaten 1:1 in die Maske übertragen, ohne etwas nachzuschlagen?
- Sind Kontotitel und Kostenstellen aus Anhang A/B, keine erfundenen Werte?
- Ist das erwartete Ergebnis präzise genug (konkreter Prüfcode, betroffene Stelle, erwartete Meldung)?
- Bei Bruttobuchungen: Stimmt der KSt-Betrag (Netto, nicht Brutto)?

**Typischer Stolperstein:** Chatbots verwenden gerne Platzhalter wie „gültiges Konto" oder „beliebige Kostenstelle". Das ist für eine ausführbare Testfallspezifikation wertlos. Bringt den Chatbot dazu, konkrete Werte zu liefern.

---

## Schritt 4 – Testfälle ausführen

Führt die spezifizierten Testfälle in der Belegerfassungsmaske aus:

1. Beleg exakt nach Eingabedaten anlegen und speichern
2. „Buchbarkeit prüfen" klicken
3. Prüfcode und Meldung mit dem erwarteten Ergebnis abgleichen
4. Tatsächliches Ergebnis in der Spezifikation festhalten
5. Bei Abweichungen: Liegt der Fehler in der Spezifikation, im Prompt oder im System?

---

## Schritt 5 – Reflexion im Team

1. An welchen Stellen hat der Chatbot euch Zeit gespart – und wo hat er euch auf eine falsche Fährte geführt?
2. Wie hat sich die Qualität der Chatbot-Ergebnisse verändert, als ihr den Kontext oder die Formulierung angepasst habt?
3. Welche Informationen aus dem Handbuch waren für den Chatbot unverzichtbar, um brauchbare Testfälle zu liefern?
4. Was würdet ihr beim nächsten Mal anders prompten?