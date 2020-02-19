'use strict';
/** ---------------------------------------------------------------------
  *
  *   class TiroirTools
  *
*** --------------------------------------------------------------------- */
class TiroirTools {
  static toggle(ev){
    ev && stopEvent(ev)
    if ( this.obj.classList.contains('opened') ) {
      // On doit le fermer
      this.obj.classList.remove('opened')
      this.obj.classList.add('closed')
    } else {
      this.built || this.build()
      this.obj.classList.add('opened')
      this.obj.classList.remove('closed')
    }
    return false;
  }


  /**
    Construction de la boite d'outil, avec toutes les définitions qui
    ont été données.
  **/
  static build(){
    const container = DGet('.types-support', this.obj)
    var letters = ['q','s','d','f','g', 'w','x','c','v','b']
    const typesLines = letters.forEach(letter => {
      var menuTypes = String(this.tempMenuTypes).replace(/__ID__/g,`${letter}-click`)
      container.appendChild( DCreate('DIV', {class:'line-type', inner:[
          DCreate('SPAN', {class:'label', inner:`${letter.toUpperCase()} + click `})
        , DCreate('SPAN', {inner:'= '})
        , DCreate('SPAN', {inner:menuTypes})
      ]}))
    })

    // La section contenant les CB pour afficher/masquer chaque type
    Tag.forEachType(dtype => {
      const cbId = `cb-type-showed-${dtype.id}`
      const cb = DCreate('DIV', {class:'span-cb-type-showed', inner:[
          DCreate('INPUT', {type:'CHECKBOX', id:cbId, checked:true})
        , DCreate('LABEL', {for:cbId, inner:dtype.hname})
      ]})
      this.divTypesShowed.appendChild(cb)
    })

    this.setup()
    this.observe()
    this.built = true
  }

  /**
    Régler les valeurs
  **/
  static setup(){
    Tag.forEachType(dtype => {
      DGet(`#typesmenu-${dtype.shortcut}-click`, this.obj).value = dtype.id
    })
  }

  static onCheckTypeShowed(typeId, cbmain, ev){
    let checkState = !!cbmain.checked
    console.log("Coché ?", checkState)
    console.log("Vous avez coché ou décoché le type", typeId)
    if (ev.metaKey || ev.shiftKey) {
      // <= La touche meta est pressée
      const othersState = ev.shiftKey ? checkState : !checkState
      Tag.forEachType(dtype=>{
        const cb = DGet(`input#${`cb-type-showed-${dtype.id}`}`,this.obj)
        cb.checked = othersState
        Tag.toggleType(dtype.id, othersState)
      })
      // On remet le cb initial
      cbmain.checked = checkState
    }
    // Le cb cliqué
    Tag.toggleType(typeId, cbmain.checked)
  }

  static observe(){
    // EN cliquant sur la poignée, on ouvre/ferme le tiroir des outils
    this.handler.addEventListener('click', this.toggle.bind(this))
    // EN cochant/décochant les cb des types de commentaires, on les
    // affiche où on les masque
    Tag.forEachType(dtype=>{
      const cb = DGet(`input#${`cb-type-showed-${dtype.id}`}`,this.obj)
      cb.addEventListener('click', this.onCheckTypeShowed.bind(this, dtype.id, cb))
    })

  }
  /**
    Retourne un menu pour les types de commentaires
    Il faut définir __ID__ pour qu'il soit unique
  **/
  static get tempMenuTypes(){
    if ( undefined === this.tempmenutypes){
      var options = Object.values(DATA_TAG_TYPES).map(dtype => {
        return DCreate('OPTION', {value:dtype.id, inner:dtype.hname})
      })
      options.unshift(DCreate('OPTION', {value:'', inner:'- non défini -'}))
      this.tempmenutypes = DCreate('SELECT', {id:'typesmenu-__ID__', class:'menu-types', inner: options}).outerHTML
    } return this.tempmenutypes ;
  }

  /**
    Les options, par exemple pour connaitre le type de commentaire qu'on
    marque lorsque l'on tient la touche 'A'.
    TODO Plus tard, devra être chargée et enregistrée
  **/
  static get dataOptions(){
    return {
      'a+click': {combo:'a+click', type:'dro'}
    }
  }

  // Section qui contient les cb pour afficher/masquer les commentaires des
  // types voulus
  static get divTypesShowed(){
    return this._idtypesshowed || (this._idtypesshowed = DGet('#types-showed',this.obj))
  }

  // Poignée
  static get handler(){
    return this._handler || (this._handler = DGet('.main-handler', this.obj))
  }
  // Tiroir DOM
  static get obj(){return UI.tiroirTools}
}
