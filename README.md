# KI-gestütztes Testen – Trainingsmaterialien
 
Workshop-Unterlagen zum Einsatz von KI-Chatbots in der Testfallspezifikation und Testdatengenerierung. Die Übungen nutzen eine fiktive Belegerfassungsanwendung als durchgängiges Beispiel.

## Voraussetzungen
 
- Ein aktueller Browser (die HTML-Dateien laufen lokal über `file://`, kein Webserver nötig)
- Zugang zu einem KI-Chatbot (z. B. ChatGPT, Claude, firmeninternes Modell)

## Testfallspezifikation

Das Finanz-Team eurer Firma nutzt die Belegerfassungsmaske, um Buchungen manuell zu erfassen. Bevor Belege in den Buchungsstapel geschrieben werden, führt das System eine Buchbarkeitsprüfung durch (`pruefeBuchbarkeit`). In diesen Übungen lernt ihr, wie KI-Chatbots bei der systematischen Testfallspezifikation unterstützen können.

### Benötigte Dateien:
- **Handbuch:** [belegerfassung_handbuch_v1.0.md](./Testfallspezifikation/Dokumentation/belegerfassung_handbuch_v1.0.md) (inkl. Anhänge A–C)
- **Belegerfassungsmaske:** [belegerfassung.html](./Testfallspezifikation/System/belegerfassung.html) (Die Datei kann heruntergeladen und mit dem Browser geöffnet werden.)


### Übungen:
1. [Übung1_Funktion_verstehen_Aequivalenzklassen.md](./Testfallspezifikation/Übung1_Funktion_verstehen_Aequivalenzklassen.md)
2. [Übung2_Testfaelle_auswaehlen.md](./Testfallspezifikation/Übung2_Testfaelle_auswaehlen.md)
3. [Übung3_Testfaelle_spezifizieren.md](./Testfallspezifikation/Übung3_Testfaelle_spezifizieren.md)
4. [Übung4_Testfaelle_ausfuehren.md](./Testfallspezifikation/Übung4_Testfaelle_ausfuehren.md)
5. [Übung5_Reflexion_im_Team.md](./Testfallspezifikation/Übung5_Reflexion_im_Team.md)


## Testdatengenerierung

Der `RechnungswesenService` bietet u.a. zwei Operationen:

- **`pruefeBuchbarkeit`** – liefert einen 9-stelligen Prüfcode zurück, jede Stelle für einen Prüfbereich (0 = ok, >0 = Fehler). Keine Buchung.
- **`insertBeleg`** – legt den Beleg tatsächlich an. Liefert bei Fehlern einen SOAP Fault mit Klartextmeldung.

In diesen Übungen lernt ihr, wie KI-Chatbots beim Erstellen und Validieren von SOAP-Requests unterstützen können.

### Benötigte Dateien:
- **Handbuch:** [belegerfassung_handbuch_v1.0.md](./Testfallspezifikation/Dokumentation/belegerfassung_handbuch_v1.0.md)
- **SOAP-Testclient:** [soap_testclient.html](./Testdategenerierung/System/soap_testclient.html) (Die Datei kann heruntergeladen und mit dem Browser geöffnet werden.)
- **WSDL:** [rechnungswesen-training.wsdl](./Testdategenerierung/Schnittstellenspezifikation/rechnungswesen-training.wsdl)
- **XSD:** [rechnungswesen-training.xsd](./Testdategenerierung/Schnittstellenspezifikation/rechnungswesen-training.xsd)
- **Beispiel-XML:**
  - [beispiel_01_pruefeBuchbarkeit.xml](./Testdategenerierung/Beispieldaten/beispiel_01_pruefeBuchbarkeit.xml)
  - [beispiel_02_insertBeleg_ohne_ust.xml](./Testdategenerierung/Beispieldaten/beispiel_02_insertBeleg_ohne_ust.xml)
  - [beispiel_03_insertBeleg_mit_ust.xml](./Testdategenerierung/Beispieldaten/beispiel_03_insertBeleg_mit_ust.xml)

### Übungen:
1. [Übung1_Fehler_systematisch_provozieren.md](./Testdategenerierung/Übung1_Fehler_systematisch_provozieren.md)
2. [Übung2_USt_Fallen.md](./Testdategenerierung/Übung2_USt_Fallen.md)
3. [Übung3_Requests_aus_WSDL_generieren.md](./Testdategenerierung/Übung3_Requests_aus_WSDL_generieren.md)
4. [Übung4_Von_Fachanforderung_zum_Request.md](./Testdategenerierung/Übung4_Von_Fachanforderung_zum_Request.md)
