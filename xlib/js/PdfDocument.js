'use strict';
class PdfDocumentClass {
  constructor(){

  }

  onClick(ev){
    log("ev", ev)
    log({
      offsetX: ev.offsetX,
      offsetY: ev.offsetY,
      clientX: ev.clientX,
      clientY: ev.clientY
    })

    this.addTagAt({top: ev.offsetY})
    return stopEvent(ev)
  }

  addTagAt(params) {
    Tag.addNewItem(params)
  }
}
const PdfDocument = new PdfDocumentClass()
