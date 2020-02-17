
var test = new Test('Object Options');

test.case('Les méthodes', function(){
  assert_function('set', Options);
  assert_function('get', Options);
  assert_function('reset', Options);
  assert_function('to_tags_js', Options);
});
test.case('La méthode `set`', function(){
  OPTIONS['code'].value = null ;
  preAssert(OPTIONS['code'].value == null,
    'La valeur de l’option `code` devrait être nulle'
  );
  Options.set(['code beside']);
  // option('code beside');
  assert(OPTIONS['code'].value == true,
    "L'option `code` a été activée",
    "L'option `code` aurait dû être activée"
  );
});
test.case('Définition des options', function(){
  given("Avec un seul argument dans set pour une option booléenne");
  M.reset_for_tests();
  option('code');
  test.assertOptions({'code': true});

  given("Avec un seul argument aka dans set pour une option booléenne");
  M.reset_for_tests();
  preAssert(OPTIONS['code'].value === null, "L'option 'code' devrait être null.");
  options('code à côté');
  assert(OPTIONS['code'].value === true,
    "L'option est activée","l'option devrait être activée");

  given("Avec plusieurs arguments dans set pour des options booléennes");
  M.reset_for_tests();
  var lo = ['code', 'images-PNG', 'lines-of-reference'];
  for(var i=0; i<3;++i){
    preAssert(OPTIONS[lo[i]].value === null, `L'option "${lo[i]}" devrait être nulle.`);
  }
  options('code', 'images-PNG', 'lines-of-reference');
  for(var i=0; i<3;++i){
    assert(OPTIONS[lo[i]].value === true,
      `L'option "${lo[i]} est bien activée"`,
      `L'option "${lo[i]} devrait être activée"`
    );
  }


  given("Avec deux arguments dans set pour une option non booléenne");
  M.reset_for_tests();
  option('lang', 'en');
  assert(OPTIONS['lang'].value=='en',
    "La langue est bien l'anglais maintenant",
    "La langue courante devrait être l'anglais"
  );
  option('lang', 'fr');
  assert(OPTIONS['lang'].value=='fr',
    "La langue a été remise au français",
    "La langue aurait dû être remise au français"
  );

  given("Avec plusieurs couples d'argeuments dans set pour des options non booléennes");
  M.reset_for_tests();
  lo = {
    'lang': 'fr', 'top-first-score': 20, 'animation-speed': 80
  };
  test.assertOptionsNull(lo);
  options('lang', 'fr', 'marge-haut', 20, 'animation-speed', 80);
  test.assertOptions(lo);

  given("Avec des options et des arguments de divers types dans set");
  M.reset_for_tests();
  lo = {
    'lang':'en', 'lines-of-reference':true, 'top-first-score': 22, 'animation-speed': 70
  };
  test.assertOptionsNull(lo);
  options('lang', 'en', 'repères', 'marge-haut', 22, 'code', 'animation-speed', 70);
  test.assertOptions(lo);

  // === Erreurs ===

  given("Avec une option qui n'existe pas");
  M.reset_for_tests();
  option('lang','fr');
  option('option inconnue au bataillon');
  assert_error("L'option 'option inconnue au bataillon' est inconnue");

  given("Avec un seul argument pour une option non booléenne");
  M.reset_for_tests();
  option('lang','fr');
  test.assertOptionsNull({'space-between-scores': null});
  option('espacement-images');
  assert_error("il faut définir la valeur de l'option non booléenne 'space-between-scores'");
})
// ---------------------------------------------------------------------
// Méthodes fonctionnelles

test.assertOptionsNull = function(lo){
  for(var p in lo){
    preAssert(OPTIONS[p].value == null, `L'option "${p}" devrait être null, elle vaut ${OPTIONS[p].value}`);
  }
}
test.assertOptions = function(lo){
  for(var p in lo){
    assert(OPTIONS[p].value == lo[p],
      `L'option "${p}" vaut bien ${lo[p]}`,
      `L'option "${p}" devrait valoir ${lo[p]}`
    );
  };
}
