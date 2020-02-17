Object.assign(ULTags,{
    pour: 'virgule'
    /**
     * Réinitialisation complète de la donnée (pour les tests)
     */
  , reset: function(){
      var my = this
        , i = 1
        ;
      for(i;i<=this.length;++i){
        delete my[i];
      }
      my.length = 0;
    }
});
