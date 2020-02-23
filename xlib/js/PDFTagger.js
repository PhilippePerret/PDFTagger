'use strict';
/** ---------------------------------------------------------------------
  *   classe PDFTagger
  *   ----------------
  *   Classe de l'application
  *
*** --------------------------------------------------------------------- */
class PDFTagger {

  /**
    Instance configuration
  **/
  static get config(){
    return this._config || ( this._config = new Config(this) )
  }
}
