var test = new Test('Ajout de tags');
test.run = function(){

  this.check_ligne_copied_pasted_without_same_id();

  this.check_line_copied_pasted_after_new_empty_line();

  this.check_new_line_at_the_end();

  this.check_two_new_lines_at_the_end();

  this.check_line_at_the_end_and_empty_line_before();

};
test.check_ligne_copied_pasted_without_same_id = function(){
  given('Deux lignes qui ont le même ID (après un copié-collé par exemple)');

  M.reset_for_tests();
  option('code beside');
  Tags = `
acc G x=100 y=100
  `;
  M.relaunch_for_tests();

  assert(
    ULTags.length == 1,
    'Il y a un seul M.tag.',
    `Il ne devrait y avoir qu'un seul M.tag, il y en a ${ULTags.length}.`
  )

  assert(
    ULTags.length == 2,
    'Il y a deux tags (dans ULTags)',
    `Il devrait y avoir deux tags dans ULTags. Il y en a ${ULTags.length}.`
  );
  var expect_id = 1
  assert(
    ULTags.first().id == expect_id,
    `Le premier tag a bien l’identifiant #${expect_id}`,
    `Le premier tag devrait avoir l'identifiant #${expect_id}, il a #${ULTags.first().id}`
  )
  expect_id = 2
  assert(
    ULTags.first().id == expect_id,
    `Le second tag a l’identifiant #${expect_id}`,
    `Le second tag devrait avoir l'identifiant #${expect_id}, il a #${ULTags.first().id}`
  )
}

test.check_line_copied_pasted_after_new_empty_line = function(){

  given('Une ligne copiée après une ligne vide');

  M.reset_for_tests();
  option('code beside');
  Tags = `
acc G x=100 y=100
acc G x=100 y=100
  `;
  M.relaunch_for_tests();

  assert_nombre_tags(2);

  assert_nombre_tags(4, 3);

};

test.check_new_line_at_the_end = function(){

  given("Quand on ajoute un nouveau tag (copié) à la fin");
  M.reset_for_tests();
  option('code beside');
  Tags=`
acc G x=100 y=200

sco extrait-analyse/sonate-haydn-2.png x=38 y=127

`;
  M.relaunch_for_tests();
  assert_nombre_tags(4, 2);

  assert_nombre_tags(5, 3);

  var newtag = ULTags.index(4);
  assert(
    newtag.id == 5,
    'Le nouveau tag a le bon ID (#5)',
    `Le nouveau tag devrait avoir l'ID #5, son ID est #${newtag.id}`
  );

};

test.check_two_new_lines_at_the_end = function(){

  given("Quand on ajoute deux nouveaux tags (copiés) à la fin");

  M.reset_for_tests();
  option('code beside');
  Tags=`
acc G x=100 y=200

sco extrait-analyse/sonate-haydn-2.png x=38 y=127

`;
  M.relaunch_for_tests();
  assert_nombre_tags(4, 2);

  var newcode = 'acc G x=100 y=300'+RC+'acc G x=100 y=400';

  assert_nombre_tags(6, 4);

  var newtag = CTags[4];
  assert(
    newtag.id == 5,
    'Le premier nouveau tag a le bon ID (#5)',
    `Le premier nouveau tag devrait avoir l'ID #5, son ID est #${newtag.id}`
  );

  var newtag2 = CTags[5];
  assert(
    newtag2.id == 6,
    'Le second nouveau tag a le bon ID (#6)',
    `Le second nouveau tag devrait avoir l'ID #6, son ID est #${newtag2.id}`
  );

};

test.check_line_at_the_end_and_empty_line_before = function(){
  given("Quand on ajoute un nouveau tag à la fin et une ligne vide un peu plus haut");

  // Préambule
  M.reset_for_tests();
  option('code beside');
  Tags=`
acc G x=100 y=200

sco extrait-analyse/sonate-haydn-2.png x=38 y=127

`;
  M.relaunch_for_tests();
  // Test de préparation
  assert_nombre_tags(4, 2);

  // Le test
  new_code=`
acc G x=100 y=200


sco extrait-analyse/sonate-haydn-2.png x=38 y=127

acc G x=100 y=200
`;

  // La vérification
  assert_nombre_tags(6, 3);


  // Ce coup-ci, on vérifie vraiment chaque tag
  data_expected = {
    0: {real: true, id: 1},
    1: {real: false, id: 5},
    2: {real: false, id: 3},
    3: {real: true, id: 2},
    4: {real: false, id: 4},
    5: {real: true, id: 6},
  }
  var i = 0, len = 5, dexpect ;
  for(i;i<len;++i){
    ctag = CTags[i];
    dexpect = data_expected[i];
    assert(
      ctag.id == dexpect.id,
      `L'identifiant du tag #${ctag.id} est bon`,
      `L'identifiant du tag #${ctag.id} devrait être ${dexpect.isRealTag}.`
    );
    assert(
      ctag.isRealTag == dexpect.isRealTag,
      `La valeur .isRealTag du tag #${ctag.id} est bonne (${ctag.isRealTag})`,
      `La valeur .isRealTag du tag #${ctag.id} devrait être ${dexpect.isRealTag}, elle est ${ctag.isRealTag}`
    );
  }

}
