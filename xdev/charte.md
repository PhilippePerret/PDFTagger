# Charte de Music-Score-Tagger

Le « tagger de partition » permet de « marquer » sur une partition les éléments d'analyse tels que les modulations, les cadences, les degrés etc.

## Cahier des charges

* Elle doit être simple d'utilisation
* Elle doit fonctionner sur tout ordinateur de la même manière

## La base

On fonctionne avec un dossier où on va mettre :

* le fichier HTML de base, qui gère l'ensemble des éléments (il faut juste copier-coller ce fichier dans son dossier, sans y toucher),
* les images de la partition (le mieux est de la découper en système)
* un fichier .js contenant la définition des images et des TAGS
* un fichier .css définissant le thème (l'apparence) à donner au rendu. Ce fichier n'est pas à toucher par l'utilisateur, et doit être pris dans le dossier « aspect ».

## Nomenclature

TAG   On appelle *TAG* un élément textuelle ou visuel posé sur la partition. Ça peut être le nom d'un accord, une marque de modulation, une marque de cadence, etc. C'est aussi les images des systèmes.

Deux listes-objets fonctionnent en parallèle : `CTags` qui consigne les instances `Tag` et gère l'affichage des tags sur la table d'analyse et `ULTags` qui consigne les instances `LITag` et gère l'affichage des lignes de code.
