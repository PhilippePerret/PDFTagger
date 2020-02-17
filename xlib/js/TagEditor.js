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
    Liste des types possibles
  **/
  static get OptionsTypes(){
    if (undefined === this._optionstypes) {
      this._optionstypes = Object.values(TAG_TYPES).map(dtype => DCreate('OPTION', {value:dtype.id, inner:dtype.hname}))
    } return this._optionstypes ;
  }
  /** ---------------------------------------------------------------------
    *   INSTANCE
    *
  *** --------------------------------------------------------------------- */

  constructor(tag, params){
    this.tag = tag

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
    if ( options ) {
      if ( options.top ) {
        this.obj.style.top = `${options.top}px`
      }
      if ( options.left) {
        this.obj.style.left = `${options.left}px`
      }
    }
  }
  hide(){
    this.obj.classList.add('noDisplay')
  }

  /*
      Méthodes d'event
  */

  onOK(ev){
    log("Je dois enregistrer les données")
    this.hide()
    return stopEvent(ev)
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
              , DCreate('TEXTAREA', {class:'comment', name:'comment'})
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
  }
  get obj(){
    return this._obj || (this._obj = DGet(`div#${this.domId}`))
  }
  get domId(){
    return this._domid || (this._domid = `tag-editor-${Number(new Date())}`)
  }
}
