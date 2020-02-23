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
    Tag.forEachType(dtype => {
      const inputId = `shortcut-type-${dtype.id}`
      container.appendChild( DCreate('DIV', {class:'line-type', inner:[
          DCreate('SPAN', {class:'label', inner:`${dtype.hname}`})
        , DCreate('SPAN', {inner:'= click + '})
        , DCreate('INPUT', {type:'TEXT', id:inputId , value:dtype.shortcut,class:'letter'})
      ]}))
    })
    container.appendChild(DCreate('DIV', {class:'row buttons', inner:[
      DCreate('BUTTON',{type:'BUTTON', inner:'Enregistrer', class:'btn-save-shortcuts mini'})
    ]}))

    // La section contenant les CB pour afficher/masquer chaque type
    Tag.forEachType(dtype => {
      const cbId = `cb-type-showed-${dtype.id}`
      const cb = DCreate('DIV', {class:'span-cb-type-showed', inner:[
          DCreate('INPUT', {type:'CHECKBOX', id:cbId, checked:true})
        , DCreate('LABEL', {for:cbId, inner:dtype.hname})
      ]})
      this.divTypesShowed.appendChild(cb)
    })
    this.divTypesShowed.appendChild(DCreate('HR'))
    // On ajoute aussi CB pour les commentaires corrigés et un pour les
    // commentaires non corrigés
    let tabfixed = [['fixed', "corrigés"], ['not-fixed', "non corrigés"]]
    tabfixed.forEach(paire => {
      const [suf, txt] = paire
      let cbId = `cb-type-showed-${suf}`
      let cb = DCreate('DIV', {class: 'span-cb-type-showed', inner:[
          DCreate('INPUT', {type:'CHECKBOX', id:cbId, checked:true})
        , DCreate('LABEL', {for:cbId, inner: `Commentaires ${txt}`})
      ]})
      this.divTypesShowed.appendChild(cb)
    })

    this.observe()
    this.built = true
  }

  /**
    Reçoit la définition des shortcuts et les dispatche dans la
    donnée principale DATA_TAG_TYPES.

    Note : au moment où cette méthode est appelée, les champs ne sont pas
    encore définis dans le tiroir d'outils. Il faut donc se contenter de
    dispatcher les valeurs dans DATA_TAG_TYPES.
  **/
  static dispatchCommentsShortcuts(table) {
    Tag.forEachType(dtype => {
      DATA_TAG_TYPES[dtype.id].shortcut = table[dtype.id]
    })
  }

  /**
    Appelée par le bouton "Enregistrer" de la section des shortcuts
    Pour enregistrer ces shortcuts
  **/
  static onClickSaveShorcuts() {
    let hshortcuts = {}
    // On relève les valeurs
    Tag.forEachType(dtype => {
      const inputId = `shortcut-type-${dtype.id}`
      const value = DGet(`input#${inputId}`,this.obj).value
      Object.assign(hshortcuts, {[dtype.id]: value})
    })
    // On s'assure qu'il n'y ait pas de doublons
    // On enregistre par ajax les shortcuts
    this.saveShortcuts(hshortcuts)
  }

  static saveShortcuts(table){
    Ajax.send({
        data:{script:'save-prefs', args:{shortcuts:table}}
      , success: this.onSavedShortcuts.bind(this)
    })
  }
  static onSavedShortcuts(ret){
    if (ret.error){
      console.error(ret.error)
    } else {
      console.log("- Préférences enregistrées avec succès -")
    }
  }

  /**
    Chargement des préférences au lancement de l'application
  **/
  static loadPrefs(){
    return new Promise((ok,ko) => {
      Ajax.send({
          data:{script:'get-prefs'}
        , success: this.onLoadedePrefs.bind(this, ok, ko)
      })
    })
  }
  static onLoadedePrefs(ok, ko, ret){
    console.log('-> onLoadedePrefs', ok, ko, ret)
    if (ret.error) {
      ko(ret.error)
    } else {
      if ( ret.prefs.shortcuts ) {
        // <= Des raccourcis sont définis
        // => On les mets dans la donnée et dans les champs
        this.dispatchCommentsShortcuts(ret.prefs.shortcuts)
      }
      ok() // C'est tout bon
    }
  }



  static onCheckTypeShowed(typeId, cbmain, ev){
    let checkState = !!cbmain.checked
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

    // En cliquant sur le bouton 'enregistrer' de la section des shortcuts,
    // on les enregistre
    DGet('.btn-save-shortcuts',this.obj).onclick = this.onClickSaveShorcuts.bind(this)
    // EN cochant/décochant les cb des types de commentaires, on les
    // affiche où on les masque
    Tag.forEachType(dtype=>{
      const cb = DGet(`input#${`cb-type-showed-${dtype.id}`}`,this.obj)
      cb.addEventListener('click', this.onCheckTypeShowed.bind(this, dtype.id, cb))
    })
    // EN cochant/décochant les cb des commentaires corrigés ou non corrigés,
    // on doit les afficher/masquer
    let cb = DGet('#cb-type-showed-fixed',this.obj)
    cb.addEventListener('click', this.onCheckTypeShowed.bind(this,'fixed',cb))
    cb = DGet('#cb-type-showed-not-fixed',this.obj)
    cb.addEventListener('click', this.onCheckTypeShowed.bind(this,'not-fixed',cb))
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
