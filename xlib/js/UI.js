'use strict'
/** ---------------------------------------------------------------------
  *
  Classe UI
  *
*** --------------------------------------------------------------------- */
function log(msg, params){console.log(msg, params)}

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

    this.setBaliseForComments()

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
  } // setInterface

  /**
    Insert la balise pour charger les tags de commentaires
    On la met ici plutôt que dans le code en dur pour pouvoir
    gérer le cas où le fichier n'existe pas.
  **/
  static setBaliseForComments(){
    const script = DCreate('SCRIPT', {src: '__DOC__/comments.js'})
    document.body.appendChild(script)
    script.onerror = function(ev){
      console.error("Le fichier des commentaires n'existe pas")
      console.error(ev)
    }
    script.onload = function(ev){
      Tag.load(TAGS)
      Tag.build()
    }
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
