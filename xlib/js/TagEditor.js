'use strict';
/** ---------------------------------------------------------------------
  *
    class TagEditor
    ---------------
    Édition/création des tags de commentaires
  *
*** --------------------------------------------------------------------- */
const DATA_TAG_TYPES = {
  // Note : la class 'pos' sera ajoutée si le tag est positif,
  // 'neg' dans le cas contraire (par défaut)
    'ort': {id:'ort', hname: 'Faute d’orthographe'  , shortcut:'f'}
  , 'cri': {id:'cri', hname: 'Commentaire critique' , shortcut:'d'}
  , 'unc': {id:'unc', hname: 'Passage peu clair'    , shortcut:'q'}
  , 'sty': {id:'sty', hname: 'Problème de style'    , shortcut:'s'}
  , 'com': {id:'com', hname: 'Simple commentaire'   , shortcut:'w'}
  , 'cpo': {id:'cpo', hname: 'Commentaire positif', positive:true, shortcut:'x'}
  , 'dro': {id:'dro', hname: 'Drôle, marrant', positive:true, shortcut:'v'}
}
class TagEditor {

  static edit(tag, options){
    if ( undefined === tag.editor ) tag.editor = new TagEditor(tag)
    tag.editor.show(options)
  }

  /**
    +return+:: [Boolean] true si les données +data+ sont valides,
        false dans le cas contraire.
  **/
  static areDataValides(data){
    try {
      data.content || raise("Il faut impérativement définir le commentaire.")
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }
  /**
    Liste des types possibles
  **/
  static get OptionsTypes(){
    if (undefined === this._optionstypes) {
      this._optionstypes = Object.values(DATA_TAG_TYPES).map(dtype => DCreate('OPTION', {value:dtype.id, inner:dtype.hname}))
    } return this._optionstypes ;
  }

  /**
    Les <options> pour les intensités
  **/
  static get OptionsIntensityPos(){
    if (undefined === this._optionsintensitypos) {
      this._optionsintensitypos = this.buildMenuIntensityWith('❤️')
    } return this._optionsintensitypos
  }
  static get OptionsIntensityNeg(){
    if (undefined === this._optionsintensityneg) {
      const inten = [1,2,3,4,5]
      this._optionsintensityneg = this.buildMenuIntensityWith('🧨')
    } return this._optionsintensityneg
  }
  static buildMenuIntensityWith(char){
    const inten = [1,2,3,4,5]
    return inten.map(i => {
      var tit = 'normale'
      if ( i > 1 ) { tit = ''.padStart((i - 1)*2,char) }
      return DCreate('OPTION',{value:i, inner:tit})}
    )
  }

  /** ---------------------------------------------------------------------
    *   INSTANCE
    *
  *** --------------------------------------------------------------------- */

  constructor(tag, params){
    this.tag  = tag
    this.id   = Number(new Date())

    this.onOK     = this.onOK.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  /**
    Affichage de l'éditeur du tag

    +options+:: [Undefined|Object] Peut définir notamment la position
        de la fenêtre
  **/
  show(options){
    this.obj || this.build()
    this.obj.classList.remove('noDisplay')
    this.setFormValues()
    // On focus toujours dans le champ du texte du commentaire
    this.contentField.focus()
    this.contentField.select()
  }

  hide(){
    this.obj.classList.add('noDisplay')
  }

  /*
      Méthodes d'event
  */

  onOK(ev){
    // Prendre en compte les changements et enregistrer si nécessaire
    let newValues = this.getFormValues()
    if ( this.constructor.areDataValides(newValues)){
      this.tag.set(newValues, /* prop-trait-plat */ false, /* save = */ true /* si changement */)
      // Note : ci-dessus, le deuxième argument est à false pour que la
      // méthode 'set' renseigne la propriété directe (par get prop(v){...})
      // afin d'actualiser aussi dans l'interface.
    }
    this.hide()
    return stopEvent(ev)
  }

  onCancel(ev){
    if ( this.tag.isNew ) {
      this.removeTag()  // Si c'est un nouveau tag, il faut le détruire
    } else {
      this.hide()
    }
    return stopEvent(ev)
  }

  /**
    Appelée par le bouton pour détruire le tag
  **/
  onDestroy(ev){
    ev && stopEvent(ev)
    this.removeTag()
    return false
  }

  /**
    @private
    Procédure de destruction de l'éditeur du tag
    un tag
  **/
  removeTag(){
    this.unobserve()
    this.obj.remove()
    Tag.removeItem(this.tag)
  }

  /*
      Form methods
  */

  static get PROPERTIES(){
    if (undefined === this._properties){
      this._properties = [
          {prop:'type',       type:'string',  fieldProp:'value'}
        , {prop:'content',    type:'string',  fieldProp:'value'}
        , {prop:'intensity',  type:'number',  fieldProp:'value'}
        , {prop:'fixed',      type:'boolean', fieldProp:'checked'}
      ]
    } return this._properties;
  }

  /**
    On met les valeurs au formulaire
  **/
  setFormValues(){
    this.constructor.PROPERTIES.map(dprop => {
      this[`${dprop.prop}Field`][dprop.fieldProp] = this.tag[dprop.prop].value
    })
  }

  /**
    On récupère les valeurs du formulaire
  **/
  getFormValues(){
    var h = {}
    this.constructor.PROPERTIES.map(dprop => {
      let value = this[`${dprop.prop}Field`][dprop.fieldProp]
      switch(dprop.type){
        case 'string':  value = value.trim(); break;
        case 'number':  value = Number(value); break;
        case 'boolean': value = Boolean(value); break;
      }
      Object.assign(h, {[dprop.prop]: value})
    })
    console.log("Nouvelles données : ", h)
    return h
  }

  /*
      DOM/build methods
  */
  /**
    Construction de l'éditeur de tag
  **/
  build() {
    const div = DCreate('DIV', {
        id: this.domId
      , class: 'tag-editor noDisplay'
      , inner: [
            DCreate('DIV', {class:'title', inner: `Commentaire #${this.tag.id.value}`})
          , DCreate('DIV', {class:'content', inner: [
                DCreate('DIV', {class:'row', inner:[
                  DCreate('SELECT', {class:'type', name:'type', inner:this.constructor.OptionsTypes})
                ]})
              , DCreate('TEXTAREA', {class:'comment', name:'comment', inner:"Commentaire par défaut"})
              , DCreate('DIV', {class:'row', inner:[
                    DCreate('LABEL', {inner: "Intensité : "})
                  , DCreate('SELECT', {class:'intensity', inner:this.constructor[`OptionsIntensity${this.isPositive?'Pos':'Neg'}`]})
                ]})
              , DCreate('DIV', {class:'row', class:'right cb-fixed-div', inner:[
                    DCreate('INPUT', {type:'CHECKBOX', id:this.fixedCbId, class:'fixed', name:'fixed'})
                  , DCreate('LABEL', {inner:'corrigé', for:this.fixedCbId})
                ]})
            ]})
          , DCreate('DIV', {class:'buttons', inner: [
                DCreate('BUTTON', {type:'button', class:'btn-cancel', inner:'Renoncer'})
              , DCreate('BUTTON', {type:'button', class:'btn-destroy', inner:'Détruire'})
              , DCreate('BUTTON', {type:'button', class:'btn-ok', inner:'OK'})
            ]})
        ]
    })
    this.tag.obj.appendChild(div)
    // document.body.appendChild(div)
    this.observe()
  }

  updateMenuIntensity(){
    const curValue = this.intensityField.value
    this.intensityField.innerHTML = ''
    log("isPositive = ", this.isPositive)
    log("Ajout de ", this.constructor[`OptionsIntensity${this.isPositive?'Pos':'Neg'}`])
    this.constructor[`OptionsIntensity${this.isPositive?'Pos':'Neg'}`]
    .forEach( option => this.intensityField.appendChild(option) )
    this.intensityField.value = curValue
  }

  get fixedCbId(){
    return this._fixedcbid || (this._fixedcbid = `fixed-cb-${this.id}`)
  }

  /*
      Event methods
  */

  static get observers(){
    return [
        ['.btn-ok', 'click', 'onOK']
      , ['.btn-cancel', 'click', 'onCancel']
      , ['.btn-destroy', 'click', 'onDestroy']
      , ['textarea.comment', 'keypress', 'onKeyPress']
      , ['select.type', 'change', 'onChangeType']
      , ['div.cb-fixed-div', 'click', 'onClickFixedCb']
    ]
  }
  observe(){
    this.toggleObserve(true)
  }

  unobserve(){
    this.toggleObserve(false)
  }

  toggleObserve(observe = true){
    const methListener = observe ? 'addEventListener' : 'removeEventListener'
    // Il faut désactiver tout click sur la fiche elle-même (pour ne pas
    // déclencher des éditions de fiche en dessous)
    this.obj[methListener]('click', ev => stopEvent(ev))

    this.constructor.observers.forEach(observer => {
      const [selector, event, method] = observer
      DGet(selector, this.obj)[methListener](event, this[method].bind(this))
    })
  }

  /**
    Pour compenser le fait qu'on tue tous les évènements click
  **/
  onClickFixedCb(){
    console.log("this.fixedCb.checked = ", this.fixedCb.checked)
    this.fixedCb.checked = !this.fixedCb.checked
  }

  onChangeType(ev){
    this.updateMenuIntensity()
  }

  onKeyPress(ev){
    // console.log("Touche pressée : ", ev.key)
    switch(ev.key){
      case 'Enter':
        if (ev.metaKey) {
          return this.onOK(ev)
        } else { return true }
      case 'Escape':
        return this.onCancel(ev)
      default:
        return true
    }
  }

  /**
    Retourne true si c'est un tag positif, false dans le cas contraire
    Cette valeur est prise dans le menu du type du tag, car il peut être
    différent de celui du tag édité
  **/
  get isPositive(){
    var value ;
    if ( this.obj /* si la boite est construite */ ) {
      value = this.typeField.value
    } else /* boite en construction */ {
      value = this.tag.type.value
    }
    return DATA_TAG_TYPES[value].positive === true
  }

  get fixedCb(){
    return this._fixedcb || (this._fixedcb = DGet(`#${this.fixedCbId}`, this.obj))
  }
  get intensityField(){
    return this._intensityfield || (this._intensityfield = DGet('select.intensity', this.obj))
  }
  get typeField(){
    return this._typefield || (this._typefield = DGet('select.type', this.obj))
  }
  get contentField(){
    return this._contentField || (this._contentField = DGet('textarea.comment',this.obj))
  }
  get fixedField(){
    return this._fixedField || (this._fixedField = DGet('input.fixed',this.obj))
  }

  get obj(){
    return this._obj || (this._obj = DGet(`div#${this.domId}`))
  }
  get domId(){
    return this._domid || (this._domid = `tag-editor-${Number(new Date())}`)
  }
}
