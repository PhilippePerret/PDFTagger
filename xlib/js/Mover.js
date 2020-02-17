/**
 * Mover Object
 * ------------
 * Pour gérer tous les déplacements.
 */
const Mover = {
  class: 'Mover'

  , subject: null       // le sujet (qui peut être un tag, par exemple)
  , startEvent: null    // évènement de démarrage
  , startPosition: null // Position de départ de l'évènement
  , stopEvent:  null    // évènemnet de fin
  , timerSelection: null
    /**
     * Initialisation du mover, sur la table d'analyse
     */

    /**
     * Méthode qui doit être appelé par le sujet (mis en argument) lorsqu'il
     * doit bénéficier du traitement de déplacement.
     * La méthode est par exemple appelée lorsque l'on clique sur un tag
     */
  , start: function(s, ev){
      this.subject    = s ;
      this.startEvent = ev ;
      this.startObjectPosition = {x: s.getX(), y: s.getY()};
      this.startPosition = {x: ev.pageX, y: ev.pageY};
      // console.log('start-position:',this.startPosition);
      // console.log('start-objet-position:',this.startObjectPosition);
    }
    /**
     * Fin de traitement du sujet +s+ (un tag, par exemple)
     *
     * Note : la méthode peut être appelée par le propre onMouseUp du Mover
     * lorsque par exemple la souris s'est déplacée en dehors du sujet.
     */
  , stop: function(s, ev){
      // console.log('-> Mover.stop', ev);
      this.stopEvent = ev ;
      this.subject.onStopMoving(ev);
      this.subject = null ;
    }
  , init: function(){
      Mover.onMouseDown = Mover.onMouseDown.bind(Mover);
      Mover.onMouseUp   = Mover.onMouseUp.bind(Mover);
      Mover.onMouseMove = Mover.onMouseMove.bind(Mover);
      Mover.start       = Mover.start.bind(Mover);
      Mover.stop        = Mover.stop.bind(Mover);
      Mover.startSelection  = Mover.startSelection.bind(Mover);
      Mover.stopSelection   = Mover.stopSelection.bind(Mover);
      $('#tags')
        .on('mousedown',  $.proxy(Mover,'onMouseDown'))
        .on('mouseup',    $.proxy(Mover,'onMouseUp'))
        .on('mousemove',  $.proxy(Mover,'onMouseMove'));
      // console.log('Mover initialisé.');
    }

    /**
     * Méthode qui est seulement atteinte lorsque l'on clique sur la table
     * d'analyse elle-même, en dehors de tout "sujet" (de tout tag — bien
     * penser cependant à "tuer" les évènements dans les mousedown).
     *
     * Cette méthode démarre le processus de sélection par rectangle.
     */
  , onMouseDown: function(ev){
      // console.log('click sur la table d’analyse en dehors de tout tag');
      if(Options.get('rectangle-selection')){
        // La sélection ne se déclenche pas tout de suite
        this.timerSelection = setTimeout($.proxy(Mover,'startSelection',ev), 1000);
      };
    }
  , onMouseUp: function(ev){
      // console.log('-> Mover.onMouseUp');
      if (this.subject){
        // console.log('fin du déplacement, du sujet #', this.subject.id);
        this.stop(this.subject, ev);
      } else {
        // <= Une fin de click (donc un click) sans sujet
        // => C'est un "clic-out" sur la table d'analyse, c'est aussi une
        // fin de sélection. Ça peut consister juste à tuer le timer
        Page.onClickOut(ev);
        // Attention, il faut bien stopper la sélection rectangle après, sinon
        // tous les tags sélectionnés seraient déselectionnés par onClickOut
        this.stopSelection(ev);
      }
    }
  , onMouseMove: function(ev){
      if(this.subject){
        // console.log('Je dois déplacer le sujet #', this.subject.id);
        // DIFFÉRENCE AVEC LA POSITION DE DÉPART
        var dif_x = ev.pageX - this.startPosition.x ;
        var dif_y = ev.pageY - this.startPosition.y ;
        // On l'ajoute à la position réelle de départ
        var new_x = this.startObjectPosition.x + dif_x ;
        var new_y = this.startObjectPosition.y + dif_y ;
        // var new_x = ev.pageX - Page.RECTIF_X ; //- this.startPosition.x;
        // var new_y = ev.pageY - Page.RECTIF_Y ; //- this.startPosition.y;
        this.subject.jqObj.css({left:`${new_x}px`, top:`${new_y}px`});
      } else {
        // console.log('déplacement sans sujet…');
        if(this.downed){
          // <= Quand le rectangle de sélection est actif
          var w = ev.pageX - this.selectionPosDim.x - Page.RECTIF_X;
          var h = ev.pageY - this.selectionPosDim.y - Page.RECTIF_Y;
          this.selectionPosDim.w = w ;
          this.selectionPosDim.h = h ;
          this.jqObjSelection.css({width:`${w}px`, height:`${h}px`});
          return stop(ev);
        }
      }
    }

    /**
     * Noter que si le UP survient avant la fin du timer, ce timer
     * est détruit et celle méthode n'est pas appelée.
     */
  , startSelection: function(ev){
      // Si le timer existe encore, c'est qu'il n'a pas été tué par un
      // un mouseUP. On peut donc procéder à l'opération
      if(!this.jqObjSelection){
        Page.table_analyse.append('<div id="rectangle-selection" class="rectangle-selection"></div>');
        this.jqObjSelection = $('div#rectangle-selection');
        // Le rectangle de sélection doit lui aussi répondre aux mousemove et up
        this.jqObjSelection
          .on('mousemove', $.proxy(Mover,'onMouseMove'))
          .on('mouseup', $.proxy(Mover,'onMouseUp'));
      }
      var x = ev.pageX - Page.RECTIF_X;
      var y = ev.pageY - Page.RECTIF_Y
      this.selectionPosDim = {x: x, y: y, w: 0, h: 0};
      this.jqObjSelection.css({left: `${x}px`, top: `${y}px`, width:'0px', height:'0px'});
      this.jqObjSelection.show();
      this.downed = true ;
    }
  , stopSelection: function(ev){
      if(this.timerSelection != null){
        // Le timer de rectangle de sélection est encore "en route", donc
        // on est toujours dans la seconde de pressage avant de basculer
        // vraiment dans le mode rectangle de sélection.
        this.killTimerSelection();
      };
      if (!this.downed || this.subject){return stop(ev)}
      // Vraie fin de sélection
      this.jqObjSelection.hide();
      this.downed = false;
      // Il faut sélectionner tous les tags sous la surface
      var surf = new Surf(this.selectionPosDim);
      // console.log('surf:',surf.inspect());
      var arr = new Array();
      CTags.forEachTag(function(tag){
        if(!tag.isRealTag){return};
        // console.log('tag.surf de #', tag.id, tag.surf);
        if(tag.surf.isIn(surf)){
          tag.onClick({shiftKey: true});
          arr.push(tag);
        } else {
          // console.log(`Le tag ${tag.ref} est en dehors :`);
          // console.log('sa surface :', tag.surf.inspect());
        }
      });
      // console.log('tags:', arr);
    }
  , killTimerSelection: function(){
      clearTimeout(this.timerSelection);
      this.timerSelection = null ;
    }
}
