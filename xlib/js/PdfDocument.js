'use strict';
class PdfDocumentClass {
  constructor(){

  }

  onMouseDown(ev){
    this.mousedownY = ev.offsetY
  }
  onMouseUp(ev){
    log({
      offsetX: ev.offsetX,
      offsetY: ev.offsetY,
      clientX: ev.clientX,
      clientY: ev.clientY
    })

    let height = Math.abs(ev.offsetY - this.mousedownY)
    if ( height < 20 ) height = 20 ;
    this.addTagAt({top: ev.offsetY, height:height})
    return stopEvent(ev)
  }
  onMouseMove(ev){
    // TODO Plus tard pour voir le trait en même temps qu'on le fait
  }

  addTagAt(params) {
    Tag.addNewItem(params)
  }
}
const PdfDocument = new PdfDocumentClass()
