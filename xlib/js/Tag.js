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
    log("Chargement des tags", tags)
    tags.forEach(dtag => new Tag(dtag))
  }

  /**
    Construction de tous les tags
  **/
  static build(){
    log("Construction des tags ", this.items)
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
    this.constructor.addItem(this)
  }

  build(){
    const div = DCreate('DIV', {class:`tag ${this.type}`, style:`top:${this.top - 10}px;`, inner:this.content})
    UI.bandeSensible.appendChild(div)
  }

  edit(options){
    TagEditor.edit(this, options)
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
      , date:     this.date
    }
  }

  get id()  {return this._id}
  set id(v) {this._id = v}

  get type()  {return this._type}
  set type(v) {this._type = v}

  get top() { return this._top }
  set top(v){this._top = v}

  get content() {return this._content}
  set content(v){this._content = v}

  get date(){return this._date}
  set date(v){this._date = v}
}
