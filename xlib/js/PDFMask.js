'use strict';
/** ---------------------------------------------------------------------
  *   Classe PDFMask
  *   --------------
  *   Gestion du masque couvrant le document PDF (pour empêcher de le
  *   scroller)
  *
*** --------------------------------------------------------------------- */
class PDFMask {

  static onClick(ev){
    const top = ev.offsetY + UI.secDocument.scrollTop
    log("Je clique sur le masque à ", top)
    PdfDocument.addTagAt({top:top, left:ev.clientX /* pour placer l'éditeur */})
    return stopEvent(ev)
  }

  static onMouseDown(ev){

    return stopEvent(ev)
  }

  static onMouseMove(ev){

    return stopEvent(ev)
  }

  static onMouseUp(ev){

    return stopEvent(ev)
  }


}
