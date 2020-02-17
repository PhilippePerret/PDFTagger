/**
 * Fichier contenant diverses petites classes utiles pour simplifier l'application
 *
 * Surf   Pour gérer les surfaces
 *
 */

/**
  * Pour gérer les rectangles, avec
  */
const Surf = function(hdata){
  this.drawn = false ; // pas dessiné
  // Dispatcher les données
  for(var k in hdata){this[`_${k}`] = hdata[k]};
};
Surf.prototype.drawIn = function(container){
  this.container = container ;
  this.domObj = this.container.appendChild(document.createElement('div'));
  this.domObj.style = `z-index:1000;position:absolute;border:1px dashed green;left:${this.x}px;top:${this.y}px;width:${this.w};height:${this.h}`;
  this.observe();
  this.drawn = true ;
};
Surf.prototype.remove = function(){
  this.domObj && $(this.domObj).remove();
};
RECT_PROP_TO_DOMPROP = {x: 'left', y: 'top', w: 'width', h: 'height'};
Surf.prototype.update = function(){
  var my = this ;
  if(!this.drawn){return};
  for(var prop in RECT_PROP_TO_DOMPROP){
    my.domObj.style[RECT_PROP_TO_DOMPROP[prop]] = `${my[prop]}px`;
  }
  message(`x=${this.x} y=${this.y} w=${this.w} h=${this.h} r=${this.r} b=${this.b}`);
};
Surf.prototype.observe = function(){
  if(this.onMouseMove){
    this.jqObj.on('mousemove',this.onMouseMove);
  };
  if(this.onMouseUp){
    this.jqObj.on('mouseup', this.onMouseUp)
  }
};
Surf.prototype.inspect = function(){
  return {
    left: this.x,
    top: this.y,
    right: this.r,
    bottom: this.b
  }
};
// ---------------------------------------------------------------------
//  MÉTHODES DE CALCULS
/**
 * Méthode qui retourne true si le rectangle se trouve dans le rectangle
 * +rect+.
 */
Surf.prototype.isIn = function(rect){
  // console.log('-> isIn ?');
  var res = this.x >= rect.x && this.y >= rect.y && this.b <= rect.b && this.r <= rect.r;
  // console.log({
  //   tag_x: this.x, rect_x: rect.x,
  //   tag_y: this.y, rect_y: rect.y,
  //   tag_b: this.b, rect_b: rect.b,
  //   tag_r: this.r, rect_r: rect.r,
  // })
  // console.log('isIn:',res);
  return res;
};


Object.defineProperties(Surf.prototype,{
   'prop': {'avec':'definition'}
  , x: {
        get: function(){
          if(isKnown(this._x)){return this._x}
          if(isKnown(this._r) && isKnown(this._w)){
            this._x = this._r - this._w ;
          }
          return this._x;
        }
      , set:function(value){
          this._x = value;
          this._b = this._w + this._x;
          this.update();}
    }
  , y: {
        get: function(){
          if(isKnown(this._y)){return this._y}
          if(isKnown(this._b) && isKnown(this._h)){
            this._y = asNum(this._h) - asNum(this._b);
          }
          return this._y;
        }
      , set:function(value){this._y = value;this.update();}
    }
  , w: {
        get: function(){
          if(isKnown(this._w)){return this._w};
          if(isKnown(this._x) && isKnown(this._r)){
            this._w = asNum(this._r) - asNum(this._x) ;
          }
          return this._w;
        }
      , set:function(value){
          this._w = value;
          this._r = asNum(this._x) + asNum(this._w);
          this.update();
        }
    }
  , h: {
        get: function(){
          if(isKnown(this._h)){return this._h};
          if(isKnown(this._y) && isKnown(this._b)){
            this._h = asNum(this._b) - asNum(this._y);
          }
          return this._h;
        }
      , set:function(value){
          this._h = value;
          this._b = asNum(this._y) + asNum(this._h);
          this.update();
        }
    }
  , r: { // côté droit ([r]ight)
        get: function(){
          if(isKnown(this._r)){return this._r}
          if(isKnown(this._x) && isKnown(this._w)){
            this._r = asNum(this._x) + asNum(this._w);
          }
          return this._r;
        }
      , set:function(value){
          this._r = value;
          this._w = asNum(this._r) - asNum(this._x);
          this.update();
        }
    }
  , b: {
        get: function(){
          if(isKnown(this._b)){return this._b};
          if(isKnown(this._y) && isKnown(this._h)){
            this._b = asNum(this._y) + asNum(this._h);
          };
          return this._b;
        }
      , set:function(value){
          this._b = value;
          this._h = asNum(this._b) - asNum(this._y);
          this.update();
        }
    }
  , jqObj:{
      get: function(){return $(this.domObj);}
    }
})
