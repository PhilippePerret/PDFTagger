
function isMac(){
  !!this.navigator.vendor.match('Apple')
}
function isWindows(){
  return !isMac()
}

// Reçoit une valeur qui peut être un string ou un nombre et retourne une
// dimension (ajoute 'px' si aucune unité n'est précisée)
// Si ce n'est pas un nombre qui est fourni ou si l'unité est mauvaise,
// on génère une erreur fatale.
function asPixels(value){
  if('number'==typeof(value)){return value
  } else if (value.match(/^[0-9]+$/)) {
    return Number.parseInt(value,10);
  } else if (value.match(/^[0-9.]+$/)) {
    return Number.parseFloat(value,10);
  } else if (rg = value.match(/^([0-9]+)px$/)) {
    return Number.parseInt(rg[1],10)
  } else if (rg = value.match(/^([0-9.]+)px$/)) {
    return Number.parseFloat(rg[1],10);
  } else {
    throw(t('pixels-required', {value: value}));
  }
};

/**
 * Retourne +value+ sous forme d'entier en base 10
 */
function asNum(value){
  return Number.parseInt(value,10);
}

/**
 * Reçoit une valeur comme "124" (chiffre ou string), "129px", etc.
 * et retourn e [<nombre>, <unité>], par exemple [124, null] ou [129, 'px']
 */
function valueAndUnitOf(value){
  if('number' == typeof(value)){
    return [value, 'px'];
  } else {
    var arr = value.trim().match(/^([0-9\.]+)([a-z%]+)?$/);
    if ( !arr ){ return [null, null] }
    else { return [Number.parseInt(arr[1],10), arr[2]] };
  };

};

function isKnown(value){
  return 'undefined' != typeof(value); // est-ce que ça suffit ?
};

function isEvent(foo){
  return foo && 'function' == typeof(foo.stopPropagation);
};

// Dans le cas où l'utilisateur n'aurait pas Firebug ou autre.
if ('undefined'==typeof(console)){
  console = {log:function(e){},error:function(e){}}
}

window.message = function(str){
  var dom = document.getElementById('message');
  dom.className = 'notice';
  dom.innerHTML = str;
};

// Pour mettre dans le presse-papier
function clip(str){
  navigator.clipboard.writeText(str) ;
};

// Shuffle the array +arr+
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

RegExp.escape= function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};
