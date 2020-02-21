'use strict';
/** ---------------------------------------------------------------------
  *   Classe abstraite SensibleSection
  *   ---------------------------------
  *   Gestion d'une section sensible pour mettre les tags. Pour le moment
  *   les sections sensibles sont :
  *     - la "bande sensible" à droite du document
  *     - le "masque pdf" qui couvre de façon invisible le document PDF
  *       commenté.
  *
*** --------------------------------------------------------------------- */
class SensibleSection {

  observe(){
    this.obj.addEventListener('mousedown', this.onMouseDown.bind(this))
  }

  onMouseDown(ev){
    this.mouseDownOK = true
    this.mousedownY = Number(ev.offsetY)
    this.clientYStart = Number(ev.clientY)
    this.obj.addEventListener('mouseup', this.onMouseUp.bind(this))
    this.obj.addEventListener('mousemove', this.onMouseMove.bind(this))
    this.removeRectangleSection()
    this.rectangleSelection = DCreate('DIV', {
        id: 'rectangle-selection'
      , style:`background:red;width:10px;height:100px;position:absolute;left:${ev.clientX}px;top:${ev.clientY}px;height:4px;`
    })
    document.body.appendChild(this.rectangleSelection)
    return stopEvent(ev)
  }

  removeRectangleSection(){
    if ( this.rectangleSelection ) {
      this.rectangleSelection.remove()
      delete this.rectangleSelection
    }

  }

  onMouseMove(ev){
    if ( this.rectangleSelection ) {
      this.rectangleSelection.style.height = `${ev.clientY - this.clientYStart}px`
    }
    return stopEvent(ev)
  }

  onMouseUp(ev){
    this.removeRectangleSection()
    if ( ! this.mouseDownOK ) {
      return true
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
    PdfDocument.addTagAt({top: (this.mousedownY + this.topAjout), height:height})
    return stopEvent(ev)
  }

  get obj(){
    return this._obj || (this._obj = DGet(this.domId))
  }
}
