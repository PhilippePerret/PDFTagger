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
        , {id:'fixed'     , type:'boolean', required:true}
        , {id:'date'      , type:'number',  required:true}
      ]
    } return this._savedproperties ;
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
    Ajax.send({
      data:{
            script: 'save-tags'
          , args:{tags: JSON.stringify(this.items.map(tag => tag.toJson))}
        }
      , success: this.onSuccess.bind(this)
    })
  }
  static onSuccess(ret){
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
    Object.assign(data, {
        id: this.nextId()
      , date: Number(new Date())
    })
    data.type || (data.type = 'com')
    data.content || (data.content = "Un commentaire sur le PDF")
    const tag = new Tag(data)
    tag.build()
    // On met le tag en édition pour pouvoir le sauver ensuite
    tag.edit({top:data.top, left:data.left})
    return tag
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
    for(var k in data) this[k].value = data[k] ;
    this.set(data, /* prop trait plat */ true, /* save = */ false)
    this.constructor.addItem(this)

    this.onClick = this.onClick.bind(this)

  }

  edit(options){
    TagEditor.edit(this, options)
  }

  /**
    Pour définir ou redéfinir les données
  **/
  set(data, propTraitPlat = false, saveIfChanged = false){
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
  }

  /**
    Retourne le code pour enregistrement
  **/
  get toJson(){
    var h = {}
    this.constructor.SAVED_PROPERTIES.forEach( dprop => {
      Object.assign(h, {[dprop.id]: this[dprop.id].value})
    })
    return h
  }

  /*
      Events method
  */

  /**
    Quand on clique sur le tag => édition
  **/
  onClick(ev){
    stopEvent(ev)
    this.edit({top:ev.clientY, left:ev.clientX})
    return false
  }

  /*
      DOM methods
  */

  build(){
    const div = DCreate('DIV', {
        class:`tag ${this.type.value}`
      , style:`top:${this.top.value - 10}px;`
      , inner: [
            DCreate('SPAN', {class:'intensity'})
          , DCreate('SPAN', {class:`fixed`})
          , DCreate('SPAN', {class:'content'})
        ]})
    this._obj = div
    UI.bandeSensible.appendChild(div)
    this.peuple()
    this.observe()
  }

  peuple(){
    this.content.domUpdate()
    this.fixed.domUpdate()
    this.intensity.domUpdate()
  }

  setClass(){
    this.obj.className = `tag ${this.type.value}`
  }

  observe(){
    this.obj.addEventListener('click', this.onClick)
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
  get date(){return this._date || (this._date = new TagProperty(this, 'date'))}

  /*
      DOM properties
  */

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
