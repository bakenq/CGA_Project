# **Computer graphics & Animation** - WiSe 2022/23
 
This repository contains the project for the CGA 101 course at the University of Applied Sciences Hamburg.  



The following text will be written in german and will outline the basic premise and functions of the project.

## Anforderungen
Die Anforderungen des Projektes waren es einen Three.js-Demonstrator zu programmieren.
Dieser sollte zwei Modelle beinhalten, welche dem Leitthema Energie und Nachhaltigkeit folgen.

Ein Modell sollte aus einer GLTF-Datei importiert werden, welche aus dem vorangegangen
Blenderkurs stammen kann oder auch ein anderes nicht selbst erstelltes Modell.
Das zweite Modell soll dem ersten in Struktur, Aufbau, Animationen etc. ähneln, aber aus Three.js Grundkörpern bestehen.

Es wurde sich hier für ein Gezeitenkraftwerk entschieden, wobei das linke Modell aus Three.js Grundkörpern besteht und
das Rechte aus einer GlTF-Datei importiert wurde.

## Funktionen
Bei beiden Modellen ist es möglich Animationen abzuspielen, welche entweder die Rotoren drehen oder den Arm, an dem die
Rotoren angebracht sind, jeweils nach oben oder unten fahren. Diese Animation können durch einen Linksklick auf
das entsprechende Teil(Rotor/Arm) ausgeführt werden.
Es ist jedoch nicht möglich die Rotoren zu drehen solange der Arm oben ist, da sie sich dort in Wartungsstellung
befinden und sich erst wieder drehen sollen, sobald sie das Wasser erreichen.

Die Rotoren des Three.js-Modells lassen sich an beliebigen Positionen stoppen, aber werden an ihre Ursprungsposition
zurückgesetzt, sobald der Arm nach oben gefahren wird. Die geschieht um zu vermeiden, dass die Rotoren unschön durch 
die Plattform des Gezeitenkraftwerks "clippen".
Die Rotoren des GLTF-Modells drehen sich bei Klick ebenfalls und lassen sich mit erneutem Klicken auch wieder stoppen.
Sie kehren dann an ihre Ursprungsposition zurück. Bei der Animation des Hoch- und Runterfahrens des Armes wird 
mithilfe von Funktionslogik ein Sound abgespielt, welcher die Hydraulik der Armes darstellen soll.

Im Hintergrund sind ebenfalls durchgehend Meeresgeräusche zu vernehmen.

Beiden Modelle wurden ebenfalls mit Physik versehen. Diese kann man durch Werfen eines Balles mithilfe der Leertaste testen.
Das Zielen ist mit der Kamera möglich, da der Ball immer genau mittig vom Sichtfeld abgeschossen wird.

Die genaue Steuerung der Kamera wird im folgenden Abschnitt zusammengefasst.

## Steuerung und andere Anpassungen
Interaktion/Animation abspielen: Linksklick  

Kamera drehen: Linkslick halten  
Kamera bewegen: Rechtsklick halten  
Zoom: Mausrad  
Ball schießen: Leertaste  

Steuerung der Beleuchtung: rechte obere Ecke  
Performance: linke obere Ecke

### External Sources
Water Floor texture: https://www.the3rdsequence.com/texturedb/texture/30/rough+sea/  
Ocean Waves sound: https://freesound.org/people/Joozz/sounds/531950/  
Background: https://pixabay.com/de/photos/kondensstreifen-himmel-wolken-blau-982978/