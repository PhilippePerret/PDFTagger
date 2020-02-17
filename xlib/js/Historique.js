/**
 *  Objet Historique et class Histo
 *  --------------------------------
 *  Gestion de l'historique des opérations
 */

const Historique = {
    items: new Array()
  , max_items: 100 // nombre maximum d'opérations (pourra être changé par options)

  /**
   * Méthode pour ajouter un élément
   */
  , add: function(props_list){
      this.items.push(new Histo(props_list));
      if(this.items.length > 100) { this.items.shift() };
      // console.log(this.items);
    }

  /**
   * Revenir en arrière
   */
  ,backward: function(){

    }

  /**
   * Afficher l'historique
   */
  , display: function(){

    }

  /**
  * Supprimer la dernière opération d'historique
  **/
  , undo_last: function(){
      if(this.items.length){
        this.undo(this.items.length - 1);
      };
    }
  /**
   * Supprimer une opération de l'historique
   * Supprime la ligne d'historique d'index +idx+, c'est-à-dire
   * défait l'opération, remet l'état précédent.
   */
  , undo: function(idx){
      var ope = this.items.splice(idx,1)[0];
      ope.onEachProp(function(iprop){iprop.revert()});
    }
};

const Histo = function(props_list){
  var firstprop     = props_list[0] ;
  this.subject      = firstprop.subject ;
  this.props_list   = props_list ; // liste des propriétés modifiées (HistoProp)
};
Histo.prototype.onEachProp = function(method){
  for(var instprop of this.props_list){
    method(instprop);
  };
};

const HistoProp = function(subject, prop, prev_state, next_state) {
  this.subject    = subject ;
  this.prop       = prop ; // nom de la propriété, p.e. 'x', ou 'locked'
  this.prev_state = prev_state ; // la valeur avant l'opération, p.e. 120 ou false
  this.next_state = next_state ; // La valeur après l'opération, p.e. 130 ou true
};
// Méthode qui permet de revenir à l'état précédent de la
// propriété du sujet
HistoProp.prototype.revert = function(){
  this.subject.update(this.prop, this.prev_state, {no_histo: true});
};

const H = Historique ;
