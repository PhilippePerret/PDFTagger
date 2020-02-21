'use strict';
class BandeSensible extends SensibleSection {
  constructor(){
    super()
  }

  append(child){
    this.obj.appendChild(child)
  }

  get topAjout(){ return 0 }

  get domId(){
    return this._domId || (this._domId = '#bande-sensible')
  }
}
