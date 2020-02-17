
const image_path = function(image){
  return `../../tests/tests/images/${image}`
}
var testCreateImage = new Test('Création des images');
testCreateImage.current_itest = 0 ;

testCreateImage.suite_tests = [
    'premier_juste_pour_virgule'
  , 'rang_images_sans_espacement_defini'
  , 'un_rang_dimages_est_cree_normalement'
  , 'avec_taille_sans_unite'
  , 'avec_taille_et_unite'
  , 'avec_taille_en_pourcentage'
  , 'avec_images_introuvables'
];

testCreateImage.run_async = function() {
  var tname = this.suite_tests[this.current_itest++];
  // console.log(`tname = "${tname}"`);
  if(tname){
    // On joue le test
    testCreateImage[`before_${tname}`]();
  } else {
    // On finit
    Tests.next();
  }
};

testCreateImage.before_premier_juste_pour_virgule=function(){
  this.run_async();
}
// Méthode qui attend, pour lancer le test +fn+, que les images
// soient toutes chargées
testCreateImage.wait_for_images = function(fn){
  var unloadeds = $('.tags img').length ;
  $('.tags img')
    .on('load', function(){
      -- unloadeds ;
      if(!unloadeds){fn()};
    })
    .on('error', function(){
      -- unloadeds ;
      if(!unloadeds){fn()};
    })
  ;
};

testCreateImage.before_rang_images_sans_espacement_defini = function(){
  M.reset_for_tests();
  option('code');
  Tags=`
  sco ${image_path('image-[1-3].png')}
  `;
  M.relaunch_for_tests();
  this.wait_for_images(this.rang_images_sans_espacement_defini);
}
testCreateImage.rang_images_sans_espacement_defini = function(){
  given("Avec une séquence d'images sans espacement défini");
  var tags = assert_nombre_tags(3);
  var pos = [];
  for(var i=0;i<3;++i){pos.push(tags[i].style.top)};
  assert(
    pos[0] == '100px' &&
    pos[1] == '319px' &&
    pos[2] == '538px'
    , "Les 3 images sont bien placées"
    , `Les 3 images ne sont pas bien placées (${pos.join(', ')} au lieu de 100, 319, 538)`
  );
  testCreateImage.run_async();
}
testCreateImage.before_un_rang_dimages_est_cree_normalement = function() {
  // Préambule
  M.reset_for_tests();
  option('code', 'espacement-images', 100);
  Tags=`
  sco ${image_path('image-[1-3].png')}
  `;
  // Test
  M.relaunch_for_tests();
  // Il faut attendre que les images soient chargées et placées
  this.wait_for_images(testCreateImage.un_rang_dimages_est_cree_normalement);
};
testCreateImage.un_rang_dimages_est_cree_normalement = function(){

  given("Avec un code définissant un rang d'images et un espacement défini");

  // Vérification
  var tags = assert_nombre_tags(3);

  assert(
    $('.tags img').length == 3,
    "Ce sont bien 3 images qui ont été créées",
    `3 images auraient dû être créées (il y en a ${$('.tags img').length})`
  );
  var pos = [];
  for(var i=0;i<3;++i){pos.push(tags[i].style.top)};
  assert(
    pos[0] == '100px' &&
    pos[1] == '419px' &&
    pos[2] == '738px'
    , "Les 3 images sont bien placées"
    , `Les 3 images ne sont pas bien placées (${pos.join(', ')} au lieu de 100, 419, 738)`
  );
  testCreateImage.run_async();
};

testCreateImage.before_avec_taille_sans_unite = function(){
  given("Avec une image-sequence définissant une taille sans unité");
  M.reset_for_tests();
  option('code', 'espacement-images', 50);
  Tags=`
  sco ${image_path('image-[1-2].png')} w=200
  `;
  M.relaunch_for_tests();
  this.wait_for_images(testCreateImage.avec_taille_sans_unite);
};
testCreateImage.avec_taille_sans_unite = function(){
  var tags = assert_nombre_tags(2)
  var widths = [];
  for(var i=1;i<3;++i){widths.push(CTags[i].jqObj.width())};
  // var widths_par_dom = [];
  // for(var i=0;i<2;++i){widths_par_dom.push(tags[i].style.width)};
  // console.log("widths_par_dom:", widths_par_dom);
  // console.log("widths par jquery:", widths);
  assert(
    widths[0] == 200 && widths[1] == 200
    , "La taille des images a bien été mise à 200px"
    , `La taille des images aurait dû être mise à 200px, elle est de ${widths.join(', ')}`
  );
  testCreateImage.run_async();
};

testCreateImage.before_avec_taille_et_unite = function(){
  given("Avec une image-séquence définissant une taille avec unité");
  M.reset_for_tests();
  option('code', 'espacement-images', 50);
  Tags=`
  sco ${image_path('image-[1-3].png')} w=20cm
  `;
  M.relaunch_for_tests();
  this.wait_for_images(testCreateImage.avec_taille_et_unite);
};
testCreateImage.avec_taille_et_unite = function(){
  var tags = assert_nombre_tags(3);
  var widths = [];
  for(var i=1;i<3;++i){widths.push(CTags[i].domObj.style.width)};
  assert(
    widths[0] == '20cm' && widths[1] == '20cm'
    , "La taille des images a bien été mise à '20cm'"
    , `La taille des images aurait dû être mise à '20cm', elle est de ${widths.join(', ')}`
  );
  testCreateImage.run_async();
};

testCreateImage.before_avec_taille_en_pourcentage = function(){
  given("Avec une image-séquence définissant une taille en pourcentage");
  M.reset_for_tests();
  option('code', 'espacement-images', 50);
  Tags=`
  sco ${image_path('image-[1-2].png')} w=40%
  `;
  M.relaunch_for_tests();
  this.wait_for_images(testCreateImage.avec_taille_en_pourcentage);
};
testCreateImage.avec_taille_en_pourcentage = function(){
  var tags = assert_nombre_tags(2);
  var widths = [];
  for(var i=1;i<3;++i){widths.push(CTags[i].domObj.style.width)};
  assert(
    widths[0] == '40%' && widths[1] == '40%'
    , "La taille des images a bien été mise à '40%'"
    , `La taille des images aurait dû être mise à '40%', elle est de ${widths.join(', ')}`
  );
  testCreateImage.run_async();
};

testCreateImage.before_avec_images_introuvables = function(){
  M.reset_for_tests();
  option('code');
  Tags=`
  sco ${image_path('image-1.png')} x=100 y=100
  sco badimage-2.png x=200 y=100
  sco test/autrebad.png x=200 y=100
  tex Un_problème_d'image_erronée x=150 y=80 w=200%
  `;
  M.relaunch_for_tests();
  this.wait_for_images(this.avec_images_introuvables);
};
testCreateImage.avec_images_introuvables = function(){
  given("Avec des noms de fichier d'image erronés");
  assert_error(['Des erreurs sont survenues avec les images suivantes', 'badimage-2.png', 'test/autrebad.png']);
  testCreateImage.run_async();
};
