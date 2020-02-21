'use strict';
class PdfDocumentClass {
  constructor(){

  }

  observe(){

  }
  unobserve(){

  }

  onMouseDown(ev){
    log('-> onMouseDown on PdfDocument')
    this.mouseDownOK = true
    this.mousedownY = ev.offsetY
  }
  onMouseUp(ev){
    log('-> onMouseUp on PdfDocument')

    if ( ! this.mouseDownOK ) {
      // Cela survient lorsque le click down de souris n'a pas été commencé
      // sur la bande sensible => Il ne faut rien faire
      return stopEvent(ev)
    } else {
      delete this.mouseDownOK
    }

    log({
      offsetX: ev.offsetX,
      offsetY: ev.offsetY,
      clientX: ev.clientX,
      clientY: ev.clientY
    })

    let height = Math.abs(ev.offsetY - this.mousedownY)
    if ( height < 20 ) height = 20 ;
    this.addTagAt({top: this.mousedownY, height:height})
    return stopEvent(ev)
  }

  addTagAt(params) {
    Tag.addNewItem(params)
  }

  // Pour définir ou récupérer le scroll
  /*
    @syntax PdfDocument.scrollTop
  */
  get scrollTop(){return this.obj.scrollTop}
  set scrollTop(v){this.obj.scrollTop = v}

  get obj(){return UI.secDocument}
}
const PdfDocument = new PdfDocumentClass()
