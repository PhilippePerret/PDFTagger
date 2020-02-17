/**
 * Extension de l'objet MuScaT pour les tests
 *
 *  Note : la const M permet de ne pas avoir à taper MuScaT à chaque fois
 */

 /**
  * Raccourci pratique. Cf. le mode d'emploi
  */
 function relaunch_and_test(fn){
   return M.relaunch_for_tests().then(fn);
 }


if('undefined'==typeof(MuScaT)) { MuScat = {} }
Object.assign(MuScaT,{
  // Initialisation de tout, même la fenêtre, avant les tests (mais doit
  // être appelée)
  // Si options.init_tags est false, la constante Tags ne sera pas
  // réinitialisée.
  reset_for_tests: function(options){
    if(undefined==options){options={}};
    if(undefined==options.init_tags){options.init_tags = true};
    Options.reset();
    this.reset_all();
    CTags.reset.bind(CTags)();
    ULTags.reset.bind(ULTags)();
    Flash.reset.bind(Flash)();
    if(!!options.init_tags){Tags = "// Juste un commentaire de reset_for_tests"};
    $('.refline').hide(); // les lignes repère
  },

});
