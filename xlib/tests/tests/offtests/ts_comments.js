/**
 * Pour tester que les commentaires soient bien traités
 */
var test = new Test('Tests des commentaires');

test.run = function(){
  this.image_sequentielle_commented();
};

test.image_sequentielle_commented = function(){
  given("Quand le commentaire est une image séquentielle");

  var texte_original =  "sco sonate_haydn-[1-5].png"
  M.reset_for_tests();
  option('code')
  Tags = `
// ${texte_original}
  `;
  M.relaunch_for_tests();

  var tag = CTags[1];

  assert_nombre_tags(1, 0);
  assert(
    tag.isComment,
    'le seul tag est bien un commentaire',
    "le seul tag devrait être un commentaire… (son isComment est false)"
  );
  assert(
    tag.text == texte_original,
    "son texte original a été conservé",
    `son texte original a été modifié : ${tag.text} (au lieu de ${texte_original})`
  );
  assert(
    tag.id == 1,
    "son ID est 1",
    `son ID devrait être 1, c'est ${tag.id}`
  );
  var l = tag.to_line();
};
