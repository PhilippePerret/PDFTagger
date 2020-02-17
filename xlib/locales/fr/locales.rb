# frozen_string_literal: true
# encoding: UTF-8

create_confirmation = <<-EOT

  La nouvelle analyse a été créée avec succès.

  Vous pouvez ouvrir le fichier `_tags_.js` pour la modifier.

  Pour voir cette analyse et la travailler, copier-colle son fichier
  `analyse.js` à la racine du dossier de MuScaT ou, mieux, utiliser la
  commande `analyse` suivi du nom de cette analyse.

  Sans alias :
    > cd "#{APPFOLDER}"
    > ./utils/analyse.rb %{name}

  Avec un alias :
    > mus analyse %{name}


EOT

LOCALES = {

'command'   => "Commande",
'currente'  => 'Courante :',

'analysis-folder' => "Dossier analyse : %{name}",

'analysis-folder-chosen' => "Vous avez choisi le dossier d'analyse : %{name}",
'folder-captures-set' => "Le dossier des captures a été mis à %{name}.",

# === TITRES ===

'title-help' => "AIDE",
'title-commands-list' => "LISTE DES COMMANDES",

# === CONFIRMATIONS ===

'operation-successful' => "#{RC * 3}#{INDENT}Opération exécutée avec succès.#{RC * 3}",
'create-confirmation' => create_confirmation,
'export-to-pdf' => "Il suffit maintenant d'exporter ce document HTML au format PDF.",
'lang-successfully-defined' => "D'accord, maintenant je parle français dans le texte.",
'editor-successfully-defined' => "Votre éditeur a été défini.",

# === QUESTIONS ===

'which-folder' => "Quel dossier choisir (lettre) ? ('q' pour renoncer, rien pour la courante)",

# === ERREURS ===

'folder-images-required' => 'Il faut définir le chemin au dossier contenant les images !',
'should-be-folder-path'  => '%{path} devrait être un chemin de dossier.',
'no-images-in-folder' => 'Le dossier %{path} ne semble contenir aucune image (extensions prises en compte : %{extensions}).',

'no-folder-found' =>  "Aucun dossier d'analyse n'a été trouvé avec « %{name} »",
'too-much-candidate' => "Trop de noms correspondent au nom partiel '%{name}' fourni (%{list}). Précisez votre demande.",
'folder-built' => 'Le dossier "%{name}" a été construit',
'folder-unfound' => 'Le dossier "%{name}" est introuvable.',
'unknown-folder' => "Dossier inconnu, je ne peux rien faire pour vous…",

'analysis-name-required' => "Il faut définir le nom de l'analyse en premier argument.",
'analysis-folder-built' => "Dossier des analyses construit.",
'analysis-folder-already-exists' => "Ce dossier d'analyse existe déjà.#{RC}\t\tDétruisez-le ou choisissez un autre nom.",

# == UNKNOWN ==
'unknown-command' => "Désolé, je ne connais pas la commande `%{command}'…\nPour obtenir de l'aide, mettre `help` ou `aide` en premier argument.",
'unknown-property' => 'Je ne connais pas la propriété "%{prop}", je ne peux pas la définir.',
'unknown-lang' => "MuScaT ne sait pas (encore) parler la langue désignée par '%{lang}'. Vous voulez vous proposer pour en faire la traduction ?",

'fatal-error' => "\n\n\tERREUR: %{err_msg}\n\n(pour obtenir de l'aide, jouez './utils/%{command}.rb --help' — ou '-h')\n\n",

'help-commands-overview' => "(pour voir l'aide précise d'une commande, \njouer #{'mus[cat] <commande> -h/--help'.jaune})",

# === OPTIONS ===

'options-saved' => "Les options de l'analyse “%{name}” ont été mise à : %{options}",

'option-animation-speed' => 'Vitesse de l’animation',
'option-auto-save' => "Sauvegarde automatique",
'option-crop-image' => "Découpage assisté de la partition",
'option-images-PNG' => "Pour des noms d'images en PNG",
'option-coordonates' => "Affichage des coordonnées lors des déplacements de tags",
'option-lang' => "Langue de l'interface",
'option-lines-of-reference' => "Affichage des lignes de référence",
'option-horizontal-line-offset' => "Position horizontale de la ligne de repère verticale",
'option-vertical-line-offset' => "Position verticale de la ligne de répère horizontale",
'option-space-between-scores' => "Espace entre les systèmes (images séquentielles)",
'option-top-first-score' => "Espace entre le haut de la page et le premier système (images séquentielles)",
'option-left-margin' => "Marge gauche (images séquentielles)",
'option-theme' => "Thème d'interface",
'option-visor' => "Affichage du viseur",
'option-cadence-size' => "Taille de l'affichage des cadences",
'option-chord-size' => "Taille de l'affichage des accords",
'option-harmony-size' => "Taille de l'affichage des marques d'harmonie",
'option-measure-size' => "Taille de l'affichage des numéros de mesure",
'option-modulation-size' => "Taille de l'affichage des marques de modulation",
'option-part-size' => "Taille de l'affichage des marques de parties",
'option-degree-size' => "Taille de l'affichage des degrés de la gamme",
'option-text-size' => "Taille de l'affichage des autres textes",
'option-rectangle-selection' => "Sélection pour rectangle",
'option-shuffle-tests' => "Pour jouer les tests dans un ordre aléatoire",

'option-error-string-bad-length' => "'%{sujet}' devrait avoir une longueur de %{expected} (mesure %{actual} caractères)",
'option-error-bad-integer' => '%{sujet} devrait être un nombre (il vaut %{value})',
'option-error-integer-to-small' => '%{sujet} devrait être supérieur à %{expected} (il vaut %{actual})',
'option-error-integer-to-big' => "%{sujet} devrait être un nombre inférieur ou égal à %{expected} (vaut %{actual})",
'option-error-boolean-required' => "%{sujet} devrait être une valeur booleénne (il vaut %{value})",

'fin-des-locales' => "Juste pour dernier sans virgule"
}
