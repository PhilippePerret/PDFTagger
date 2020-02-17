/**
  * Debug
  * Une classe pour gérer le débuggage en direct
  *
  * Usage
  * -----
  *   D.debug(<message>, <level>);
  *   alias: D.d
  *   D.debug_var(<variable name>, <variable value>, <level>)
  *   alias: D.dv
  *   D.debug_function(<function name>, <level>)
  *   alias: D.dfn
  *
  */
const Debug = {
    class: 'Debug'
    // Les niveaux
  , DBG_STANDARD_LEVEL:     4
  , DBG_STANDARD_FN_LEVEL:  3

    // Niveau courant de débuggage. Un message qui a un niveau équivalent
    // ou inférieur sera affiché. C'est donc comme un "max-level"
  , level: 0


  , debug: function(msg, niveau){
      if(undefined==niveau){niveau=Debug.DBG_STANDARD_LEVEL}
      if(niveau > this.level){return};
      console.log(msg);
    }

  , debug_var: function(v_name, v_value, niveau){
      if(undefined==niveau){niveau=Debug.DBG_STANDARD_LEVEL}
      if(niveau > this.level){return};
      console.log('%c'+`${v_name} = ${v_value}`, 'color:blue;');
    }
  , debug_function: function(fn_name, niveau){
      if(undefined==niveau){niveau=Debug.DBG_STANDARD_FN_LEVEL}
      if(niveau > this.level){return};
      console.log('%c'+`-> ${fn_name}`, 'color:green;');
    }

  , init: function(){
      D.debug     = D.debug.bind(D);
      D.debug_var = D.debug_var.bind(D);
      D.d   = D.debug.bind(D);
      D.dv  = D.debug_var.bind(D);
      D.dfn = D.debug_function.bind(D);
    }
};
const D = Debug
D.init();
