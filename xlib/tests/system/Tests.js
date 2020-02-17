/**
 * La class Tests principale pour jouer les tests
 */
const INDENT = '  ';

const STYLE1 = 'font-weight:bold;font-size:1.2em;'; // Titre principal/fin
const STYLE2 = 'border:1px solid black;padding:2px 4px;' // Tests
const STYLE3 = 'font-size:1.1em;font-weight:bold;' // Case

const Tests = {
    sheets: new Array()
  , nombre_success: 0
  , nombre_failures: 0
  , nombre_pendings: 0

  , stop: false   // mis à true en cas d'erreur fatale, pour interrompre
  , log: function(msg, style){
      console.log('%c'+msg,style);
    }
  , run: function(files){
    // console.clear();
    this.log(RC+RC+RC+'============ DÉBUT DES TESTS ==============', STYLE1)
    this.nombre_success   = 0 ;
    this.nombre_failures  = 0 ;
    this.nombre_pendings  = 0 ;
    this.current_isheet   = 0 ; // pour commencer à 0
    this.sys_errors       = new Array(); // les erreurs systèmes
    this.redefined_images_folder();
    this.next() ;
  }

  /**
  * Pour les tests asynchrone, on appelle cette méthode
  */
  , next: function(){
      var current_sheet = this.sheets[this.current_isheet++] ;
      // console.log('current_sheet:', current_sheet);
      if(!current_sheet){
        this.sumarize() ;
        return ;
      };
      try {
        current_sheet.run();
      } catch (err) {
        console.log('-> catch');
        console.error(err);
        this.next();//et on passe au suivant
      };
    }

  // Affiche le résultat des courses
  , sumarize: function(){
      var color = this.nombre_failures > 0 ? 'red' : (this.nombre_pendings > 0 ? 'orange' : '#00BB00') ;
      var str = `${this.nombre_success} success ${this.nombre_failures} failures ${this.nombre_pendings} pendings`
      $('#tags').html(`<div style="color:${color};font-weight:bold;padding:1em;">${str}</div><div style="padding:1em;font-style:italic;">Open the console to see the details.</div>`);
      console.log(RC+RC+RC+'%c' + str, `color:${color};font-weight:bold;font-size:1.2em;`);
      if(this.sys_errors.length){
        console.log(RC+RC+'Des erreurs systèmes se sont produites aussi :');
        console.log(this.sys_errors);
      };
      this.log(RC+RC+RC+'============ FIN DES TESTS ==============', STYLE1)
    }

  // Ajoute un test à la liste des tests à exécuter
  , add_test: function(itest){
      this.sheets.push(itest);
    }

  , assert:function(trueValue, msg_success, msg_failure){
      trueValue ? this.onSuccess(msg_success) : this.onFailure(msg_failure);
    }
  , onSuccess: function(msg){
      this.nombre_success ++ ;
      console.log(INDENT + '%c… ' + msg, 'color:#00AA00;') ;
    }
  , onFailure: function(msg){
      this.nombre_failures ++ ;
      console.log(INDENT + '%c… ' + msg, 'color:red;') ;
    }
  , given:function(str){
      console.log(RC+'%c'+str+'…', 'color:blue;font-weight:bold;');
    }

  , pending: function(str){
      this.nombre_pendings ++ ;
      console.log(RC+'%c'+(str||'TODO')+'…', 'color:orange;font-weight:bold;');
    }

  , add_sys_error: function(tcase, err) {
      this.sys_errors.push([tcase, err]);
    }

  , redefined_images_folder: function(){
      M.images_folder = 'xlib/tests/tests/images';
    }
 };

// Raccourci
window.assert   = $.proxy(Tests,'assert') ;
window.given    = $.proxy(Tests,'given') ;
window.pending  = $.proxy(Tests,'pending') ;

// Pour construire un message d'erreur de type :
//  La valeur de truc devrait être à machin, elle vaut bidule
//
window.msg_failure = function(sujet, expected, actual){
  if('string' == typeof(expected) && !expected.match(/^[0-9]+$/)){expected = `"${expected}"`}
  if('string' == typeof(actual) && !actual.match(/^[0-9]+$/)){actual = `"${actual}"`}
  var msg = `la valeur de ${sujet} devrait être ${expected}, elle vaut ${actual}`;
  msg = msg.replace(/de le/g, 'du').replace(/de les/g, 'des');
  return msg;
};
// Pour construire un message d'erreur avec la méthode ci-dessus, mais en
// le mettant dans la liste (Array) +in+
window.push_failure = function(arr, sujet, expected, actual){
  arr.push(msg_failure(sujet, expected, actual));
};
