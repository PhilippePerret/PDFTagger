Object.assign(CTags,{
    class: 'CTags'
    /**
     * Réinitialisation complète de la donnée (pour les tests)
     */
  , reset: function(){
      var my = this
        , i = 0
        ;
      while('undefined' != typeof(CTags[++i])){
        delete my[i];
      }
      my.length = 0;
    }
});
