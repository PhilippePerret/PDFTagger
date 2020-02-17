'use strict';
/**
  Dom_utils.js
  -------------
  Méthode utiles pour le DOM
  Version 1.1.0
  -------------

  # 1.1.0
    Ajout de la méthode `rowData`
  # 1.0.0
    Séparation du module utils.js -> Dom_utils.js


  Pour requérir un module en ayant un backtrace en cas d'erreur.

  Le mieux est de toujours envoyé `__dirname` en second argument et de définir
  le +rpath+ en fonction de l'endroit courant.
      let maConstante = tryRequire('./insamefolder', __dirname)

**/
/**
 * Méthode qui reçoit l'identifiant d'un élément DOM et retourne sa valeur
 * ou null s'il est vide.
 * Note : il faut impérativement passer un ID, avec ou sans le dièse.
 * +options+
 *  :type   Peut définir le format précis de retour, quand la donnée existe
 *          'number'  => retourne un Int
 *          'float'   => retourne un flottant
 *          'horloge'   =>  C'est une horloge (donc une balise <horloge>) et il
 *                          faut retourner le nombre de secondes et frames
 *          'duree'     =>  C'est une durée (donc une balise <duree>) et il
 *                          faut retourner des secondes et frames.
 */
function getValOrNull(domId, options){
  if(undefined === options) options = {}
  if(domId.substr(0,1)!='#') domId = `#${domId}`
  let field = $(`${domId}`)
    , domField = field[0]
  if(field.length === 0 || field.val() === null) return null

  var value ;
  switch (options.type) {
    case 'horloge':
    case 'duree':
      return parseFloat(field.attr('value'))
    default:
      try {
        if(field.is(':checkbox')){
          return field[0].checked ? field.val() : null
        } else {
          value = field.val().trim()
        }
      } catch (e) {
        console.error(`[getValOrNull] Impossible d'obtenir la valeur de ${domId} : `, e)
        return null
      }
  }
  return valOrNull(value)
}

function valOrNull(value, options){
  value = value.trim()
  if ( value === "" ) return null
  else if(options && options.type === 'number')  return parseInt(value,10)
  else if(options && options.type === 'float')   return parseFloat(value)
  return value
}

function DGet(selector, container){
  if (undefined === container) container = document
  return container.querySelector(selector)
}
/**
  Retourne la valeur de +selector+ dans +container+ mais retourne undefined
  si la valeur est vide (string vide)
**/
function DGetValue(selector,container){
  const dom = DGet(selector,container)
  var value ;
  if (dom) { return nullIfEmpty(dom.value) }
  else return undefined ;
}
function DSetValue(selector,container,value){
  const dom = DGet(selector,container)
  dom.value = value // Plus tard, on pourra checker le genre (cb etc.)
}
function DGetAll(selector, container){
  if (undefined === container) container = document
  return container.querySelectorAll(selector)
}

/**
  Faciliteur pour créer un élément DOM (qui est retourné)

  @param {String} typeElement     Le tag, en fait
  @param {Object} params          Définition de la balise. Avec :

      id      Identifiant à donner à l'élément
      class   La class CSS à appliquer
      style   L'attribut style
      inner   L'innerHTML, en dur
      append  Le ou les éléments DOM à ajouter
      value   La valeur, pour des OPTIONs par exemple
      attrs   Les attributs à définir (hash: attr: valeur, attr: valeur, ...)
              Si une valeur est strictement égale à NULL, l'attribut n'est pas
              inscrit (utile par exemple pour les checked)

  Pour obtenir un picto "?" qui doit afficher une aide, on utilise simplement :
  DCreate('AIDE', "Message d'aide à afficher, sans guillemets doubles droits.")

  Il faut que la méthode qui construit appelle UI.setPictosAide(<container>)

**/
function transmute(de, vers, property){
  if (undefined != de[property]){
    vers[property] = de[property]
    delete de[property]
  }
  return [de,vers]
}
function transmuteAttribute(de,vers,property){
  if (de[property]){
    vers.setAttribute(property, de[property])
    delete de[property]
  }
  return [de,vers]
}
function DCreate(typeElement, params){
  // console.log("DCreate params:", params)


  try {


    if ( typeElement === 'AIDE' ) {
      typeElement = IMG
      params = {class:'picto-aide', alt:'?', src:'img/picto_info_dark.png', attrs:{'data-message':params}}
    }
    var e = document.createElement(typeElement)
    if(undefined === params) return e
    for(var prop of ['id','className','type','src','href','value','disabled']){
      [params, e] = transmute(params, e, prop)
    }
    for(var prop of ['style','alt']){
      [params, e] = transmuteAttribute(params, e, prop)
    }
    if(params.class){
      e.className = params.class
      delete params.class
    }
    if(params.text){
      e.innerHTML = params.text
      delete params.text
    }
    if(params.inner){
      if( 'string' === typeof params.inner ){
        e.innerHTML = params.inner
      } else {
        params.inner.map(domEl => e.appendChild(domEl))
      }
      delete params.inner
    }
    if(params.append){
      if(Array.isArray(params.append)){
        params.append.forEach(el => e.appendChild(el))
      } else {
        e.appendChild(params.append)
      }
      delete params.append
    }
    if(params.editable){
      e.setAttribute('contenteditable','true')
      delete params.editable
    }
    if(params.attrs){
      for(var attr in params.attrs){
        if(params.attrs[attr] === null) continue
        e.setAttribute(attr, params.attrs[attr])
      }
      delete params.attrs
    }
    // Tout ce qui reste dans +params+ doit être ajouté comme attribut
    for(var prop in params){transmuteAttribute(params, e, prop)}

    return e

  } catch (e) {
    console.error(e)
    const spanErr = document.createElement('SPAN')
    spanErr.innerHTML = `ERROR: ${e}`
    spanErr.style = 'color:white;background:red;'
    return spanErr
  }


}

/**
  Classe DRetractable
  ----------------------
  Pour fabriquer des sections rétractables, avec un petit picto à
  gauche pour ouvrir/fermer

  Pour instancier un "div rétractable" :
  const DR = new DRetractable({
    id:       [String] Identifiant unique, requis
    titre:    [String] Le titre, requis (affiché quand fermé)
    titre_buttons:  [DOMElement] Un div éventuel contenant les boutons à
              mettre en regard du titre (à droite)
    opened:   true/false    Sera ouvert si true
    inner:    [Array] Liste des éléments DOM contenu, cachés quand fermé
  })
  Pour l'afficher :
  document.body.append(DR.div)
**/
class DRetractable {
  constructor(data){
    this.data = data
    this.toggleState = this.toggleState.bind(this)
    this.build()
    this.observe()
    this.setState()
  }
  /**
    = public =
    Retourne l'élément DOM du div rétractable
  **/
  get div(){
    return this._div || (this._div = this.build() )
  }

  /**
    Construction de la section
  **/
  build(){
    var spansTitre = []
    if (this.titre_buttons) {
      this.titre_buttons.classList.add('retractable-titre-buttons')
      spansTitre.push(this.titre_buttons)
    }
    spansTitre.push(
      DCreate('SPAN', {class:'retractable-picto', inner:'-'})
    , DCreate('SPAN', {class:'retractable-title', inner:this.titre.toLowerCase()})
    )
    const ligneTitre = DCreate('DIV', {
        id:`${this.domId}-title`
      , class:'retractable-titleline'
      , inner: spansTitre
    })
    const contents = DCreate('DIV',{
        id:`${this.domId}-contents`
      , class:'retractable-contents noDisplay'
      , inner: this.inner
    })
    // Note : l'avantage de définir this.div comme ça, c'est qu'on
    // peut l'observer sans qu'il soit encore inscrit dans le DOM
    this._div = DCreate('SECTION', {
        id: this.id
      , class: 'retractable'
      , inner: [ligneTitre, contents]
    })
    return this.div
  }

  /**
    Observation
  **/
  observe(){
    this.pictoOpen.addEventListener('click', this.toggleState)
    this.spanTitle.addEventListener('click', this.toggleState)
  }

  /*
    State methods
  */

  toggleState(){
    this.opened = !this.opened
    this.setState()
  }
  /**
    Règle en fonction de l'état
  **/
  setState(){
    this.pictoOpen.innerHTML = this.opened ? '▼' : '▶︎' ; //▷▽
    this.contents.classList[this.opened?'remove':'add']('noDisplay')
  }

  /**
    Retourne true si la section est ouverte
  **/
  get opened(){
    if (undefined === this._opened){
      this._opened = this.data.opened || false // clarté
    } return this._opened
  }
  set opened(v){this._opened = v}

  /*
    Volatile properties
  */

  /**
    Le petit picto pour ouvrir/fermer
  **/
  get pictoOpen(){
    return this._pictoopen || (this._pictoopen = DGet('.retractable-picto', this.div))
  }
  /**
    Le span contenant le titre (cliquable)
  **/
  get spanTitle(){
    return this._spantitle || (this._spantitle = DGet('.retractable-title', this.div))
  }
  /**
    Le div contenant le contenu
  **/
  get contents(){
    return this._contents || (this._contents = DGet('.retractable-contents', this.div))
  }

  /**
    ID principal
  **/
  get domId(){
    return this._domid || (this._domid = `retractable-${this.id}-${Number(new Date())}`)
  }

  /*
    Fix properties
  */
  get id(){return this.data.id}
  get titre(){return this.data.titre || this.data.title}
  get titre_buttons(){
    if (undefined === this._titrebuttons) {
      this._titrebuttons = this.data.titre_buttons || this.data.title_buttons
      if ( 'string' === typeof this._titrebuttons ) {
        this._titrebuttons = DCreate('DIV',{inner:this._titrebuttons})
      }
    } return this._titrebuttons ;
  }
  get inner(){return this.data.inner}
} // Classe DRetractable

/**
  Retourne un Helper (de drag) qu'il est sûr de garder au-dessus de tous
  les autres éléments
  Cf. le manuel de développement pour l'utilisation car c'est très particulier
**/
function DHelper(inner, data) {
  var hdata = {}
  for(var k in data){ hdata[`data-${k}`] = data[k]}
  let helper = DCreate(DIV,{class:'draghelper', inner:inner, attrs:hdata})
  $(document.body).append(helper)
  return helper
}
/**
  Retourne
**/
function DLibVal(obj, property, libelle, widths, options){
  let ghostProp = `_div${property}`
  if(undefined === obj[ghostProp] && obj[property]){
    if(undefined === libelle) libelle = property.titleize()
    let css = 'libval'
    if(options && options.class) css = `${css} ${options.class}`
    else if(undefined !== widths) css += ` ${widths /* p.e. w40-60 */}`
    else css += ' normal'
    obj[ghostProp] = DCreate('DIV', {class: css, append:[
        DCreate((widths ? SPAN : 'LABEL'), {class: (widths ? 'label' : null), inner: libelle})
      , DCreate(SPAN, {class:'value', inner: DFormater(obj[property])})
    ]})
  }
  return obj[ghostProp]
}

function zIndex(jqSet, zindex, opts){
  isDefined(opts) || (opts = {})
  jqSet.css('z-index', zindex)
  opts.deep && jqSet.find('*').css('z-index', zindex)
}


function DFormater(str, opts){
  if(isUndefined(FATexte._dformater)){
    let fatexte =  new FATexte('')
    FATexte._dformater = fatexte.formate.bind(fatexte)
  }
  return FATexte._dformater(`${str}`, opts)
}

/**
 * Pour rendre le selecteur +jqId+ visible (visibility)
 */
function toggleVisible(jqId, v){
  $(jqId).css('visibility', v ? STRvisible : STRhidden)
}

// Pour écouter un objet
// p.e. listen(btnPlay, 'click', Controller, 'start')
function listen(cible, ename, objet, method, param){
  if('string'===typeof(cible)){cible = DGet(cible)}
  try {
    if(undefined === param){
      cible.addEventListener(ename, objet[method].bind(objet))
    } else {
      cible.addEventListener(ename, objet[method].bind(objet, param))
    }
  } catch (e) {
    console.error("Impossible d'écouter le DOM élément défini ci-dessous :", e)
    console.error({
      cible: cible, ename: ename, method: method, objet: objet, param: param
    })
  }
}
function listenClick(cible, objet, method, param){listen(cible,'click',objet,method, param)}
function listenMDown(cible, objet, method, param){listen(cible,'mousedown',objet,method, param)}
function listenMUp(cible, objet, method, param){listen(cible,'mouseup',objet,method, param)}

//
// const $ = require('jquery')
// $.fn.extend({
//   insertAtCaret: function(myValue) {
//     if(undefined === myValue || null === myValue) return
//     this.each(function() {
//       if (document.selection) {
//         this.focus();
//         var sel = document.selection.createRange();
//         sel.text = myValue;
//         this.focus();
//       } else if (this.selectionStart || this.selectionStart == '0') {
//         var startPos = this.selectionStart;
//         var endPos = this.selectionEnd;
//         var scrollTop = this.scrollTop;
//         this.value = this.value.substring(0, startPos) +
//           myValue + this.value.substring(endPos,this.value.length);
//         this.focus();
//         this.selectionStart = startPos + myValue.length;
//         this.selectionEnd = startPos + myValue.length;
//         this.scrollTop = scrollTop;
//       } else {
//         this.value += myValue;
//         this.focus();
//       }
//     });
//     return this;
//   }
// });

/**
  Retourne une rangée pour un containeur de données de classe 'container-data'
  +coche+ peut avoir la valeur :
    null    Rien n'est marqué
    true    On coche en vert
    false   Une croix rouge

  Si +span_id+ est fourni, ce sera l'identifiant du code SPAN qui contient
  la valeur à donner à la rangée (souvent utile pour la modifier ou la lire)

  Note : le fichier CSS data.css est requis.
**/
function rowData(coche, label, value, span_id){
  var div = DCreate('DIV',{class:'row-data'})
  var lab = DCreate('LABEL')
  var coche = coche === null ? '' : (coche ? '✅' : '❌')
  lab.append(DCreate('SPAN',{class:'coche',text:coche}))
  lab.append(DCreate('SPAN',{text: label, class:'label'}))
  div.append(lab)
  div.append(DCreate('SPAN',{text:value, id:span_id}))
  return div
}
