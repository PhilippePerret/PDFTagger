/**
 * Essai d'un test avec la nouvelle forme (promesses)
 */

var test = new Test("Essai avec promesse");

// Test d'une redéfinition de fichier _tags_.js, donc avec rechargement
// et tests asynchrone, après ce chargement.
test.case('Une redéfinition des tags', function(){
  given("Une redéfinition de Tags redéfinit l'analyse")
  M.reset_for_tests();
  option('code');
  Tags = `
  acc C_maj x=100 y=100
  `;
  return relaunch_and_test(function(){
    assert_nombre_tags(1);
    D.d('* Je finis le cas "Redéfinition des tags"', 5);
  });
});


// Un test simplissime qui se déroule tout de suite.
// La seule complication est qu'il peut venir après le précédent (si les cas
// ne sont pas mélangés)
test.case('Une simple assertion', function(){
  given("Une simple assertion true produit un succès");
  assert(
    true,
    'Je suis bien passé par là.',
    "J'aurais dû passer par là."
  );
});
