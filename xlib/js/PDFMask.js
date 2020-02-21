'use strict';
/** ---------------------------------------------------------------------
  *   Classe PDFMask
  *   --------------
  *   Gestion du masque couvrant le document PDF (pour empêcher de le
  *   scroller)
  *
*** --------------------------------------------------------------------- */
class PDFMask extends SensibleSection {

  constructor(){
    super()
  }

  // Pour obtenir la valeur réelle du top du tag à mettre, il faut
  // ajouter cette valeur
  get topAjout() { return PdfDocument.scrollTop }
  
  get domId(){return '#mask-pdf'}
}
