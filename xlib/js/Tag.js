'use strict';
/** ---------------------------------------------------------------------
  *
  *   Class Tag
  *   ----------
  *   Gestion des Tags (= des commentaires de document)
  *
*** --------------------------------------------------------------------- */
class Tag {

  static get(tagId){
    return this.table.get(tagId)
  }

  static get SAVED_PROPERTIES(){
    if (undefined === this._savedproperties){
      this._savedproperties = [
          {id:'id'        , type:'number',  required:true}
        , {id:'type'      , type:'string',  required:true}
        , {id:'content'   , type:'string',  required:true}
        , {id:'intensity' , type:'number',  required:true}
        , {id:'top'       , type:'number',  required:true}
        , {id:'height'    , type:'number',  required:true}
        , {id:'fixed'     , type:'boolean', required:true}
        , {id:'date'      , type:'number',  required:true}
      ]
    } return this._savedproperties ;
  }

  /**
    Pour faire tourner la fonction +method+ sur tous les tags
    +method+ ::
        Si [Function] On passe en premier argument le tag [Tag]
        Si [String] C'est une méthode d'instance qu'on invoque.
  **/
  static forEachTag(method)
  {
    if ( method instanceof Function ) {
      this.items.forEach(tag => method(tag))
    } else if ('string' == typeof method ) /* => méthode de tag */ {
      this.items.forEach(tag => tag[method].call(tag))
    } else {
      console.error("La méthode devrait être un string (méthode de tag) ou une fonction", method)
    }
  }

  /**
    Faire tourner la méthode +method+ [Function] avec toutes les données
    des types en arguments respectifs.
  **/
  static forEachType(method)
  {
    Object.values(DATA_TAG_TYPES).forEach(dtype => method.call(null, dtype))
  }

  /**
    Pour afficher/masquer les tags du type +tagType+ [String]
    +tagType+:: [String] L'identifiant du type (clé dans DATA_TAG_TYPES)
  **/
  static toggleType(tagType, showIt){
    this.forEachTag(tag => {
      let ok ;
      if ( tagType.match('fixed') ) {
        ok = tag.fixed.value == (tagType == 'fixed')
      } else {
        ok = tag.type.value == tagType
      }
      ok && tag[showIt?'show':'hide'].call(tag)
    })
  }

  /**
    Chargement de tous les tags
  **/
  static load(tags){
    // log("Chargement des tags", tags)
    tags.forEach(dtag => new Tag(dtag))
  }

  /**
    Construction de tous les tags
  **/
  static build(){
    // log("Construction des tags ", this.items)
    this.items.forEach(tag => tag.build())
  }

  /**
    Sauvegarde tous les tags
  **/
  static save(){
    console.log('-> Tag::save')
    Ajax.send({
      data:{
            script: 'save-tags'
          , args:{tags: JSON.stringify(this.toJson())}
        }
      , success: this.onSaved.bind(this)
    })
  }
  static toJson(){
    return this.items.map(tag => {
      tag.isNew = false
      return tag.toJson
    })
  }
  // Au retour de l'enregistrement
  static onSaved(ret){
    if ( ret.error ) {
      console.error("Une erreur est survenue : ", ret.error.message)
      console.error(ret.error.backtrace.join("\n"))
    } else {
      log("Enregistrement effectué avec succès", ret)
    }
  }

  static get items(){
    return this._items || (this._items = [])
  }
  static get table(){
    return this._table || ( this._table = new Map() )
  }
  static set table(v){this._table = v}

  /**
    Ajoute un nouveau tag
  **/
  static addNewItem(data) {
    console.log('-> Tag::addNewItem')
    showBacktrace()
    Object.assign(data, {
        id: this.nextId()
      , date: Number(new Date())
    })
    data.type || (data.type = 'com')
    data.content || (data.content = "Nouveau commentaire")
    delete data.left // pas besoin
    const tag = new Tag(data)
    tag.isNew = true
    tag.build({})
    // On met le tag en édition pour pouvoir le sauver ensuite
    tag.edit({top:data.top, left:data.left})
    return tag
  }

  static reset(){
    delete this.tag2index
  }

  /**
    Fonction complète de destruction du tag
    C'est celle-ci qui doit être utilisée en priorité
  **/
  static removeItem(tag){
    console.log('-> Tag::remove')
    tag.remove()
    const indexItem = this.indexOf(tag)
    this.items.splice(indexItem,1)
    this.table.delete(tag.id)
    this.reset()
    this.save()
  }

  /**
    +return+:: [Integer] Index du tag +tag+ dans les items
  **/
  static indexOf(tag){
    if ( undefined === this.tag2index) {
      this.tag2index = {}
      var index ;
      this.items.forEach(tag => {
        Object.assign(this.tag2index, {[tag.id]: index++})
      })
    }
    return this.tag2index[tag.id]
  }

  /**
    Pour ajouter une tag à la liste
    Attention, cette méthode est employée à l'instanciation du tag.
    Elle n'est pas à confondre avec la méthode addNewItem qui crée un
    nouvel item (et donc enregistre la nouvelle liste)
  **/
  static addItem(tag){
    tag.id.value = this.nextId()
    // log("this.items = ", this.items)
    this.items.push(tag)
    this.table.set(tag.id.value, tag)
  }

  static nextId(){
    this.lastId = this.lastId || 0
    return ++ this.lastId
  }

  /** ---------------------------------------------------------------------
    *
    *   INSTANCE
    *
  *** --------------------------------------------------------------------- */
  constructor(data){
    // log(data)
    for(var k in data) this[k].value = data[k] ;
    this.set(data, /* prop trait plat */ true, /* save = */ false)
    this.constructor.addItem(this)

    this.onMouseDown  = this.onMouseDown.bind(this)
    this.onMouseUp    = this.onMouseUp.bind(this)

  }

  edit(options){
    log('-> Tag#edit')
    TagEditor.edit(this, options)
    log('<- Tag#edit')
  }

  show(){ this.obj.classList.remove('noDisplay')}
  hide(){ this.obj.classList.add('noDisplay')}

  /**
    @private
    Méthode de destruction du tag
    (utiliser la méthode de classe)
  **/
  remove(){
    console.log('-> Tag#remove')
    this.unobserve()
    this.obj.remove()
  }

  /**
    Pour définir ou redéfinir les données
  **/
  set(data, propTraitPlat = false, saveIfChanged = false){
    console.log('-> Tag#set')
    let tagHasChanged = false ;
    for(var k in data){
      let tprop = this[k]
      var oldValue = tprop._value
      var newValue = data[k]
      let propHasChanged = oldValue != newValue
      tprop[propTraitPlat?'_value':'value'] = data[k]
      if ( propHasChanged ) tagHasChanged = true ;
    }
    tagHasChanged && this.domUpdate()
    if ( tagHasChanged && saveIfChanged ){
      log("des valeurs ont changées, je dois enregistrer la nouvelle donnée.")
      this.constructor.save()
    }
  }

  domUpdate(){
    this.peuple()
    this.setClass()
    this.updateHeight()
  }

  /**
    Retourne le code pour enregistrement
  **/
  get toJson(){
    var h = {}
    this.constructor.SAVED_PROPERTIES.forEach( dprop => {
      let value = this[dprop.id] ;
      if ( value instanceof TagProperty ) {
        value = value.value
      } else {
        console.log("La propriété '%s' n'est pas une TagProperty", dprop.id)
      }
      Object.assign(h, {[dprop.id]: value})
    })
    return h
  }

  /*
      Events method
  */

  /**

  **/
  onMouseDown(ev){
    log('-> onMouseDown on Tag#%i', this.id.value)
    this.mousedownTime = Number(ev.timeStamp)
    this.setMovable()
    stopEvent(ev)
  }
  onMouseUp(ev){
    log('-> onMouseUp on Tag#%i', this.id.value)
    let mTimeDown ;
    if ( ! this.mousedownTime ) {
      // Cela arrive par exemple quand on clique sur une poignée du tag
      // Il faut alors ne rien faire ici et ne surtout pas interrompre
      // l'évènement
      log("this.mousedownTime n'est pas défini, je retourne true")
      return true
    } else {
      log(`this.mousedownTime est défini et vaut ${this.mousedownTime}`)
      mTimeDown = Number(this.mousedownTime)
      delete this.mousedownTime
    }
    // console.log({
    //     'temps mousedown': mTimeDown
    //   , 'temps mouseup':ev.timeStamp
    //   , 'is click': (ev.timeStamp < mTimeDown + 1)
    // })
    if ( ev.timeStamp < mTimeDown + 500) {
      // C'est un vrai click, pas un déplacement
      this.unsetMovable()
      this.edit()
    } else {
      this.unsetMovable()
      return stopEvent(ev)
    }
  }

  onEndMoving(ev, ui){
    log('-> onEndMoving')
    stopEvent(ev)
    this.top.value = ui.position.top + 10
    this.constructor.save()
    // console.log("ui = ", ui)
    ui.helper[0].classList.remove('moving')
    log('<- onEndMoving')
    return false
  }

  // Pour rendre le tag déplaçable
  setMovable(){
    // this.obj.addEventListener('mouseup', this.onMouseUp)
    this.obj.onmouseup = this.onMouseUp
    $(this.obj).draggable('enable')
  }
  // Pour fixer le tag (non déplaçable)
  unsetMovable(){
    // this.obj.removeEventListener('mouseup', this.onMouseUp)
    this.obj.onmouseup = null
    $(this.obj).draggable('disable')
  }

  /*
      DOM methods
  */

  build(){
    const div = DCreate('DIV', {
        id: `tag-${this.id.value}`
      , class: this.cssClass
      , style:`top:${this.top.value - 10}px;height:${this.height.value||20}px;`
      , inner: [
            DCreate('SPAN', {class:'mark-stylo'})
          , DCreate('SPAN', {class:'intensity'})
          , DCreate('SPAN', {class:`fixed`})
          , DCreate('SPAN', {class:'content'})
          , DCreate('SPAN', {class:'height-handler'})
        ]})
    this._obj = div
    UI.bandeSensible.append(div)
    this.domUpdate()
    this.observe()
  }

  peuple(){
    this.content.domUpdate()
    this.fixed.domUpdate()
    this.intensity.domUpdate()
  }

  /**
    Définir la classe du tag
    Cette classe définit son aspect et dépend de son type
  **/
  setClass(){
    this.obj.className = this.cssClass
  }

  get cssClass(){
    try {
      return `tag ${this.type.value} ${this.isPositive?'pos':'neg'}`
    } catch (err) {
      var errors = []
      if ( !this.obj ) { errors.push('this.obj est non défini')}
      if ( !this.type) { errors.push('this.type est non défini')}
      else if ( !(this.type instanceof TagProperty) ) {errors.push('this.type devrait être une TagProperty')}
      console.error("Une erreur est survenue dans Tag#setClass :", err)
      console.error(errors.join("\n"))
    }
  }

  observe(){
    // this.obj.addEventListener('mousedown', this.onMouseDown)
    this.obj.onmousedown = this.onMouseDown
    const dragData = {
        axis:'y'
      , stop: this.onEndMoving.bind(this)
      , stack:'.tag' // pour être toujours au-dessus des autres
      , disabled: true
      , classes: {'ui-draggable-dragging': 'moving'}
    }
    // console.log("Drag data : ", dragData)
    $(this.obj).draggable(dragData)

    // this.heightHandler.addEventListener('mousedown', this.onHeightHandlerMouseDown.bind(this))
    this.heightHandler.onmousedown = this.onHeightHandlerMouseDown.bind(this)

  }
  unobserve(){
    // this.obj.removeEventListener('mousedown', this.onMouseDown)
    this.obj.onmousedown = null
    $(this.obj).draggable('destroy')
    // this.heightHandler.removeEventListener('mousedown', this.onHeightHandlerMouseDown.bind(this))
    this.heightHandler.onmousedown = null
  }

  onHeightHandlerMouseDown(ev){
    log("-> onHeightHandlerMouseDown")
    // window.addEventListener('mouseup', this.onHeightHandlerMouseUp.bind(this))
    window.onmouseup = this.onHeightHandlerMouseUp.bind(this)
    // window.addEventListener('mousemove', this.onHeightHandlerMouseMove.bind(this))
    window.onmousemove = this.onHeightHandlerMouseMove.bind(this)
    stopEvent(ev)
    this.offsetYonStart = ev.clientY
    this.heightOnStart = this.height.value || this.obj.offsetHeight
    log("<- onHeightHandlerMouseDown")
    return false
  }
  onHeightHandlerMouseUp(ev){
    log("-> onHeightHandlerMouseUp")
    const diff = ev.clientY - this.offsetYonStart
    this.height.value = this.heightOnStart + diff
    this.updateHeight()
    window.onmouseup = null ;
    window.onmousemove = null ;
    log("<- onHeightHandlerMouseUp")
    return stopEvent(ev)
  }
  onHeightHandlerMouseMove(ev){
    log("-> onHeightHandlerMouseMove")
    stopEvent(ev)
    // console.log("ev:", ev)
    const diff = ev.clientY - this.offsetYonStart
    // console.log("Je déplace de ", diff)
    // console.log("Nouvelle hauteur : ", this.heightOnStart + diff)
    this.updateHeight(this.heightOnStart + diff)
  }

  // Régler la hauteur du tag
  updateHeight(newHeight){
    newHeight = `${newHeight||this.height.value}px`
    this.obj.style.height = newHeight
    this.markStylo.style.height = newHeight
  }

  /*
      Properties
  */

  // NB: TagProperty est défini ci-dessous, pour le moment
  get id(){return this._id || (this._id = new TagProperty(this, 'id'))}
  get type(){return this._type || (this._type = new TagProperty(this, 'type'))}
  get content(){return this._content || (this._content = new TagProperty(this, 'content'))}
  get fixed(){return this._fixed || (this._fixed = new TagProperty(this, 'fixed'))}
  get intensity(){return this._intensity || (this._intensity = new TagProperty(this, 'intensity'))}
  get top(){return this._top || (this._top = new TagProperty(this, 'top'))}
  get height(){return this._height || (this._height = new TagProperty(this, 'height'))}
  get date(){return this._date || (this._date = new TagProperty(this, 'date'))}

  /*
      DOM properties
  */

  // Mark "de stylo" près du document
  get markStylo(){
    return this._markstylo || (this._markstylo = DGet('.mark-stylo', this.obj))
  }
  // Poignée pour régler la hauteur
  get heightHandler(){
    return this._heighthandler || (this._heighthandler = DGet('.height-handler', this.obj))
  }
  get obj(){ return this._obj }
}

/** ---------------------------------------------------------------------
  *
  *   Class TagProperty
  *   -----------------
  *   Gestion des propriétés de tag
  *
*** --------------------------------------------------------------------- */
class TagProperty {
  constructor(tag, property){
    this.tag = tag
    this.property = this.prop = property
  }
  get value() { return this._value}
  set value(v){ this._value = v}

  domUpdate(){
    if ( this.span ) this.span.innerHTML = this.mark
    else { // Valeurs spéciales (sans champ)
      switch(this.property){
        case 'type':
          this.obj.className = `tag ${this.value}`
          break ;
      }
    }
  }
  get mark(){
    const value = this.tag[this.property].value
    switch(this.property){
      case 'fixed':
        return `<span style="color:${value?'rgb(0, 237, 0)':'rgb(255, 101, 101)'};">◉</span>`
      case 'intensity':
        var m = this.isPositive ? '❤️' : '🧨'
        return value > 1 ? ''.padStart((value - 1)*2,m) : ''
      default:
        return value
    }
  }

  /**
    +return+ true si c'est un commentaire positif, false dans le cas contraire
    C'est en fonction du type qu'on le détermine
  **/
  get isPositive(){
    return DATA_TAG_TYPES[this.tag.type.value].positive === true
  }

  get span(){
    return this._span || (this._span = DGet(`.${this.property}`, this.obj))
  }
  // Raccourci vers l'objet DOM du tag
  get obj(){ return this.tag.obj }
}
