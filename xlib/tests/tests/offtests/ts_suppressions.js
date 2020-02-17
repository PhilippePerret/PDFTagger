var test = new Test('Suppressions');
test.run = function(){

  this.supp_in_code_supp_in_analyse();

  this.supp_in_code_with_modifs_supp_in_analyse();

};

test.supp_in_code_supp_in_analyse = function(){
  given("Une suppression dans le code sans autre modification");

  // Préambule
  M.reset_for_tests();
  option('code beside');
  Tags = `
acc D x=100 y=200
acc E x=200 y=200
acc F x=300 y=200
  `;
  M.relaunch_for_tests();
  assert_nombre_tags(3);

  // Test
  newcode = `
acc D x=100 y=200
acc E x=200 y=200
  `;

  assert_nombre_tags(2);

};
test.supp_in_code_with_modifs_supp_in_analyse = function(){
  given("Une suppression dans le code avec modifications autres tags");

  // Préambule
  M.reset_for_tests();
  option('code beside');
  Tags = `
acc D x=100 y=200
acc E x=200 y=200
acc F x=300 y=200
  `;
  M.relaunch_for_tests();
  assert_nombre_tags(3);

  // Test
  newcode = `
acc D x=400 y=200
acc E x=500 y=200
  `;

  assert_nombre_tags(2);

}
