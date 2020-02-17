/**
* Locales anglaises pour les messages
**/
if('undefined'==typeof(MSG)){MSG = {}};
Object.assign(MSG,{
  'pour':'virgule'

  // === DEMANDES ===

  , 'please-fix-the-code': 'Please correct your analysis code.'
  , 'choose-litag': "Please choose the tag to %{operation} in the list."
  , 'should-destroy': 'Should I really destroy %{what}'
  , 'thinks-to-align-required': 'Choose the tags to align!'

    // === INFORMATION ===
  , 'code-lines-added': "Code lines has been added (%{motif}). New code copied in the clipboard to be pasted in your `_tags_.js` file. Do it right now! ;-)"
  , 'new-position-tag': "New position for tag %{ref}: %{position}."
  , 'new-tag-created': "New tag created on analysis table (%{ref}). Don't forget to copy-paste its code line or the whole analysis code in your '_tags_.js' file."
  , 'update-required': "Update…"

  // TAGS
  , 'full-code-in-clipboard' : "The full code of your tagged analysis is copied in the clipboard.\n\nYou can paste it in your `_tags_.js` file (select the whole code and replace it)."
  , 'code-lines-in-clipboard': "Line code of selected tags put in clipboard. You can paste it in your _tags_.js file."


  // IMAGES
  , 'image-sequentielle': 'regular expression in score line'

  , 'crop-image-ready': "You can crop your image."

  , 'code-to-run': "Code to play in Terminal: %{code} (copied in the clipboard)"

  // OPTIONS
  , 'memo-guides-offsets': "Must I remember current position of the guide lines?"

  // ANIMATION
  , 'press-space-animation': "Press SPACE bar to continue animation."
  , 'anim-ending': 'Automation ended. Thanks for attention.'
  , 'fin-anim': 'The End'

  // ---------------------------------------------------------------------
  //  === ERRORS ===

  // GÉNÉRAL
  , 'pixels-required': 'A number of pixels is required (%{value} provided).'

  // TAGS

  , 'tags-undefined': 'You have to define TAGs and scores lines (in `tag.js` file)!'
  , 'prop-non-treated': "Property 'type' of '%{nature}' nature is not treated."
  , 'no-w-pour-modulation': 'Width of a modulation can’t change. Use `h` to modify the height of its vertical line.'
  , 'no-h-pour-cadence':    "Height of cadence can’t change. Use `w` to modify the width of its horizontal line."
  , 'unknown-nature': 'Tag nature "%{nature}" is unknown. Thanks to fix the code.'
  , 'unable-to-define-domid': 'Unable to define `domId` property, the tag ID is null…'

  , 'loading-module-failed': "Sorry, the loading of module « %{name} » failed…"

  , 'unknown-option': "'%{option}' option is unknown."
  , 'value-option-required': "You must define, in your _tags_.js file, the value of '%{option}' option (non boolean)."
  , 'images-errors-occured': `Errors occured with following images (unfound):%{rc}  - %{errors}`

});
