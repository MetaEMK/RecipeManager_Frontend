# ReMa der RecipeManager

# Key Features:
Hier werden alle wichtigen Komponenten für den Endnutzer erklärt.

## Abteilungen:
- dienen zur verbesserten Verwaltung von Rezepten
- mit Abteilungen wird automatisch ein Wochenplaner erstellt. Dieser ist auf der Startseite sichtbar.
- In der Abteilungsansicht können Rezepte hinzugefügt oder entfernt werden
- Kategorien werden dabei als eine Art Tag automatisch als Filter zugewiesen

## Kategorien
- diesen zur verbesserten Verwaltung von Rezepten
- In der Kategorieansicht können Rezepte hinzugefügt oder entfernt werden.
- Abteilungen werden dabei als eine Art Tag automatisch als Filter zugewiesen

## Rezepte
- Rezepte beinhalten Varianten.
- Rezepte können unter Anderem in einer Rezepteübersicht mithilfe von Filtern (Kategorien, Abteilungen) gefunden werden.
- Rezepte können Abteilungen und Kategorien zugewiesen werden.

## Varianten
- Varianten fassen verschieden Zutaten in Arbeitsschritten zusammen.
- Mithilfe von Umrechenarten, Größen und Mengenangaben können die Mengenangaben der Arbeitsschritte schnell und automatsiert umgerechnet werden.
- Varianten können nach dem Erstellen ihre Umrechnungsart nichtmehr ändern. Die Basisgröße lässt sich allerdings noch ändern.
- Varianten können dem Wochenplaner zugewiesen werden.
! Dabei muss das dazugehörige Rezept Abteilung des Planers zugewiesen sein ! 

## Wochenplaner:
- Hier können Varianten der der Abteilung zugewiesenen Rezepten in einer Übersicht hinzufügen werden.
- Der Planer speichert dabei die Größe und Menge der Variante und verlinkt auf die vorkonfigurierte Variantenseite.

## Umrechnungsarten und Größen
- Diese können automatisch vom seeder beim Start des Servers (Backend) eingefügt.
- Bei jedem Start des Servers wird der Seeder gestartet und kann nach einer manuellen Bestätigungen vordefinierte Fantasie-Umrechenarten und Größen einfügen
!Diese vom Seeder eingefügten Daten sind frei erfunden und dürfen nicht für den produktiven Nutzen verwendet werden!
- In der aktuellen Version können Größen und Umrechenarten nicht manuell über das Frontend bearbeitet werden
- Diese Umrechenarten sind für Testzwecke notwendig um Varianten anzulegen und um alle aktuellen Features der Anwendung testen und nutzen zu können


# Installation:
## Backend:
1. zip herunterladen und entpacken
2. 'npm install' ausführen
3. 'npm run-script start' ausführen
4. (Nur beim ersten Start oder Zurücksetzen Anwendung) den Seeder mit 'y' bestätigen
5. (sollte Fall 4 nicht eintreffen) den Seeder mit 'n' überspringen

## Frontend:
1. zip herunterladen und entpacken
2. 'npm install' ausführen
3. 'npm run-script build' ausführen
4. den Browser öffnen und die Anwendung über 'http://localhost:4200/' aufrufen
