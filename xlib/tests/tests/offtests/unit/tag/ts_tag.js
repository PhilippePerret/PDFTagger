var test = new Test('Test unitaire des tags');

test.run = function(){
  tag = new Tag('acc D');
  assert(
    tag instanceof(Tag),
    "La classe du tag est bien Tag",
    `La classe du tag devrait être Tag, c'est ${typeof(tag)}`
  )
  assert_function('build', tag);
}
