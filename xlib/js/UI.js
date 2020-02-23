'use strict'
/** ---------------------------------------------------------------------
  *
  Classe UI
  *
*** --------------------------------------------------------------------- */
function log(msg, params){
  if (params){
    console.log(msg, params)
  } else {
    console.log(msg)
  }
}

window.onkeypress = function(ev){
  if (ev.key === 'Escape') {
    log('-> escape')
    window.onmousemove  = null ;
    window.onmouseup    = null ;
    log('-> désactivation des mousemove et mouseup de window')
  }
}

class UI {
  static setInterface()
  {

    const WHeight = window.innerHeight
    const footerHeight = $('section#footer').height()
    const Ajout = 4 //+ 100 // pour bien voir la fin
    // log("innerHeight", window.innerHeight)
    // log("footerHeight", footerHeight)
    this._maxtop = WHeight - footerHeight - Ajout ;
    const HContainer = `${this.maxTop}px`
    $('section#pdf-document').css('height', HContainer)
    $('div#container').css('height', HContainer)
    $(TiroirTools.obj).css('height', HContainer)
    $(TiroirTools.handler).css('height', HContainer)

    const pdfw = this.pdfTag.offsetWidth - 20
    // log("Largeur pdfTag = ", pdfw)
    this.maskScrollbar.style.left = `${pdfw}px`
    this.maskScrollbar.style.width = `20px`
    this.maskScrollbar.style.height = HContainer


    this.pdfMask.obj.style.width = `${pdfw}px`

    // On construit le tiroir d'outils
    TiroirTools.build()

    this.observe()

    // Pour essayer les bubbling/capturing
    // this.tryEvents()

  } // setInterface

  static tryEvents(){
    // this.bandeSensible.obj.remove()
    // this.pdfMask.obj.remove()
    // this.pdfTag.remove()
    this.container.remove()

    document.body.appendChild(
      DCreate('DIV', {
          id: 'parent'
        , style:'width:300px;height:100px;background:green;'
        , inner:[
              DCreate('DIV', {id:'enfant1', style:'width:100px;height:50px;background:blue', inner:'Enfant 1'})
            , DCreate('DIV', {id:'enfant2', style:'width:100px;height:50px;background:red', inner:'Enfant 2'})
          ]
      })
    );
    const parent = DGet('#parent')
    const child1 = DGet('#enfant1')
    const child2 = DGet('#enfant2')

    parent.addEventListener('click', this.onClickParent.bind(this))
    child1.addEventListener('click', this.onClickChild1.bind(this), true)
    child2.addEventListener('click', this.onClickChild2.bind(this), false)
  }

  static onClickParent(ev){
    log("ev in parent = ", ev)
    log("-> Parent 1")
  }
  static onClickChild1(ev){
    // ev.cancelBubble = true
    stopEvent(ev)
    log("-> Child 1")
  }
  static onClickChild2(ev){
    // ev.cancelBubble = false
    log("-> Child 2")
  }

  static observe()
  {
    /**
     * On utilise mousedown et mouseup pour deux raisons :
     *  a) pouvoir suspendre la propagation quand clique ou drag sur tag
     *  b) prendre la valeur de départ et la valeur d'arrivée pour "trait"
    **/
    this.bandeSensible.observe()
    this.pdfMask.observe()
  }

  static get maxTop(){
    return this._maxtop || (this._maxtop = 300)
  }

  static get maskScrollbar(){
    return this._maskscrollbar || (this._maskscrollbar = DGet('#mask-scrollbar'))
  }

  static get tiroirTools(){
    return this._tiroirtools || (this._tiroirtools = DGet('#tiroir-tools'))
  }
  static get bandeSensible(){
    return this._bandesensible || (this._bandesensible = new BandeSensible())
  }
  static get pdfMask(){
    return this._pdfmask || (this._pdfmask = new PDFMask())
  }

  static get pdfTag(){
    return this._pdftag || (this._pdftag = DGet('#pdfdocument'))
  }
  static get secDocument(){
    return this._secDocument || (this._secDocument = DGet('section#pdf-document'))
  }

  static get container(){
    return this._container || (this._container = DGet('div#container'))
  }
}
