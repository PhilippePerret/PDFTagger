/**
* Locales française pour les messages
**/
if('undefined'==typeof(MSG)){MSG = {}};
Object.assign(MSG,{
  'pour':'virgule'

  // === DEMANDES ===

  , 'please-fix-the-code': 'Merci de corriger le code de votre analyse.'
  , 'choose-litag': "Vous devez choisir le tag à %{operation} dans la liste."
  , 'should-destroy': 'Dois-je vraiment détruire %{what}'
  , 'thinks-to-align-required': 'Il faut choisir les éléments à aligner !'

  // === INFORMATION ===
  , 'code-lines-added': "Des lignes de code ont été ajoutées (%{motif}), le nouveau code a été copié dans le presse-papier pour pouvoir être collé dans votre fichier _tags_.js."
  , 'new-position-tag': "Nouvelle position du tag %{ref} : %{position}."
  , 'new-tag-created': "Nouveau tag créé sur la partition (%{ref}). N’oubliez pas de copier-coller sa ligne ou tout le code dans votre fichier _tags_.js."
  , 'update-required': "Actualisation demandée…"

  // TAGS
  , 'full-code-in-clipboard' : "Le code complet de votre partition tagguée est copié dans le presse-papier.\n\nIl vous suffit de le coller dans votre fichier _tags_.js en remplaçant tout le code (p.e. sélectionnez tout l'ancien code avant de coller le nouveau)."
  , 'code-lines-in-clipboard': "Le code des lignes des tags sélectionnés a été mis dans le presse-papier pour un collé."

  // IMAGES
  , 'image-sequentielle': 'expression régulière dans l’image de la partition'

  , 'crop-image-ready': "La découpe de l'image est prête."

  , 'code-to-run': "Code à jouer en console : %{code} (copié dans le presse-papier)"

  // OPTIONS
  , 'memo-guides-offsets': "Dois-je mémoriser la position courante des repères ?"

  // ANIMATION
  , 'press-space-animation': "Presser la barre espace pour poursuivre l'animation"
  , 'anim-ending': 'Automation terminée. Merci de votre attention.'
  , 'fin-anim': 'Fin de l’animation'

  // ---------------------------------------------------------------------
  //  === ERRORS ===

  // GÉNÉRAL
  , 'pixels-required': 'Un nombre de pixels est requis (%{value} fourni).'

  // TAGS

  , 'tags-undefined': 'Il faut définir les images et les « TAGs » à poser (dans le fichier `tag.js`)'
  , 'prop-non-treated': "La propriété 'type' de la nature '%{nature}' n'est pas traitée…"
  , 'no-w-pour-modulation': 'La largeur d’une modulation ne se modifie pas. Utiliser `h` pour modifier la hauteur de sa ligne verticale.'
  , 'no-h-pour-cadence':    "La hauteur d'une cadence ne se modifie pas. Utiliser `w` pour modifier la longueur de son trait."
  , 'unknown-nature': 'La nature de tag "%{nature}" est inconnue. Merci de corriger le code.'
  , 'unable-to-define-domid': 'Impossible de définir domId, l’identifiant du tag est null…'

  , 'loading-module-failed': "Navré, mais le chargement du module « %{name} » a échoué…"

  // OPTIONS
  , 'unknown-option': "L'option '%{option}' est inconnue de nos services."
  , 'value-option-required': "Dans _tags_.js, il faut définir la valeur de l'option non booléenne '%{option}'."
  , 'images-errors-occured': `Des erreurs sont survenues avec les images suivantes (introuvables) :%{rc}  - %{errors}`

});
