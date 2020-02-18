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
    // Pour le moment, on sauve les commentaires dès qu'on ajoute
    // un tag. NON, ça sera fait après l'édition
    // this.save()
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
    tag.id = this.nextId()
    // log("this.items = ", this.items)
    this.items.push(tag)
    this.table.set(tag.id, tag)
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
    for(var k in data) this[`_${k}`] = data[k] ;
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
    let hasChanged = false ;
    for(var k in data){
      var oldValue = this[`_${k}`]
      var newValue = data[k]
      if ( oldValue != newValue ) hasChanged = true
      let prop = propTraitPlat ? `_${k}` : k
      this[prop] = data[k]
    }
    if ( hasChanged && saveIfChanged ){
      log("des valeurs ont changées, je dois enregistrer la nouvelle donnée.")
      this.constructor.save()
    }
  }

  /**
    Retourne le code pour enregistrement
  **/
  get toJson(){
    return {
        id:       this.id
      , type:     this.type
      , content:  this.content
      , top:      this.top
      , fixed:    this.fixed
      , date:     this.date
    }
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
        class:`tag ${this.type}`
      , style:`top:${this.top - 10}px;`
      , inner: [
            DCreate('SPAN', {class:'content',   inner:this.content})
          , DCreate('SPAN', {class:'intensity', inner:String(this.intensity)})
        ]})
    this._obj = div
    UI.bandeSensible.appendChild(div)
    this.observe()
  }

  observe(){
    this.obj.addEventListener('click', this.onClick)
  }

  /*
      Properties
  */

  get id()  {return this._id}
  set id(v) {this._id = v}

  get type()  {return this._type}
  set type(v) {this._type = v; this.obj.className = `tag ${v}`}

  get top() { return this._top }
  set top(v){this._top = v}

  get content() {return this._content}
  set content(v){this._content = v; this.contentSpan.innerHTML = v}

  get intensity() {return this._intensity || 1}
  set intensity(v){this._intensity = v; this.intensitySpan.innerHTML = v}

  // Pour savoir si la note a été corrigée
  get fixed(){return this._fixed || false}
  set fixed(v){this._fixed = v}

  get date(){return this._date}
  set date(v){this._date = v}

  /*
      DOM properties
  */
  get typeSpan(){
    return this._typespan || (this._typespan = DGet('.type', this.obj))
  }
  get contentSpan(){
    return this._contentspan || (this._contentspan = DGet('.content', this.obj))
  }
  get intensitySpan(){
    return this._intensityspan || (this._intensityspan = DGet('.intensity', this.obj))
  }
  get obj(){ return this._obj }
}
