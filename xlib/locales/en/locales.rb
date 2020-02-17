# frozen_string_literal: true
# encoding: UTF-8

create_confirmation = <<-EOT

  New analysis created with success.

  You can edit its `_tags_.js` file to modify it.

  To show this analysis and work on it, copy-paste its 'analyse.js'
  file on the root of the MuScaT folder or, better, use the `analysis`
  command providing this analysis name

  Without bash alias :
    > cd "#{APPFOLDER}"
    > ./utils/analyse.rb %{name}

  With an alias :
    > mus analysis %{name}


EOT

LOCALES = {

'command'   => "Command",
'currente'  => 'Current:',

'analysis-folder' => "Analysis folder: %{name}",

'analysis-folder-chosen' => "You choosed the analysis folder: %{name}",
'folder-captures-set' => "Captures folder set to %{name}.",

# === TITRES ===

'title-help' => "HELP",
'title-commands-list' => "COMMAND LIST",

# === CONFIRMATIONS ===

'operation-successful' => "#{RC * 3}#{INDENT}Proceeded with success.#{RC * 3}",
'create-confirmation' => create_confirmation,
'export-to-pdf' => "You can now export the HTML document to PDF.",
'lang-successfully-defined' => "OK, let's speak english from now!",
'editor-successfully-defined' => "Editor defined.",

# === QUESTIONS ===

'which-folder' => "Which folder do you choose (letter above) ? ('q' to quit, nothing for the current analysis)",

# === ERREURS ===

'folder-images-required' => 'Images folder path is required!',
'should-be-folder-path'  => '%{path} should be a folder path.',
'no-images-in-folder' => 'It seems that %{path} folder holds no images (with %{extensions} extensions).',

'no-folder-found' =>  "No analysis folder name starts with « %{name} » (or has that name).",
'too-much-candidate' => "Too much candidate for '%{name}' partial name (%{list}). Redefine your wish.",
'folder-built' => '"%{name}" folder has been built.',
'folder-unfound' => '"%{name}" folder is unfound.',
'unknown-folder' => "Unknown folder, I can't do anything for you…",

'analysis-name-required' => "Analysis name is required as the first argument.",
'analysis-folder-built' => "Analysis folder built.",
'analysis-folder-already-exists' => "This analysis folder already exists.#{RC}\t\tDelete it or choose another name.",

'unknown-command' => "Sorry, I don't know the `%{command}' command…\nTo get help, use `help` as the first argument.",
'unknown-property' => 'I don’t know the "%{prop}" property, I can’t set it.',
'unknown-lang' => "MuScaT doesn't speak the language designed by '%{lang}'. Do you want to make the translation of MuScaT in this language?",

'fatal-error' => "\n\n\tERROR: %{err_msg}\n\n(to get help, run './utils/%{command}.rb --help' — ou '-h')\n\n",

'help-commands-overview' => "(to get the command help,\nrun #{'mus[cat] <commande> -h/--help'.jaune})",

# === OPTIONS ===

'options-saved' => "Analyse “%{name}”'s options have been set to: %{options}",

'option-animation-speed' => 'Animation speed',
'option-auto-save' => "Autosave",
'option-crop-image' => "Crop score with assitant",
'option-images-PNG' => "PNG images format",
'option-coordonates' => "Coordonates displaying when modifying",
'option-lang' => "UI Lang",
'option-lines-of-reference' => "Displaying of reference lines",
'option-horizontal-line-offset' => "Horizontal offset of vertical reference line",
'option-vertical-line-offset' => "Vertical offset of horizontal reference line",
'option-space-between-scores' => "Space between systems (images sequence)",
'option-top-first-score' => "Top margin of first system (images sequence)",
'option-left-margin' => "Left margin of systems (images sequence)",
'option-theme' => "UI Theme",
'option-visor' => "Displaying of visor",
'option-cadence-size' => "Size of cadenzia marks",
'option-chord-size' => "Size of chords marks",
'option-harmony-size' => "Size of Harmony marks",
'option-measure-size' => "Size of measure number marks",
'option-modulation-size' => "Size of modulation marks",
'option-part-size' => "Size of part marks",
'option-degree-size' => "Size of scale degrees marks",
'option-text-size' => "Size of other texts",
'option-rectangle-selection' => "Rectable selection",
'option-shuffle-tests' => "To run test in random order",

'option-error-string-bad-length' => "'%{sujet}' should have a length of %{expected} (it's %{actual} characters long)",
'option-error-bad-integer' => '%{sujet} should be a number (it is %{value})',
'option-error-integer-to-small' => '%{sujet} should be greater than %{expected} (it is %{actual})',
'option-error-integer-to-big' => "%{sujet} should be a number less or equal to %{expected} (it is %{actual})",
'option-error-boolean-required' => "%{sujet} should be a boolean (it is %{value})",

'fin-des-locales' => "Juste pour dernier sans virgule"

}
