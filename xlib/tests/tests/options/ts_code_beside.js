/**
 * Pour tester l'option 'code_besine'
 */
 var test = new Test('Test des options');

test.case('Code à côté', function(){
  given('Sans l’option "code beside"');
  M.reset_for_tests();
  option();
  return relaunch_and_test(function(){
    assert_not_visible('#div-ultags');
  });
});
test.case('Code à côté avec "code"', function(){
  M.reset_for_tests();
  option('code');
  return relaunch_and_test(function(){
    assert_visible('#div-ultags');
  });
});
test.case('Code à côté avec "code beside"', function(){
  M.reset_for_tests();
  option('code beside');
  return relaunch_and_test(function(){
    assert_visible('#div-ultags');
  });
});
test.case('Code à côté avec "code à côté"', function(){
  M.reset_for_tests();
  option('code à côté');
  return relaunch_and_test(function(){
    assert_visible('#div-ultags');
  });
});
