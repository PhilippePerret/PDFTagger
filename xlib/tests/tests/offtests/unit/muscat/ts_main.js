var test = new Test('Test principal de MuScaT (unit/muscat/ts_main.js)');

test.run = function(){
  this.test_methode_onEachTagsLine();
  assert_function('preload', MuScaT);
  assert_function('load', MuScaT);
  assert_function('endLoading', MuScaT);
  this.test_method_build_tags();
  this.test_fonction_codeAnalyseInClipboard();
};

/**
 * Test de la méthode build_tags qui construit les tags sur la
 * table d'analyse.
 */
test.test_method_build_tags= function(){
  assert_function('build_tags', MuScaT);
  M.reset_for_tests();
  option('code beside');
  Tags = `
acc D x=200 y=220
acc G x=100 y=120
mod G x=50 y=70
  `;
  assert_nombre_tags(0);
  // === TEST ===
  M.parse_tags_js();
  // clone2 = Object.assign({},CTags);
  // console.log(clone2);
  M.build_tags();
  assert(
    3 == CTags.length,
    '3 tags construits dans CTags',
    `Il devrait y avoir 3 tags dans CTags (il y en a ${CTags.length})`
  );
  var nbtags = Page.table_analyse.find('.tag').length
  assert(
    3 == nbtags,
    "Il y a 3 tags sur la table d'analyse",
    `Il devrait y avoir 3 tags sur la table d'analyse (il y en a ${nbtags})`
  );
};
test.test_methode_onEachTagsLine = function(){
  assert_function('onEachTagsLine', MuScaT);

  Tags = `
1
2
3
  `;
  var arr = new Array();
  var fn = function(line){
    arr.push(Number.parseInt(line) * 4);
  };
  M.onEachTagsLine(fn);
  var actual = arr.join(';');
  var expected = '4;8;12'
  assert(
    actual == expected,
    "La méthode M.onEachTagsLine opère bien sur toutes les lignes de Tags",
    `La méthode M.onEachTagsLine devrait opérer sur toutes les lignes de Tags.${RC}Attendu: ${expected},${RC}Obtenu: ${actual}.`
  );
};
test.test_fonction_codeAnalyseInClipboard = function(){
  assert_function('codeAnalyseInClipboard', MuScaT);
  M.reset_for_tests();
  option('code-no-option', 'lang', 'fr');
  Tags = `
acc C x=100 y=200
  `
  M.relaunch_for_tests();
  // === TEST ===
  M.codeAnalyseInClipboard();
  expected = `
// Version X.X

Tags = \`
acc C x=100 y=200
\`;
  `;
  var actual;
   navigator.clipboard.readText().then(function(cliped){
    actual    = cliped.trim();
    expected  = expected.trim();
    assert(
      actual == expected,
      'La fonction codeAnalyseInClipboard mets le code dans le presse-papier',
      `La fonction codeAnalyseInClipboard aurait dû mettre le code dans le presse-papier.${RC}Attendu:${RC}${expected}${RC}Obtenu:${RC}${actual}`
    )
  });

}
