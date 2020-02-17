/**
 * Assertions propres à la classe

 assert_error(<message>[, <type erreur>])
    Pour vérifier qu'une erreur a bien été produite.

assert_function(<fn name>[, <objet>])
    Produit un succès si <objet>.<fn name> est une fonction.

assert_classes(<nodes>, <classes>) / inverse : assert_not_classes
    Pour vérifier que des éléments du DOM on la bonne classes

assert_position(<nodes>, <position>) / inverse : assert_not_position
    Pour vérifier que des éléments du DOM sont à la bonne position x et y

 */

window.assert_function = function(fn_name, objet){
  var condition, ref ;
  if(undefined == objet){
    ref = fn_name;
    condition = fn_name && 'function' == typeof(objet[fn_name]);
  } else {
    if(objet.class){
      ref = `${objet.class}#${fn_name}`;
    } else if(objet.constructor.name) {
      ref = `${objet.constructor.name}#${fn_name}`;
    } else {
      ref = `${objet.name}`;
    }
    condition = objet && fn_name && 'function' == typeof(objet[fn_name])
  }
  assert(
    condition,
    `${ref} est bien une fonction`,
    `${ref} devrait être une function (c'est ${typeof(objet[fn_name])})`
  );
};
// Produit un succès si l'appel à la fonction +fn+ ne produit pas d'erreur
// Un échec otherwise.
// Par exemple, si on veut tester que 'true = window' va générer une erreur,
// on peut faire : assert_no_erreur(function(){true=window})
window.assert_no_erreur = function(fn){
  try {
    fn();
    Tests.onSuccess("Aucune erreur générée.");
  } catch (err) {
    Tests.onFailure(`Une erreur a été générée : ${err}`);
  }
};
window.assert_error = function(err_msg, err_type){
  if (Array.isArray(err_msg)){
    // Plusieurs portions
    ret = matchErrors(err_msg) ;
    errs = err_msg.join(', ')
    assert(
        ret.ok
      , `Une erreur contenant « ${errs} » a bien été générée`
      , `Une erreur contenant « ${errs} » aurait dû être générée (pas trouvé : ${ret.not_found.join(', ')})`
    );
  } else {
    assert(
      matchError(err_msg, err_type),
      `L'erreur « ${err_msg} » a bien été générée.`,
      `L'erreur « ${err_msg} » aurait dû être générée.`
    );
  }
}
// Pour chercher plusieurs portions de message
window.matchErrors = function(err_msgs, err_type){
  var ret = {
    ok: true, not_found: new Array()
  }
  for(err of err_msgs){
    if (matchError(err, err_type)){continue};
    ret.ok = false ;
    ret.not_found.push(err);
  }
  return ret
}
window.matchError = function(err_msg, err_type){
  // console.log('-> matchError', err_msg);
  // console.log('Errors.messages.length:', Errors.messages.length);
  var rg = new RegExp(err_msg, 'i');
  for(var imsg = 0, len = Errors.messages.length; imsg < len ; ++ imsg){
    dmsg = Errors.messages[imsg] ;
    // console.log(dmsg);
    if (dmsg.msg.match(rg)) {
      if(undefined == err_type || dmsg.type == err_type){return true};
    }
  };
  return false ;
}

// Pour vérifier que des éléments DOM ont la bonne classe CSS
window.assert_classes = function(nodes, classes) {
  var i=0
    , icl=0
    , len
    , lencl
    , errs
    , node
    , classe
    , classes_str = classes.join(', ');
  if(undefined == nodes[0]){nodes = [nodes]};
  for(i,len=nodes.length;i<len;++i){
    node = nodes[i];
    errs = new Array();
    for(icl, lencl=classes.length;icl<lencl;++icl){
      classe = classes[icl];
      if($(node).hasClass(classe)){continue};
      errs.push(`le nœud ${node.id} devrait posséder la classe "${classe}" (sa class: "${node.className}")`);
    };
    assert(
      errs.length == 0,
      `le nœud ${node.id} possède les classes ${classes_str}`,
      errs.join(', ')
    );
 };
};
// Inverse de la précédente
window.assert_not_classes = function(nodes, classes) {
 var i=0, icl=0, errs = new Array(), node, classe ;
 if(undefined == nodes[0]){nodes = [nodes]}
 for(i,len=nodes.length;i<len;++i){
   node = nodes[i];
   for(icl, lencl=classes.length;icl<lencl;++icl){
     classe = classes[icl];
     if($(node).hasClass(classe)){
       errs.push(`le nœud ${node.id} ne devrait pas posséder la classe "${classe}").`);
       break;
     };
   };
   assert(
     errs.length == 0,
     `le nœud ${node.id} ne possède pas les classes`,
     errs.join(', ')
   );
 };
};

window.assert_text = function(nodes, expected, strict){
  if(undefined == nodes[0]){nodes = [nodes]}
  var nod, len, i = 0, txt, rg_expect ;
  if(!strict){
    rg_expect = new RegExp(RegExp.escape(expected),'i');
  }
  for(i,len=nodes.length;i<len;++i){
    nod     = nodes[i];
    actual  = nod.innerHTML;
    if(strict){
      condition = expected == actual;
    } else {
      condition = !!actual.match(rg_expect);
    }
    assert(
      condition,
      `Le nœud #${nod.id} contient bien « ${expected} »`,
      `Le nœud #${nod.id} devrait contenir « ${expected} » (il contient « ${actual} »)`
    );
  }
};
// Pour vérifier que des éléments DOM sont bien positionnés
//
// +hposition+ doit contenir {x:, y: h:, w:} au choix
//
TEST_XPROP_TO_REAL_PROP = {
'x': 'left', 'y': 'top', 'h': 'height', 'w': 'width'
}
window.assert_position = function(nodes, hposition, tolerance){
  if(undefined == tolerance){ tolerance = 0};
  if(undefined == nodes[0]){nodes = [nodes]}
  var node, i = 0, errs, valNode ;
  var asserted = false ; // mis à true si effectivement on teste
  for(i,len=nodes.length;i<len;++i){
    node = nodes[i];
    // Pour savoir si on va devoir dire juste "positionné" (1) ou "dimensionné" (2) ou
    // les deux (3)
    var bittest = 0 ;
    errs = new Array();
    for(var prop in hposition){
      expect  = hposition[prop];
      prop    = TEST_XPROP_TO_REAL_PROP[prop] || prop ;
      if(['left','top'].includes(prop)){bittest = bittest | 1};
      if(['width','height'].includes(prop)){bittest = bittest | 2};
      [valNode, unit] = valueAndUnitOf(node.style[prop]);
      if(tolerance > 0){
        if(valNode >= (expect - tolerance) && valNode <= (expect + tolerance)){continue};
      } else if (node.style[prop] == expect){
        continue;
      } else if(valNode >= expect && valNode <= expect){
        continue;
      };
      errs.push(`le ${prop} de #${node.id} devrait être "${expect}", il vaut "${node.style[prop]}"`);
    }
    if(bittest == 3){msg = 'positionné et dimensionné'}
    else{msg = bittest & 1 ? 'positionné' : 'dimensionné' }
    assert(
      errs.length == 0,
      `le node #${node.id} est bien ${msg}`,
      errs.join(', ')
    );
    asserted = true ;
  }//fin de boucle sur les nodes
  if (!asserted){
    console.error('LE TEST NE S’EST PAS FAIT : aucun node trouvé sans doute.');
    Tests.nombre_failures ++ ;
  }
};
// Inverse de la précédente
window.assert_not_position = function(nodes, hposition, tolerance){
if(undefined == tolerance){ tolerance = 0};
if(undefined == nodes[0]){nodes = [nodes]};
var i = 0, errs, valNode ;
var asserted = false ; // mis à true si effectivement on teste
for(i,len=nodes.length;i<len;++i){
  node = nodes[i];
  errs = new Array();
  toutes_identiques = true ; // on suppose qu'il est à la position testée
  for(var prop in hposition){
    expect  = hposition[prop];
    prop    = TEST_XPROP_TO_REAL_PROP[prop] || prop ;
    valNode = parseInt(node.style[prop].replace(/[a-z]/g,''));
    if(valNode < (expect - tolerance) && valNode > (expect + tolerance)){
      toutes_identiques = false;
      break;
    };
  }
  if (toutes_identiques) {
    errs.push()
  }
  assert(
    toutes_identiques == false,
    `le node #${node.id} est bien positionné hors des coordonnées fournies`,
    `le node #${node.id} est situé dans les coordonnées transmises`
  );
  asserted = true ;
}//fin de boucle sur les nodes
if (!asserted){
  console.error('LE TEST NE S’EST PAS FAIT : aucun node trouvé sans doute.');
  Tests.nombre_failures ++ ;
}
};

window.assert_visible = function(domId){
assert(
  $(`${domId}`).is(':visible') == true,
  `Le champ ${domId} est bien visible`,
  `Le champ ${domId} devrait être visible`
);
};
window.assert_not_visible = function(domId){
assert(
  $(`${domId}`).is(':visible') == false,
  `Le champ ${domId} n’est pas visible`,
  `Le champ ${domId} ne devrait pas être visible`
);
};
