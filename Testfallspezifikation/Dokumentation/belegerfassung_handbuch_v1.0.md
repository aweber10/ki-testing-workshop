# Belegerfassung für Rechnungswesen
## Benutzerhandbuch für die manuelle Buchungserfassung

**Gültig für:** Belegerfassungsmaske v1.0  
**Zielgruppe:** Sachbearbeiter Finanz-Team  
**Stand:** April 2025

---

## Inhaltsverzeichnis

1. [Überblick und Programmstart](#1-überblick-und-programmstart)
2. [Bildschirmaufbau](#2-bildschirmaufbau)
3. [Beleg anlegen – Schritt für Schritt](#3-beleg-anlegen--schritt-für-schritt)
4. [Belegkopf ausfüllen](#4-belegkopf-ausfüllen)
5. [Belegpositionen erfassen](#5-belegpositionen-erfassen)
6. [Umsatzsteuer-Handling](#6-umsatzsteuer-handling)
7. [Kostenstellen-Zuordnung](#7-kostenstellen-zuordnung)
8. [Beleg speichern und bearbeiten](#8-beleg-speichern-und-bearbeiten)
9. [Buchbarkeit prüfen](#9-buchbarkeit-prüfen)
10. [In Stapel schreiben](#10-in-stapel-schreiben)
11. [Häufige Fehlermeldungen und Lösungen](#11-häufige-fehlermeldungen-und-lösungen)
12. [Buchungsbeispiele](#12-buchungsbeispiele)
13. [Anhang D – Testparameter der Schulungsumgebung](#anhang-d--testparameter-der-schulungsumgebung)

---

## 1. Überblick und Programmstart

Die Belegerfassungsmaske ermöglicht es, Rechnungswesenbelege manuell zu erfassen und an das Buchhaltungssystem zu übergeben. Der typische Ablauf besteht aus drei Schritten:

```
Belege erfassen → Buchbarkeit prüfen → In Stapel schreiben
```

**Programm öffnen:** Doppelklick auf die Datei `belegerfassung.html`. Die Maske öffnet sich im Standard-Browser. Es ist keine Internetverbindung oder Installation erforderlich.

Beim Öffnen werden zwei Beispielbelege angezeigt, an denen Sie sich orientieren können.

---

## 2. Bildschirmaufbau

```
┌─────────────────────────────────────────────────────────────────┐
│  FIBU   Rechnungswesen – Belegerfassung          SCHULUNG v1.0  │
├─────────────────────────────────────────────────────────────────┤
│  [+ Neuer Beleg]          [⬡ Buchbarkeit prüfen] [▶ In Stapel] │
│                                          Statushinweis          │
├─────────────────────────────────────────────────────────────────┤
│  ERFASSTE BELEGE                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ #01  UMBUCHUNG  LOHN-UND GEHALTSVER  2025-03-31  6.500,00│  │
│  │      [✏ Bearbeiten] [🗑 Löschen]              [▼]        │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ #02  UMBUCHUNG  VERB. LOHN U. GEHALT  2025-03-31  112,54 │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

**Aktionsleiste (oben):**
- **+ Neuer Beleg** – öffnet das Erfassungsformular
- **Buchbarkeit prüfen** – wird aktiv, sobald mindestens ein Beleg vorhanden ist
- **In Stapel schreiben** – wird erst freigeschaltet, wenn alle Belege erfolgreich geprüft wurden
- **Statushinweis** – zeigt an, wie viele Belege geprüft oder buchbar sind

**Belegliste:** Jeder Beleg wird als aufklappbare Karte dargestellt. Ein Klick auf die Karte öffnet die Detailansicht mit allen Feldern, dem Prüfergebnis und den Positionen.

**Status-Badges** (rechts auf jeder Karte):

| Badge | Bedeutung |
|---|---|
| `Neu` (grau) | Beleg noch nicht geprüft |
| `Buchbar` (grün) | Buchbarkeit wurde erfolgreich geprüft |
| `Prüffehler` (rot) | Prüfung hat Probleme festgestellt |
| `Im Stapel` (lila) | Beleg wurde erfolgreich übergeben |
| `Stapel-Fehler` (rot) | Übergabe an Stapel fehlgeschlagen |

---

## 3. Beleg anlegen – Schritt für Schritt

1. Klicken Sie auf **+ Neuer Beleg**.  
   Das Erfassungsformular öffnet sich als Dialogfenster.

2. Füllen Sie den **Belegkopf** aus (Pflichtfelder mit * markiert).

3. Füllen Sie mindestens **eine Belegposition** aus (Kontotitel + Betrag sind Pflicht).

4. Kontrollieren Sie die **Summenanzeige** unten in der Positionstabelle:  
   Die Summe aller Positionsbeträge muss mit dem Belegbetrag übereinstimmen.  
   Das System zeigt ein grünes „✓ Stimmt überein" oder eine rote Differenzangabe.

5. Klicken Sie auf **Beleg speichern**.  
   Der Beleg erscheint in der Liste mit dem Badge `Neu`.

> **Hinweis:** Das Formular öffnet beim Start automatisch eine leere Positionszeile.  
> Diese können Sie direkt befüllen oder mit dem **✕**-Button rechts entfernen und  
> durch Klick auf **＋ Position hinzufügen** eine neue anlegen.

---

## 4. Belegkopf ausfüllen

| Feld | Pflicht | Beschreibung |
|---|---|---|
| **Belegart** | ✱ | Art des Belegs. Wählbar: `Umbuchung`, `Eingangsrechnung`, `Ausgangsrechnung`, `Gutschrift`, `Sammelbeleg` |
| **Status** | ✱ | Steuert das Verhalten nach der Übergabe ans System (siehe unten) |
| **Buchungsdatum** | ✱ | Datum der Buchung im Format JJJJ-MM-TT. Muss innerhalb des offenen Buchungszeitraums liegen |
| **Belegdatum** | ✱ | Datum des Originalbelegs, z.B. das Rechnungsdatum |
| **Belegkonto** | ✱ | Kontotitel des Sammelkontos (Gegenseite aller Positionen), z.B. `LOHN-UND GEHALTSVER` |
| **Währung** | ✱ | ISO-Kürzel der Buchungswährung, Standard: `EUR` |
| **Belegnummer** | – | Externe Belegnummer. `0` = automatische Vergabe aus dem Nummernkreis der Belegart |
| **Belegbetrag** | ✱ | Gesamtbetrag des Belegs bezogen auf das Belegkonto (siehe Vorzeichen-Regel) |
| **Belegtext** | – | Freitext zur Buchung, z.B. „Gehaltsbuchung März 2025" |
| **Referenz** | – | Externe Referenznummer, z.B. aus dem Quellsystem (SAGE, SAP, …) |
| **Quellsystem** | – | Kürzel des erfassenden Systems (max. 8 Zeichen), z.B. `SAGE` |

### Statuswerte

| Wert | Bezeichnung | Verhalten im System |
|---|---|---|
| `1` | Nur speichern | Beleg wird angelegt, hat aber noch keinen Buchungseffekt. Empfohlen für erste Tests. |
| `2` | In Stapel | Beleg wird in den Buchungsstapel gestellt und beim nächsten Stapellauf gebucht. Normalfall bei der Stapelverarbeitung. |
| `3` | Sofort buchen | Beleg wird unmittelbar gebucht. Nur verwenden, wenn sofortige Buchung ausdrücklich gewünscht ist. |

### Vorzeichen des Belegbetrags

Das Vorzeichen bezieht sich auf die Buchungsseite des **Belegkontos** (nicht der Positionen):

| Buchungsseite des Belegkontos | Belegbetrag |
|---|---|
| Haben – Verbindlichkeit steigt (Normalfall bei Eingangsrechnungen) | **positiv** |
| Soll – Forderung steigt | **negativ** |

**Beispiel:** Gehaltsbuchung. Belegkonto ist das Verbindlichkeitskonto `LOHN-UND GEHALTSVER`. Dieses wird im Haben belastet → Belegbetrag **positiv**.

---

## 5. Belegpositionen erfassen

Jeder Beleg benötigt mindestens eine Position. Eine Position entspricht einer Buchungszeile auf einem Gegenkonto zum Belegkonto.

### Felder der Positionstabelle

| Spalte | Pflicht | Beschreibung |
|---|---|---|
| **#** | – | Laufende Nummer (automatisch) |
| **Positionsart** | ✱ | Art der Position. Standardfall: `Sachbuchung` |
| **Kontotitel** | ✱ | Sachkonto der Position (Kontotitel), z.B. `GEHÄLTER` |
| **Betrag** | ✱ | Positionsbetrag in Buchungswährung. Immer positiv angeben – die Buchungsseite steuert das Feld „Soll" |
| **BetragHW** | ✱ | Betrag in Hauswährung. Bei EUR-Buchungen identisch mit „Betrag" |
| **Soll** | ✱ | Checkbox: ✓ = Soll-Buchung, leer = Haben-Buchung |
| **Brutto** | – | Checkbox: ✓ = Betrag enthält Umsatzsteuer (Bruttobetrag) |
| **USt-Schlüssel** | Bedingt | Umsatzsteuerschlüssel – nur bei Konten mit USt-Kontierung „Vorgangsabhängig" (siehe Kapitel 6) |
| **Kostenstelle** | Bedingt | Kostenstellennummer – Pflicht bei Aufwandskonten mit BAB-Zuordnung (siehe Kapitel 7) |
| **KSt-Betrag** | Bedingt | Betrag für die Kostenstellen-Zuordnung (bei Bruttobuchungen: Nettobetrag!) |
| **Positionstext** | – | Freitext zur einzelnen Position |

### Summenprüfung

Unterhalb der Positionstabelle wird laufend die Summe aller Positionsbeträge angezeigt und mit dem Belegbetrag verglichen:

- **„✓ Stimmt überein"** (grün) – Summe und Belegbetrag stimmen überein, Beleg kann gespeichert werden
- **„✗ Differenz: 250,00"** (rot) – Differenz zwischen Belegbetrag und Positionssumme, bitte korrigieren

> **Wichtig:** Der Belegbetrag muss betragsmäßig der Summe der Positionsbeträge entsprechen. Vorzeichen spielen dabei keine Rolle – das System vergleicht die absoluten Beträge.

---

## 6. Umsatzsteuer-Handling

### Grundregel: Kontokonfiguration entscheidet

Ob ein USt-Schlüssel angegeben werden muss oder darf, hängt ausschließlich von der Konfiguration des Sachkontos im System ab (Feld `UStKontierung`):

| Kontokonfiguration | USt-Schlüssel senden? |
|---|---|
| `Vorgangsabhängig` | ✅ Ja – und bei `Brutto = ✓` zwingend erforderlich |
| `keine Auswahl` | ❌ Nein – Feld leer lassen, sonst Fehler |
| `Vorsteuer` / `Umsatzsteuer` | ❌ Nein – diese Konten bucht das System intern automatisch |

**Personalkosten-Konten ohne USt** (Beispiele – Feld leer lassen):  
`GEHÄLTER`, `AUSBILDUNGSVERGÜTUNG`, `GESETZL. SOZ. AUFW.`, `URLAUBSGELD`, `LEISTUNGSPRÄMIE`

**Konten mit USt** (Beispiele – USt-Schlüssel angeben):  
`REISEKOSTEN`, `BÜROMATERIAL`, `WERBEKOSTEN`

### Format des USt-Schlüssels

Der USt-Schlüssel muss exakt dem Lookup-Text der Gruppe „USt" im System entsprechen, **mit führender Null bei einstelligen Steuersätzen:**

| Steuersatz | Korrekter Wert | Häufiger Fehler |
|---|---|---|
| 7 % | `VSt 07%` | ~~`VSt 7%`~~ |
| 19 % | `VSt 19%` | – |
| 0 % | `VSt 0%` | – |

### Bruttobuchungen (Checkbox „Brutto" aktiviert)

Wenn der erfasste Betrag die Umsatzsteuer bereits enthält (Bruttobetrag auf Rechnung):

1. Aktivieren Sie die Checkbox **Brutto** in der Position.
2. Tragen Sie den **Bruttobetrag** (inkl. USt) im Feld **Betrag** ein.
3. Tragen Sie den passenden **USt-Schlüssel** ein (Pflicht bei Brutto).
4. Im Feld **KSt-Betrag** den **Nettobetrag** eintragen – nicht den Bruttobetrag!

**Berechnung des Nettoanteils:**

```
Nettobetrag = Bruttobetrag ÷ (1 + Steuersatz)

Beispiele:
  48,10 € brutto mit 7%:  48,10 ÷ 1,07 = 44,95 € netto
  64,44 € brutto mit 19%: 64,44 ÷ 1,19 = 54,15 € netto
```

> **Hintergrund:** Das Buchhaltungssystem spaltet Bruttobuchungen intern in Netto-Anteil (auf das Aufwandskonto)  
> und USt-Anteil (automatisch auf das konfigurierte Vorsteuerkonto) auf.  
> Die Kostenstellen-Zuordnung bezieht sich nur auf den Netto-Anteil.

---

## 7. Kostenstellen-Zuordnung

### Wann ist eine Kostenstelle Pflicht?

Aufwandskonten, die einem Betriebsabrechnungsbogen (BAB) zugeordnet sind, **müssen** eine Kostenstelle erhalten. Ohne Kostenstelle schlägt die Buchung fehl.

**Typische Aufwandskonten (Kostenstelle erforderlich):**  
`GEHÄLTER`, `AUSBILDUNGSVERGÜTUNG`, `REISEKOSTEN`, `BÜROMATERIAL` usw.

### Wann darf keine Kostenstelle angegeben werden?

Bilanzkonten (Verbindlichkeiten, Forderungen) haben keine BAB-Zuordnung. Für diese Konten darf das Feld Kostenstelle **nicht** befüllt werden.

**Typische Bilanzkonten (Kostenstelle leer lassen):**  
`LOHN-UND GEHALTSVER`, `VERB. LOHN U. GEHALT`, `VERB. SV`, `VERB. LOHN&KISTEUER`

### Kostenstellen-Betrag bei Bruttobuchungen

Bei aktivierter Checkbox „Brutto" muss im Feld **KSt-Betrag** der **Nettobetrag** stehen (nicht der Bruttobetrag). Siehe Kapitel 6 für die Berechnung.

---

## 8. Beleg speichern und bearbeiten

### Speichern

Nach dem Ausfüllen klicken Sie auf **Beleg speichern**. Das System prüft alle Pflichtfelder. Wenn ein Feld fehlt oder falsch befüllt ist, erscheint ein **roter Hinweis im oberen Bereich des Formulars** mit einer genauen Fehlerbeschreibung.

Nach erfolgreichem Speichern schließt das Formular automatisch, der Beleg erscheint in der Liste.

### Bearbeiten

Klicken Sie auf das **✏-Symbol** rechts auf einer Beleg-Karte. Das Formular öffnet sich mit den vorhandenen Daten zur Bearbeitung. Nach dem Speichern wird der Prüfstatus zurückgesetzt (`Neu`) – der Beleg muss erneut geprüft werden.

### Löschen

Klicken Sie **zweimal** auf das **🗑-Symbol**:
- **1. Klick:** Das Symbol wechselt zu „✓ Löschen?". Sie haben 3 Sekunden Zeit zu bestätigen.
- **2. Klick:** Der Beleg wird unwiderruflich gelöscht.
- Wenn Sie nach dem 1. Klick nichts tun, setzt sich der Button nach 3 Sekunden automatisch zurück.

---

## 9. Buchbarkeit prüfen

### Funktion

Der Button **⬡ Buchbarkeit prüfen** führt für alle Belege in der Liste eine Vorprüfung durch, **ohne etwas zu buchen oder zu speichern**. Die Prüfung läuft automatisch für alle Belege nacheinander durch und zeigt das Ergebnis in der aufgeklappten Detailansicht jedes Belegs.

### Prüfcode

Das Ergebnis wird als **9-stelliger Code** angezeigt. Jede Stelle steht für eine bestimmte Prüfung. Eine `0` bedeutet bestanden, ein Wert `> 0` zeigt ein Problem an.

| Stelle | Was wird geprüft | Fehlerwert |
|---|---|---|
| **1** | Buchungsdatum liegt im offenen Buchungszeitraum des Mandanten | `1` = außerhalb |
| **2** | Rechnungswesenperiode ist nicht geschlossen | `1` = geschlossen, `2` = kein Periodenraster |
| **3** | Alle Sachkonten existieren und sind lesbar | `1` = Konto nicht gefunden |
| **4** | Alle Konten erlauben Bebuchung (keine Sperre) | `1` = außerh. Kontierungszeitraum, `2` = gesperrt |
| **5** | Alle Kostenstellen existieren und sind Basisobjekte | `1` = nicht gefunden |
| **6** | Alle Kostenstellen erlauben Bebuchung | `1` = Zeitraum, `2` = Sperre |
| **7** | Sachkonten sind dem Basis-BAB der Kostenstellen zugeordnet | `1` = fehlende Zuordnung |
| **8** | Sachkonten sind dem BAB der Hierarchieobjekte zugeordnet | `1` = fehlende Zuordnung |
| **9** | Haushaltsstellen im Buchungsjahr vorhanden | `1` = nicht eingerichtet |

**Beispiele:**

| Code | Bedeutung |
|---|---|
| `000000000` | Alle 9 Prüfungen bestanden |
| `100000000` | Buchungsdatum außerhalb des Buchungszeitraums (Stelle 1) |
| `001000000` | Sachkonto nicht gefunden (Stelle 3) |
| `000010000` | Kostenstelle fehlt oder nicht als Basisobjekt (Stelle 5) |
| `000000100` | Sachkonto nicht im Basis-BAB der Kostenstelle (Stelle 7) |

Unterhalb des Codes werden zu jeder Stelle **sprechende Meldungen** mit der genauen Fehlerursache angezeigt.

### Wichtiger Hinweis

> Ein Prüfcode von `000000000` bedeutet, dass alle 9 Standardprüfungen bestanden wurden.  
> **Er garantiert jedoch nicht zwingend den Erfolg beim Schreiben in den Stapel.**  
> Es können weitere fachliche Prüfungen folgen (z.B. Betragskonsistenz, USt-Schlüssel-Format).

### Was nach einer fehlgeschlagenen Prüfung zu tun ist

1. Klicken Sie auf die Beleg-Karte (aufklappen, falls noch nicht offen).
2. Lesen Sie die sprechende Meldung zur fehlerhaften Stelle.
3. Klicken Sie auf **✏ Bearbeiten** und korrigieren Sie den Beleg.
4. Klicken Sie erneut auf **Buchbarkeit prüfen**.

---

## 10. In Stapel schreiben

### Voraussetzung

Der Button **▶ In Stapel schreiben** wird erst freigeschaltet, wenn **alle Belege** in der Liste den Prüfcode `000000000` erhalten haben (Badge `Buchbar`).

### Ablauf

1. Klicken Sie auf **▶ In Stapel schreiben**.
2. Das System übergibt jeden Beleg einzeln an das Buchhaltungssystem.
3. Für jeden Beleg erscheint das Ergebnis in der Detailansicht:
   - **„✓ Stapel OK"** (grüne Meldung) – Beleg wurde übergeben, Badge wechselt zu `Im Stapel` (lila)
   - **„✗ Stapel fehlgeschlagen"** (rote Meldung) – Übergabe fehlgeschlagen, Fehlermeldung mit Ursache

### Mögliche Fehler beim Stapelschreiben

Einige Prüfungen erfolgen erst bei der tatsächlichen Übergabe und werden von der Vorabprüfung nicht abgefangen:

| Fehlermeldung | Ursache |
|---|---|
| Belegbetrag stimmt nicht mit Summe der Positionen überein | Betragsdifferenz – Positionen und Belegbetrag nochmals abstimmen |
| brutto=true ohne USt-Schlüssel | Brutto-Checkbox aktiviert, aber kein USt-Schlüssel eingetragen |
| USt-Schlüssel ungültig – Führende Null erforderlich | `VSt 7%` statt korrektem `VSt 07%` |
| Kostenstellen-Betrag entspricht nicht dem Nettobetrag | KSt-Betrag bei Bruttobuchung fälschlicherweise mit Brutto statt Netto befüllt |
| Bilanzkonto mit Kostenstellen-Zuordnung | Für ein Verbindlichkeits-/Forderungskonto wurde eine Kostenstelle eingetragen |

### Nach dem Stapelschreiben

- Erfolgreich übergebene Belege sind mit `Im Stapel` (lila) markiert und können nicht mehr bearbeitet oder erneut übertragen werden.
- Fehlgeschlagene Belege behalten den Status `Stapel-Fehler` (roter Rahmen) und müssen korrigiert und erneut geprüft werden.
- Sobald alle Belege `Im Stapel` sind, zeigt der Statushinweis „Alle X Beleg(e) erfolgreich in den Stapel geschrieben. ✓"

---

## 11. Häufige Fehlermeldungen und Lösungen

### Fehlermeldungen beim Speichern (im Formular)

| Meldung | Ursache | Lösung |
|---|---|---|
| Bitte Belegart auswählen | Pflichtfeld leer | Belegart aus der Liste wählen |
| Belegkonto (Kontotitel) fehlt | Kein Belegkonto eingetragen | Kontotitel eintragen |
| Belegbetrag fehlt oder ist ungültig | Betrag leer oder kein gültiger Zahlenwert | Betrag als Dezimalzahl eintragen (Punkt als Dezimaltrenner) |
| Mindestens eine ausgefüllte Position erforderlich | Keine Position mit Kontotitel und Betrag vorhanden | Positionstabelle befüllen |
| Eine Position hat keinen Kontotitel | Positionszeile mit Betrag, aber ohne Kontotitel | Kontotitel ergänzen oder leere Zeile entfernen |
| Position X: Betrag ist 0 | Kontotitel eingetragen, aber Betrag fehlt | Betrag ergänzen oder Position entfernen |

### Fehlermeldungen bei der Buchbarkeitsprüfung

| Stelle | Typische Meldung | Ursache | Lösung |
|---|---|---|---|
| 1 | Buchungsdatum liegt außerhalb des erlaubten Buchungszeitraums | Datum zu weit in Vergangenheit oder Zukunft | Datum korrigieren |
| 2 | Rechnungswesenperiode ist geschlossen | Buchungsdatum liegt in geschlossener Periode (>12 Monate zurück) | Datum anpassen oder Buchhaltung kontaktieren |
| 3 | Mindestens ein Sachkonto ist leer | Belegkonto oder Position ohne Kontotitel | Kontotitel eintragen |
| 4 | Konto(en) mit Bebuchungssperre | Kontotitel enthält `GESPERRT` oder `TEST_SPERRE` | Anderen Kontotitel verwenden |
| 5 | Aufwandskonten ohne Kostenstelle | Sachbuchung ohne Kostenstellen-Angabe | Kostenstelle eintragen |
| 6 | Kostenstelle 9999 hat eine Bebuchungssperre | Gesperrte Testkostenstelle verwendet | Gültige Kostenstelle wählen |
| 7 | Sachkonto nicht im Basis-BAB der Kostenstelle | Sachkonto ist dem BAB der Kostenstelle nicht zugeordnet | Zuordnung im System prüfen oder andere Kostenstelle verwenden |

### Fehlermeldungen beim Stapelschreiben

| Meldung | Lösung |
|---|---|
| Belegbetrag X stimmt nicht mit Summe der Positionen Y überein | Beleg bearbeiten, Positionen und Belegbetrag angleichen |
| USt-Schlüssel „VSt 7%" ungültig. Führende Null erforderlich | USt-Schlüssel auf `VSt 07%` korrigieren |
| Kostenstellen-Betrag entspricht nicht dem Nettobetrag | KSt-Betrag neu berechnen: Brutto ÷ (1 + Steuersatz) |
| Bilanzkonto mit Kostenstellen-Zuordnung | Kostenstelle für das Verbindlichkeitskonto entfernen |

---

## 12. Buchungsbeispiele

### Beispiel A – Einfache Gehaltsbuchung (ohne USt)

**Szenario:** Monatliche Gehaltsbuchung, zwei Abteilungen, keine Umsatzsteuer.

**Belegkopf:**

| Feld | Wert |
|---|---|
| Belegart | `Umbuchung` |
| Status | `1 – Nur speichern` |
| Buchungsdatum | `2025-03-31` |
| Belegdatum | `2025-03-31` |
| Belegkonto | `LOHN-UND GEHALTSVER` |
| Währung | `EUR` |
| Belegbetrag | `6500.00` (positiv, da Belegkonto im Haben) |
| Belegtext | `Gehaltsbuchung März 2025` |
| Referenz | `SAGE-2025-03-GEH` |

**Belegpositionen:**

| # | Kontotitel | Betrag | BetragHW | Soll | Brutto | USt-Schlüssel | Kostenstelle | KSt-Betrag |
|---|---|---|---|---|---|---|---|---|
| 1 | `GEHÄLTER` | `5000.00` | `5000.00` | ✓ | – | – | `1010` | `5000.00` |
| 2 | `AUSBILDUNGSVERGÜTUNG` | `1500.00` | `1500.00` | ✓ | – | – | `1020` | `1500.00` |

**Summenprüfung:** 5.000 + 1.500 = 6.500 = Belegbetrag ✓

**Erläuterung:**
- `LOHN-UND GEHALTSVER` ist ein Bilanzkonto → **keine Kostenstelle** beim Belegkonto
- `GEHÄLTER` und `AUSBILDUNGSVERGÜTUNG` sind Aufwandskonten → **Kostenstelle Pflicht**
- Beide Konten haben `UStKontierung = keine Auswahl` → **kein USt-Schlüssel**
- Belegbetrag positiv, da das Belegkonto (Verbindlichkeit) im Haben belastet wird

---

### Beispiel B – Reisekostenabrechnung mit Umsatzsteuer (brutto=true)

**Szenario:** Reisekostenabrechnung mit 7% und 19% Vorsteuer, Bruttobuchung.

**Belegkopf:**

| Feld | Wert |
|---|---|
| Belegart | `Umbuchung` |
| Status | `1 – Nur speichern` |
| Buchungsdatum | `2025-03-31` |
| Belegdatum | `2025-03-28` |
| Belegkonto | `VERB. LOHN U. GEHALT` |
| Währung | `EUR` |
| Belegbetrag | `112.54` (= Summe der Bruttopositionen: 48,10 + 64,44) |
| Belegtext | `Reisekostenabrechnung Müller März 2025` |

**Belegpositionen:**

| # | Kontotitel | Betrag | Soll | Brutto | USt-Schlüssel | Kostenstelle | KSt-Betrag |
|---|---|---|---|---|---|---|---|
| 1 | `REISEKOSTEN` | `48.10` | ✓ | ✓ | `VSt 07%` | `2010` | `44.95` |
| 2 | `REISEKOSTEN` | `64.44` | ✓ | ✓ | `VSt 19%` | `2010` | `54.15` |

**Berechnung der Nettobeträge (KSt-Betrag):**

```
Position 1:  48,10 ÷ 1,07 = 44,953… → gerundet 44,95
Position 2:  64,44 ÷ 1,19 = 54,151… → gerundet 54,15
```

**Erläuterung:**
- `Brutto ✓` → der Betrag enthält bereits die Umsatzsteuer
- `VSt 07%` und `VSt 19%` → **mit führender Null** (nicht `VSt 7%`!)
- **KSt-Betrag = Nettobetrag**, nicht Bruttobetrag – das System bucht den Nettoteil auf das Aufwandskonto und den USt-Teil automatisch auf das Vorsteuerkonto
- Belegbetrag = Summe der **Brutto**beträge: 48,10 + 64,44 = 112,54

---

### Beispiel C – Häufige Fehler bewusst provozieren

Die folgenden Variationen sind nützlich, um die Fehlermeldungen des Systems kennenzulernen:

| Absichtlicher Fehler | Erwartete Fehlermeldung | Zeitpunkt |
|---|---|---|
| Belegbetrag auf `6000.00` setzen (statt 6500,00) bei Beispiel A | Differenz zwischen Belegbetrag und Positionssumme | Beim Stapelschreiben |
| USt-Schlüssel `VSt 7%` statt `VSt 07%` bei Beispiel B | USt-Schlüssel ungültig – Führende Null erforderlich | Beim Stapelschreiben |
| KSt-Betrag auf `48.10` (Brutto statt Netto) bei Position 1, Beispiel B | Kostenstellen-Betrag entspricht nicht dem Nettobetrag | Beim Stapelschreiben |
| Kostenstelle `9999` eintragen | Kostenstelle 9999 hat eine Bebuchungssperre | Buchbarkeit prüfen, Stelle 6 |
| Buchungsdatum mehr als 2 Jahre zurück | Buchungsdatum außerhalb des Buchungszeitraums | Buchbarkeit prüfen, Stelle 1 |
| Buchungsdatum mehr als 12 Monate zurück | Rechnungswesenperiode ist geschlossen | Buchbarkeit prüfen, Stelle 2 |
| Aufwandskonto ohne Kostenstelle | Aufwandskonten ohne Kostenstelle | Buchbarkeit prüfen, Stelle 5 |
| Kontotitel enthält das Wort `GESPERRT` | Konto mit Bebuchungssperre | Buchbarkeit prüfen, Stelle 4 |

---

---

## Anhang A – Kontenverzeichnis (Schulungsumgebung)

Die folgenden Kontotitel sind in der Schulungsumgebung eingerichtet. **Nur diese Bezeichnungen werden von der Prüfung akzeptiert** – Groß-/Kleinschreibung und Sonderzeichen müssen exakt übereinstimmen.

### Bilanzkonten (Belegkonto / Verbindlichkeiten)

Für diese Konten ist **keine Kostenstelle** anzugeben. Sie werden typischerweise als Belegkonto verwendet.

| Kontotitel | Kontoart | Kostenstelle |
|---|---|---|
| `LOHN-UND GEHALTSVER` | Verbindlichkeit Löhne & Gehälter | nicht erlaubt |
| `VERB. LOHN U. GEHALT` | Verbindlichkeit Löhne & Gehälter (alternativ) | nicht erlaubt |
| `VERB. SV` | Verbindlichkeit Sozialversicherung | nicht erlaubt |
| `VERB. LOHN&KISTEUER` | Verbindlichkeit Lohn- und Kirchensteuer | nicht erlaubt |

### Aufwandskonten ohne Umsatzsteuer

Für diese Konten ist eine **Kostenstelle Pflicht**. Ein USt-Schlüssel darf **nicht** angegeben werden (`UStKontierung = keine Auswahl`).

| Kontotitel | Beschreibung | Kostenstelle |
|---|---|---|
| `GEHÄLTER` | Gehälter Angestellte | **Pflicht** |
| `AUSBILDUNGSVERGÜTUNG` | Vergütung Auszubildende | **Pflicht** |
| `13. MONATSGEHALT` | Jahressonderzahlung | **Pflicht** |
| `URLAUBSGELD` | Urlaubsgeldauszahlung | **Pflicht** |
| `LEISTUNGSPRÄMIE` | Leistungsabhängige Prämien | **Pflicht** |
| `JUBILÄUMSZUWENDUNG` | Jubiläumsbonus | **Pflicht** |
| `GESETZL. SOZ. AUFW.` | Gesetzlicher Sozialaufwand (Arbeitgeberanteil) | **Pflicht** |
| `PAUSCH. LOHNSTEUER` | Pauschalierte Lohnsteuer | **Pflicht** |

### Aufwandskonten mit Umsatzsteuer

Für diese Konten ist eine **Kostenstelle Pflicht**. Bei Bruttobuchungen muss ein **USt-Schlüssel** angegeben werden (`UStKontierung = Vorgangsabhängig`).

| Kontotitel | Beschreibung | Kostenstelle | USt-Schlüssel |
|---|---|---|---|
| `REISEKOSTEN` | Reise- und Fahrtkosten | **Pflicht** | Pflicht bei Brutto |
| `BÜROMATERIAL` | Büro- und Verbrauchsmaterial | **Pflicht** | Pflicht bei Brutto |
| `WERBEKOSTEN` | Werbung und Marketing | **Pflicht** | Pflicht bei Brutto |

---

## Anhang B – Kostenstellenverzeichnis (Schulungsumgebung)

Die folgenden Kostenstellen sind in der Schulungsumgebung eingerichtet. **Nur diese Nummern werden von der Prüfung akzeptiert.**

| Kostenstellen-Nr. | Bezeichnung | Abteilung |
|---|---|---|
| `1010` | Entwicklung | IT & Software |
| `1020` | Ausbildung | Personal |
| `1030` | Verwaltung | Administration |
| `2010` | Vertrieb | Sales |
| `2020` | Marketing | Marketing |
| `3050` | Geschäftsführung | Management |

> **Sonderfall für Negativ-Tests:** Die Kostenstelle `9999` ist in der Simulation als gesperrt eingetragen.  
> Wird sie verwendet, schlägt die Prüfung an Stelle 6 mit Fehlercode `2` fehl.

### Welche Kostenstelle gehört zu welchem Konto?

Es gibt keine feste 1:1-Zuordnung zwischen Konto und Kostenstelle – jede der oben genannten Kostenstellen kann mit jedem Aufwandskonto kombiniert werden. Die Zuordnung richtet sich nach der Abteilung, die den Aufwand verursacht hat.

**Beispiele:**
- Gehälter der Entwicklungsabteilung → Kostenstelle `1010`
- Reisekosten des Vertriebs → Kostenstelle `2010`
- Büromaterial Verwaltung → Kostenstelle `1030`
- Ausbildungsvergütung → Kostenstelle `1020`

---

## Anhang C – Gültige USt-Schlüssel

| USt-Satz | Schlüssel | Hinweis |
|---|---|---|
| 7 % | `VSt 07%` | Führende Null Pflicht – `VSt 7%` wird abgelehnt |
| 19 % | `VSt 19%` | Standardsatz |
| 0 % | `VSt 0%` | Steuerbefreit |

---

## Anhang D – Testparameter der Schulungsumgebung

Die folgenden Parameter sind in der Schulungsumgebung fest eingestellt und gelten für alle Übungen.

### Buchungszeitraum und Perioden

| Regel | Grenze | Prüfstelle |
|---|---|---|
| Buchungsdatum maximal 24 Monate zurück | Datum < heute − 24 Monate → Stelle 1 = `1` | Stelle 1 |
| Buchungsdatum nicht in der Zukunft | Datum > heute → Stelle 1 = `1` | Stelle 1 |
| Periode offen für die letzten 12 Monate | Datum < heute − 12 Monate → Stelle 2 = `1` | Stelle 2 |

> **Hinweis:** Der Fehlerwert `2` bei Stelle 2 („kein Periodenraster") ist in der Schulungsumgebung nicht auslösbar und kann bei der Testfallspezifikation ignoriert werden.

### Beträge und Rundung

| Parameter | Wert |
|---|---|
| Dezimaleingabe | Punkt als Trenner (z.B. `48.10`) |
| Rundung | Kaufmännisch auf 2 Nachkommastellen |
| Nettobetrag-Berechnung | Bruttobetrag ÷ (1 + Steuersatz), Ergebnis gerundet |

---

*Alle Kontotitel, Kostenstellen und Bezeichnungen sind fiktiv und dienen ausschließlich Schulungszwecken.*

