'use strict';
/** ---------------------------------------------------------------------
  *   Classe Config
  *   --------------
  *   Configuration de l'application PDFTagger
  *
*** --------------------------------------------------------------------- */
class Config {
  constructor(pdftagger){
    this.owner = pdftagger // PDFTagger, en fait
  }

  /**
    Reçoit la lettre (maintenue appuyée) et retourne le type
  **/
  letter2type(letter){
    const com = this.TableLetter2Type[letter]
    return com ? com : 'com'
  }

  get TableLetter2Type(){
    if ( undefined === this._tablel2t){
      this._tablel2t = {}
      for(var k in DATA_TAG_TYPES){
        let data = DATA_TAG_TYPES[k]
        Object.assign(this._tablel2t, {[data.shortcut]: k})
      }
    } return this._tablel2t
  }

}
