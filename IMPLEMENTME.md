# Hafen-Cockpit (Aufgabe: Architektur – "Hafen-Cockpit mit dynamischen Widgets")

## Domäne
#### *Gegeben*
*Ein konfigurierbares Dashboard für die Hafenleitstelle.*
#### Folgerungen & Annahmen
Business Process Software mit geringer Nutzerzahl -> Ladezeiten nicht entscheidend, dafür komplexerer Use-Case -> Fast Prototype first, performance later, um frühzeitig ein umfassenderes Bild der Anforderungen zu bekommen.
-> Kernanforderungen, erweiterbar und vor allem flexibel implementieren
##### Code Orga:
Dashboard ist meist nur der Anfang... Weitere Features? Shared Components? ->
Projekt workspace mit ng-cli anlegen -> offen für mono repo inkl. backends etc? (change now or never....)
Neues Repo:
  + Repo nach Projekt benennen, einfach identifizierbar im business-sprech: Hafenleitstelle
	+ Angular Projects Folder: UI-Angular (Scope: Angular basierte Apps und Libs).Offen für "UI-React", aber nicht zu tief getestet
	+ AppFolder: Hafen-Cockpit (Dashboard)
Nachteil: wer die Hafen-Cockpit app sucht, muss wissen, dass es Angular ist... (shrug, nur beim ersten mal ein problem, schnell erfragbar, und nur wenn es mehrere UI-Frameworks gibt) Index in Readme?

## Aufgabenstellung:
#### *Gegeben*
Erstelle ein „Hafen-Cockpit", in dem Nutzer Widgets per Drag & Drop anordnen und persistieren können (localStorage).
Mindestens drei Widget-Typen mit echten Daten:
  + Tide-Widget: aktueller Wasserstand & Tide-Kurve für den Pegel Hamburg St. Pauli (PEGELONLINE)
  + Wetter-Widget: aktuelle Bedingungen + Windstärke für Hamburg (DWD/Brightsky)
  + Warnungen-Widget: aktive Unwetterwarnungen (DWD)
#### Folgerungen & Annahmen

Basis Widget mit grid placement. Anforderungen an Darstellungsgröße unterschiedlich:
	+ Warnungen: meistens leer dafür ggf. dynamische (automatisch angepasste) Größe und scrollbar
	+ Wetter: braucht nur Zahl und Richtung, fix
	+ Tide Graph vom user Skalierbar, um hohe Datenauflösung mit gleichzeitigem big picture zu verbinden.
Tide Widget deckt den allgemeinsten Fall ab, als erstes implementieren (außer scroll).
Da keine konfligierenden Features oder große Komplexität -> eine Allgemeine Basis Komponente mit flags:
	+ Resize: User | Auto | none
	+ Scroll: Auto | none (none für graph, au?er datenzoom, *Nachfragen* )
	+ Default Grid Size W/H


Für Daten: Open Source APIs.
### Anforderungen:
#### *Gegeben*
  *Dynamisches Laden der Widgets mit Erkennung des Ladezustandes*
  *Saubere Trennung Core / Shared / Feature, strikte Typisierung, keine any*
#### Folgerungen & Annahmen
Laden on:
	+ Init
	+ User Refresh
	+ Change Detection? Websockets?
Busy State laut spec nur für lesen. Spätere Unterscheidung? ->
State im Allgemeinen: Für Dashboard Widgets reicht ein lokaler state, da keine komplexeren Abhängigkeiten intern oder extern erwartbar.
Public API -> DTO Validierung wahrscheinlich nicht nötig, ggf später.
Eine Api Service pro Widget Instanz, der den eigenen busy state exponiert, ggf differenziert nach art (ladend schreibend),


### Fragen
Anzeige Vollbild? Integriert in bestehende App?
Schreibende Widgets (POST/PUT)? Warnung vor Concurrency handling.
Läuft auf on premise server? Nur aus lokalem WAN erreichbar? User AUth?
Separater Refresh und Anzeigen des busy-state von mehreren Unterfunkionen eines Widgets als requirement erwartbar?
Refresh All?

# TODO
+  Fill readme with general project info, repo structure, and how to build and run angular app
