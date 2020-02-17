// AJOUTER AUX TESTS :
// Deux lignes avec le même id (quand l'user fait un copié-collé) => Il
// faut créer un nouvel objet (et même le déplacer si nécessaire)

var test = new Test('Classe MuScaT') ;

test.run = function(){

  MuScaT.reset_for_tests();

  option('code beside');
  Tags = `
tex Test_pour_classe_MuScaT x=100 y=200
mod C_Maj x=100 y=300
acc G x=200 y= 300
  `;

  M.relaunch_for_tests();

  // Test de l'existence d'un objet
  assert(
    'undefined' != typeof(MuScaT),
    'L’objet MuScaT existe.',
    'L’object MuScaT devrait exister…'
  )

  // Test d'une fonction
  assert(
    'function' == typeof (MuScaT.load),
    'MuScaT répond à la méthode `load`',
    'MuScaT devrait répondre à la méthode `load`'
  )

  for(var i=1, len=CTags.length; i<=len; ++i){
    tag = CTags[i]; // Tag

    // console.log(tag);

    assert(
      'object' == typeof(tag),
      `Le tag ${i} est bien un object`,
      `Le tag ${i} devrait être un objet`
    );
    assert(
      tag.isRealTag == true,
      'Le tag est un vrai tag',
      'Le tag devrait être un vrai tag…'
    )
  }

}
