# PLAN DE BATAILLE DES TESTS


Poursuivre la nouvelle implémentation pour que ça fonctionne bien. Il y a encore des problèmes d'asynchronicité (les tests se terminent alors que le travail est encore en train de se faire).

* S'assurer que tous les éléments définis dans _tags_.js sont bien affichés et correctement sur la table d'analyse.
  * [OK] Les partitions (avec 'score', 'partition', 'sco', 'image')
  * [OK] Les accords (avec 'chord', 'acc', 'accord')
  * [OK] Les chiffrages (avec 'chi', 'har', 'harmonie', 'harmony')
  * [OK] Les modulations (avec 'modulation', 'mod')
  * [OK] Les cadences (avec 'cadence', 'cad')
  * [OK] Les numéros de mesure (avec 'mesure', 'measure', 'mes')
  * [OK] Les degrés (avec 'degree', 'degre', 'deg')
  * [OK] Les Parties (avec 'partie', 'part', 'par')
  * [OK] Les textes quelconques (avec 'text')
  * [OK] Tous les sortes de lignes (avec 'ligne', 'line', 'lin')
  * [OK] Les boites (avec 'boite', 'box')
* S'assurer (comment ?) que les déplacements à la souris sont reportés correctement dans le code.
* Modification du tag sélectionné avec les touches (x, y, w, h). S'assurer qu'elles sont reportées dans le code de l'intance et dans le code général.
* Modification d'un tag dans le code de la ligne
* La touche TAB fait basculer de la sélection du tag sur la table d'analyse à la sélection dans la liste ULTags.
* L'outils "Disposer régulièrement" (les images)

* Création d'un tag avec le bouton "+" sur code
* Les images séquentielles
* L'animation
