/*
  Script principal
*/
// Debug.level = 7;

$(document).ready(function(){

  if('undefined'==typeof(TESTING)){TESTING = false};

  TiroirTools.loadPrefs()
  .then(UI.setInterface.bind(UI))
  .catch(error)


  Tag.load()

});
