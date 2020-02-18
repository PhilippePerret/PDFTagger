'use strict';
/** ---------------------------------------------------------------------
  *
    class TagEditor
    ---------------
    Édition/création des tags de commentaires
  *
*** --------------------------------------------------------------------- */
const TAG_TYPES = {
    'com': {id:'com', hname: 'Simple commentaire'}
  , 'ort': {id:'ort', hname: 'Faute d’orthographe'}
  , 'cri': {id:'cri', hname: 'Commentaire critique'}
  , 'pos': {id:'pos', hname: 'Commentaire positif'}
  , 'unc': {id:'unc', hname: 'Passage peu clair'}
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
      this._optionstypes = Object.values(TAG_TYPES).map(dtype => DCreate('OPTION', {value:dtype.id, inner:dtype.hname}))
    } return this._optionstypes ;
  }

  /**
    Les <options> pour les intensités
  **/
  static get OptionsIntensity(){
    if (undefined === this._optionsintensity) {
      const inten = [1,2,3,4,5]
      this._optionsintensity = inten.map(i => DCreate('OPTION',{value:i, inner:String(i)}))
    } return this._optionsintensity
  }
  /** ---------------------------------------------------------------------
    *   INSTANCE
    *
  *** --------------------------------------------------------------------- */

  constructor(tag, params){
    this.tag  = tag
    this.id   = Number(new Date())
    this.onOK = this.onOK.bind(this)
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
    if ( options ) {
      if ( options.top ) {
        this.obj.style.top = `${options.top}px`
      }
      if ( options.left) {
        this.obj.style.left = `${options.left}px`
      }
    }
    // Rectifier si l'éditeur se trouve trop bas
    if ( this.obj.offsetTop > UI.maxTop ) {
      this.obj.style.top = 'auto'
      this.obj.style.bottom = `${UI.maxTop}px`
    }
    // Rectifier si l'éditeur se trouve trop haut
    if (this.obj.offsetTop < 10)  {
      this.obj.style.top = '10px'
      this.obj.style.bottom = 'auto'
    }
    // On focus toujours dans le champ
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
    log("Je renonce à l'édition")
    this.hide()
    return stopEvent(ev)
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
            DCreate('DIV', {class:'title', inner: `Édition tag #${this.tag.id}`})
          , DCreate('DIV', {class:'content', inner: [
                DCreate('SELECT', {class:'type', name:'type', inner:this.constructor.OptionsTypes})
              , DCreate('TEXTAREA', {class:'comment', name:'comment', inner:"Commentaire par défaut"})
              , DCreate('DIV', {class:'explication', inner: `<code>${isMac?'⌘↩︎':'⌃↩︎'}</code> = “OK”`})
              , DCreate('DIV', {class:'row', inner:[
                    DCreate('LABEL', {inner: "Intensité du problème : "})
                  , DCreate('SELECT', {class:'intensity', inner:this.constructor.OptionsIntensity, label:'Intensité'})
                ]})
              , DCreate('DIV', {class:'row', inner:[
                    DCreate('INPUT', {type:'CHECKBOX', id:this.fixedCbId, class:'fixed', name:'fixed'})
                  , DCreate('LABEL', {inner:'corrigé', for:this.fixedCbId})
                ]})
            ]})
          , DCreate('DIV', {class:'buttons', inner: [
              DCreate('BUTTON', {type:'button', class:'btn-ok', inner:'OK'})
            ]})
        ]
    })
    document.body.appendChild(div)
    this.observe()
  }
  observe(){
    DGet('.btn-ok', this.obj).addEventListener('click', this.onOK)
    this.contentField.addEventListener('keypress', this.onKeyPress.bind(this))
  }

  get fixedCbId(){
    return this._fixedcbid || (this._fixedcbid = `fixed-cb-${this.id}`)
  }

  /*
      Event methods
  */

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
