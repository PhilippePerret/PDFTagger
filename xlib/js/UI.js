'use strict'
/** ---------------------------------------------------------------------
  *
  Classe UI
  *
*** --------------------------------------------------------------------- */
function log(msg, params){console.log(msg, params)}

class UI {
  static setInterface()
  {

    this.setBaliseForComments()

    const WHeight = window.innerHeight
    const footerHeight = $('section#footer').height()
    const Ajout = 4 + 100 // pour bien voir la fin
    // log("innerHeight", window.innerHeight)
    // log("footerHeight", footerHeight)
    this._maxtop = WHeight - footerHeight - Ajout ;
    const HContainer = `${this.maxTop}px`
    $('section#pdf-document').css('height', HContainer)
    $('div#container').css('height', HContainer)

    const pdfw = this.pdfTag.offsetWidth - 20
    // log("Largeur pdfTag = ", pdfw)
    this.maskScrollbar.style.left = `${pdfw}px`
    this.maskScrollbar.style.width = `20px`
    this.maskScrollbar.style.height = HContainer

    this.maskPDF.style.width = `${pdfw}px`

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
    this.bandeSensible.addEventListener('click',  PdfDocument.onClick.bind(PdfDocument))
    this.pdfTag.addEventListener('click',         PdfDocument.onClick.bind(PdfDocument))
    this.maskPDF.addEventListener('click',        PDFMask.onClick.bind(PDFMask))
    this.maskPDF.addEventListener('mousedown',    PDFMask.onMouseDown.bind(PDFMask))
    this.maskPDF.addEventListener('mouseup',      PDFMask.onMouseUp.bind(PDFMask))
    this.maskPDF.addEventListener('mousemove',    PDFMask.onMouseMove.bind(PDFMask))
  }

  static get maxTop(){
    return this._maxtop || (this._maxtop = 300)
  }

  static get maskPDF(){
    return this._maskpdf || (this._maskpdf = DGet('#mask-pdf'))
  }
  static get maskScrollbar(){
    return this._maskscrollbar || (this._maskscrollbar = DGet('#mask-scrollbar'))
  }
  static get bandeSensible(){
    return this._bandesensible || (this._bandesensible = DGet('#bande-sensible'))
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
