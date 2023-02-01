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
zurückgesetzt, sobald der Arm nach oben gefahren wird, um zu vermeiden dass die Rotoren unschön durch die Plattform
des Gezeitenkraftwerks "clippen".
Die Rotoren des GLTF-Modells machen bei Klick eine Umdrehung und nach Ende der Animation wird mithilfe von 
Funktionslogik ein Sound abgespielt, welcher des Herunterfahren der Rotoren bzw. des Generators darstellen soll.
Dieser Sound wird ebenfalls abgespielt, wenn der Arm des GLTF-Modells nach unten gefahren ist.

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