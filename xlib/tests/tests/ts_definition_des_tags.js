/**
 * Ce test permet de vérifier que tous les éléments (tags) peuvent
 * être créés conformément à leur définition.
 */
var testtag = new Test('définition de tous les types de TAG');

testtag.case('Les Partitions', function(){
  given('Des partitions définies avec `score`, `partition` et `sco`')
  M.reset_for_tests();
  Tags = `
  score image-1.png x=122 y=100
  partition image-2.png x=124 y=151
  sco image-3.png x=128 y=167
  `;
  return relaunch_and_test(function(){
    // On prend les tags
    var tags = document.getElementsByClassName('tag');
    assert_nombre_tags(3);
    img1 = tags[0] ; img2 = tags[1] ; img3 = tags[2] ;

    // La classe css est bonne
    assert_classes(tags, ['tag', 'score']);
    assert_position(img1, {x: 122, y: 100});
    assert_position(img2, {x: 124, y: 151});
    assert_position(img3, {x: 128, y: 167});
  });
});

testtag.case('Les Accords', function(){
  given('Des accords définis avec "acc", "chord" ou "accord"');
  M.reset_for_tests();
  assert_nombre_tags(0);
  Tags=`
  chord C x=10 y=100
  accord Ré_Maj. x=20 y=200
  acc E_min x=30 y=300
  `;
  return relaunch_and_test(function(){
    var tags = document.getElementsByClassName('tag');
    assert_nombre_tags(3);
    acc1 = tags[0] ; acc2 = tags[1] ; acc3 = tags[2] ;
    // La classe css est bonne
    assert_classes(tags, ['tag', 'chord']);
    assert_position(acc1, {x: 10, y: 100});
    assert_position(acc2, {x: 20, y: 200});
    assert_position(acc3, {x: 30, y: 300});
    assert_text(acc1, 'C');
    assert_text(acc2, 'Ré Maj.');
    assert_text(acc3, 'E min');
  });
})

testtag.case('Les chiffrages', function(){
  given('Des harmonies définies avec "chiffrage", "harmonie", "harmony", "har"');
  M.reset_for_tests();
  Tags=`
  chiffrage I* x=10 y=20
  harmonie II** x=30 y=40
  harmony V7 x=50 y=60
  har VIIØ x=70 y=80
  `;
  return relaunch_and_test(function(){
    var tags = document.getElementsByClassName('tag');
    assert_nombre_tags(4);
    har1 = tags[0] ; har2 = tags[1] ; har3 = tags[2] ; har4 = tags[3] ;
    // La classe css est bonne
    assert_classes(tags, ['tag', 'harmony']);
    assert_position(har1, {x: 10, y: 20});
    assert_position(har2, {x: 30, y: 40});
    assert_position(har3, {x: 50, y: 60});
    assert_position(har4, {x: 70, y: 80});
    assert_text(har1, 'I*');
    assert_text(har2, 'II**');
    assert_text(har3, 'V7');
    assert_text(har4, 'VIIØ');
  });
});
testtag.case('Les modulations', function(){
  given('Des modulations définies avec "modulation" et "mod"');
  M.reset_for_tests();
  Tags = `
  modulation G x=10 y=20
  mod D x=30 y=40
  mod D/sous-dominante x=50 y=60
  modulation E_Maj. x=70 y=80 h=200
  `;
  return relaunch_and_test(function(){
    var tags = document.getElementsByClassName('tag');
    assert_nombre_tags(4);
    mod1 = tags[0] ; mod2 = tags[1] ; mod3 = tags[2] ; mod4 = tags[3] ;
    assert_classes(tags, ['tag', 'modulation']);
    assert_position(mod1, {x: 10, y: 20});
    assert_position(mod2, {x: 30, y: 40});
    assert_position(mod3, {x: 50, y: 60});
    assert_position(mod4, {x: 70, y: 80});
    assert_text(mod1, 'G');
    assert_text(mod2, 'D');
    assert_text(mod3, 'D');
    assert_text(mod3, 'sous-dominante');
    assert_text(mod4, 'E Maj.');
    // La hauteur de mod4
    // console.log(mod4);
    var line = mod4.querySelector('svg line.vertline');
    var h = asNum(line.getAttribute('y2')) - asNum(line.getAttribute('y1'));
    assert(
      200 == h,
      'La quatrième modulation a bien une hauteur de 200 pixels',
      `La 4e modulation devrait avoir une hauteur de 200 pixels (elle fait ${h}px).`
    );
  });
});

testtag.case('Les cadences', function(){
  given("Des cadences définies avec 'cadence' et 'cad'");
  M.reset_for_tests();
  Tags=`
  cadence I type=parfaite x=10 y=20 w=200
  cad V type=demi x=30 y=40
  `;
  return relaunch_and_test(function(){
    var tags = document.getElementsByClassName('tag');
    assert_nombre_tags(2);
    cad1 = tags[0] ; cad2 = tags[1] ;
    assert_classes(tags, ['tag', 'cadence']);
    assert_position(cad1, {x: 10, y: 20, w: 200});
    assert_position(cad2, {x: 30, y: 40});
    assert_text(cad1, 'I');
    assert_classes(cad1, ['parfaite']);
    assert_text(cad2, 'V');
    assert_classes(cad2, ['demi']);
  });
});

testtag.case('Les numéros de mesure', function(){
  given('Des numéros de mesures définis avec "measure", "mesure", "mes"');
  M.reset_for_tests();
  Tags=`
  measure 12 x=10 y=20
  mesure 13 x=30 y=40
  mes 14 x=50 y=60 w=100 fs=23px
  `;
  return relaunch_and_test(function(){
    var tags = document.getElementsByClassName('tag');
    assert_nombre_tags(3);
    mes1 = tags[0] ; mes2 = tags[1] ; mes3 = tags[2] ;
    assert_classes(tags, ['tag', 'measure']);
    assert_position(mes1, {x: 10, y: 20});
    assert_position(mes2, {x: 30, y: 40});
    assert_position(mes3, {x: 50, y: 60, w: 100});
    assert_text(mes1, '12');
    assert_text(mes2, '13');
    assert_text(mes3, '14');
    assert(
      '23px' == $(mes3).css('font-size'),
      'La 3e mesure a la bonne taille de police (23px)',
      `La 3e mesure devrait avoir une taille de police de 23px (elle vaut ${$(mes3).css('font-size')})`
    );
    var ok = true ;
    for(var i=0;i<3;++i){
      if('1px solid rgb(51, 51, 51)' != $(tags[i]).css('border')){
        ok = false ;
        break;
      }
    }
    assert(ok,
      'Toutes les mesures ont une bordure visible',
      'Les mesures devraient avoir une bordure visible'
    );
  })
});
testtag.case('Les degrés', function(){
  given('des degrés définis avec "degre", "degree", ou "deg"');
  M.reset_for_tests();
  Tags=`
  degre 3 x=10 y=20
  degree 4# x=30 y=40
  deg 6 x=50 y=60 fs=23px
  `;
  return relaunch_and_test(function(){
    var tags = document.getElementsByClassName('tag');
    assert_nombre_tags(3);
    deg1 = tags[0] ; deg2 = tags[1] ; deg3 = tags[2] ;
    assert_classes(tags, ['tag', 'degree']);
    assert_position(deg1, {x: 10, y: 20});
    assert_position(deg2, {x: 30, y: 40});
    assert_position(deg3, {x: 50, y: 60});
    assert_text(deg1, '3');
    assert_text(deg2, '4#');
    assert_text(deg3, '6');
    assert(
      '23px' == $(deg3).css('font-size'),
      'Le 3e degré a la bonne taille de police (23px)',
      `Le 3e degré devrait avoir une taille de police de 23px (elle vaut ${$(deg3).css('font-size')})`
    );
    var ok = true ;
    for(var i=0;i<3;++i){
      if('1px solid rgb(51, 51, 51)' != $(tags[i]).css('border')){
        ok = false ;
        break;
      }
    }
    assert(ok,
      'Tous les degrés ont une bordure visible',
      'Les degrés devraient avoir une bordure visible'
    );
  })
});

testtag.case('Les Parties', function(){
  given('Des parties définies avec "part", "partie" et "par"');
  M.reset_for_tests();
  Tags=`
  partie Une_partie_partie  x=10 y=20
  part   Une_partie_part    x=30 y=40 w=220
  par    Une_partie_par     x=50 y=60 h=800 fs=54px
  `;
  return relaunch_and_test(function(){
    var tags = document.getElementsByClassName('tag');
    assert_nombre_tags(3);
    assert_classes(tags, ['tag', 'part']);
    var l = [
        ['Une partie partie', {x:10, y:20}]
      , ['Une partie part', {x:30, y:40, w: 220}]
      , ['Une partie par', {x:50, y:60, h:800}]
    ];
    for(var i=0;i<3;++i){
      var d = l[i];
      assert_text(tags[i], d[0]);
      assert_position(tags[i], d[1]);
    };
    var expect = '54px';
    var actual = $(tags[2]).css('font-size');
    assert(
      expect == actual,
      'La 3e partie a la bonne taille de police',
      `La 3e partie devrait avoir une taille de police de ${expect} (elle vaut ${actual})`
    );
  });
});
testtag.case('Les textes quelconques', function(){
  given('Des textes quelconques définis par "texte","text" et "tex"');
  M.reset_for_tests();
  Tags=`
  texte Un_texte_pour_voir x=10 y=20
  text Un_autre_text_to_see x=30 y=40 fs=32px
  tex     Le_troisième_texte_? x=50 y=60
  `;
  return relaunch_and_test(function(){
    assert_nombre_tags(3);
    var tags = document.getElementsByClassName('tag');
    assert_classes(tags, ['tag', 'text']);
    var l = [
        ['Un texte pour voir', {x:10, y:20}]
      , ['Un autre text to see', {x:30, y:40}]
      , ['Le troisième texte ?', {x:50, y:60}]
    ];
    for(var i=0;i<3;++i){
      var d = l[i];
      assert_text(tags[i], d[0]);
      assert_position(tags[i], d[1]);
    };
    var expect = '32px';
    var actual = $(tags[1]).css('font-size');
    assert(
      expect == actual,
      'Le 2e texte a la bonne taille de police',
      `La 2e texte devrait avoir une taille de police de ${expect} (elle vaut ${actual})`
    );

  });
});

testtag.case('Les Lignes', function(){
  given('Des lignes définies par "ligne", "line", "lig", "lin"');
  M.reset_for_tests();
  Tags=`
  ligne    ---    x=10  y=20  w=50
  line    |---|   x=30  y=40  w=60
  lig     |___|   x=50  y=60  w=70  h=100
  lin     |___    x=70  y=80  w=90  h=110
  ligne   ___|    x=90  y=100 w=110 h=120
  line    |---    x=110 y=120 w=130 h=140
  lin     ---|    x=130 y=140 w=150 h=160
  `;
  return relaunch_and_test(function(){
    assert_nombre_tags(7);
    var tags = document.getElementsByClassName('tag');
    var ldata = [
        [{x: 10, y:20, w:50}, '0T0']
      , [{x: 30, y:40, w:60}, '1T1']
      , [{x: 50, y:60, w:70, h:100}, '1B1']
      , [{x: 70, y:80, w:90, h:110}, '1B0']
      , [{x: 90, y:100, w:110, h:120}, '0B1']
      , [{x: 110, y:120, w:130, h:140}, '1T0']
      , [{x: 130, y:140, w:150, h:160}, '0T1']
    ];
    for(var i = 0; i<7; ++i){
      var tdata = ldata[i];
      assert_position(tags[i], tdata[0]);
      assert_classes(tags[i], ['tag', 'line', `line${tdata[1]}`]);
    };
  });
});

testtag.case('Les Boites', function(){
  given('Des boites définies avec "boite" et "box"');
  M.reset_for_tests();
  Tags=`
  boite x=10 y=20
  box   x=30 y=40 w=55
  boite x=50 y=60 h=70
  box   x=70 y=80 w=90 h=100 bgc=red
  `;
  return relaunch_and_test(function(){
    assert_nombre_tags(4);
    var tags = document.getElementsByClassName('tag');
    assert_classes(tags, ['tag', 'box']);
    var ldata = [
        [{x:10, y:20, w:50, h:50}]
      , [{x:30, y:40, w:55, h:50}]
      , [{x:50, y:60, w:50, h:70}]
      , [{x:70, y:80, w:90, h:100}]
    ];
    for(var i = 0; i<4; ++i){
      var tdata = ldata[i];
      assert_position(tags[i], tdata[0]);
    };
  });
});

testtag.case('La totale…', function(){
  given("Tous les tags dans une seule analyse");
  M.reset_for_tests();
  Tags=`
  titre Le_Titre_de_l'analyse
  compositeur Un_anonyme
  sco image-1.png x=122 y=100
  acc D_Maj x=140 y=90
  har VII*** x=124 y=133
  cadence I type=parfaite x=126 y=133 w=213
  mes 12 x=111 y=99 fs=11px w=11px h=11px
  deg 5# x=222 y=333
  partie L'Exposition x=10 y=11
  text Un_Texte_Quelconque x=300 y=301 bgc=black c=white
  ligne U x=222 y=444 w=555
  boite x=444 y=555 h=666 bgc=black c=#FF0000
  `;
  return relaunch_and_test(function(){
    assert_nombre_tags(12);
    var tags = document.getElementsByClassName('tag');
    assert_text(tags[0], 'Le Titre de l\'analyse');
    assert_text(tags[1], 'Un anonyme');
    var sco = tags[2];
    assert_classes(sco, ['tag', 'score']);
    assert_position(sco, {x: 122, y:100});
    assert(
      'image-1.png' == sco.src.split('/').pop(),
      'La source de la partition est bien réglée à "image-1.png"',
      `La source de la partition devrait être 'image-1.png', c'est ${sco.src.split('/').pop()}`
    );
    var acc = tags[3];
    assert_classes(acc, ['tag', 'chord']);
    assert_position(acc, {x: 140, y:90});
    assert_text(acc, 'D Maj');
    var har = tags[4];
    assert_classes(har, ['tag', 'harmony']);
    assert_position(har, {x: 124, y:133});
    assert_text(har, 'VII***');
    var cad = tags[5];
    assert_classes(cad, ['tag', 'cadence', 'parfaite']);
    assert_position(cad, {x: 126, y:133, w:213});
    assert_text(cad, 'I');
    var mes = tags[6];
    assert_classes(mes, ['tag', 'measure']);
    assert_position(mes, {x: 111, y:99, w:'11px', h:'11px'});
    assert_text(mes, '12');
    var expect = '11px';
    var actual = $(mes).css('font-size');
    assert(
      expect == actual,
      'La taille de police est bien réglée',
      `La taille de police devrait être ${expect}, elle vaut ${actual}`
    );
    var tag = tags[7];// degré
    assert_classes(tag, ['tag', 'degree']);
    assert_position(tag, {x: 222, y:333});
    assert_text(tag, '5#');
    var tag = tags[8];// Partie
    assert_classes(tag, ['tag', 'part']);
    assert_position(tag, {x: 10, y:11});
    assert_text(tag, "L'Exposition");
    var tag = tags[9];// Texte quelconque
    assert_classes(tag, ['tag', 'text']);
    assert_position(tag, {x: 300, y:301});
    assert_text(tag, "Un Texte Quelconque");
    expect = 'rgb(0, 0, 0)';
    actual = $(tag).css('background-color');
    assert(expect == actual,
      'La couleur de fond est bien noire',
      `La couleur de fond devrait être "black", elle vaut ${actual}`
    );
    expect = 'rgb(255, 255, 255)';
    actual = $(tag).css('color');
    assert(expect == actual,
      'La couleur de police est bien white',
      `La couleur de police devrait être "white", elle vaut ${actual}`
    );
    // text Un_Texte_Quelconque x=300 y=301 bgc=black c=white
    var tag = tags[10];// Ligne
    // ligne U x=222 y=444 w=555
    assert_classes(tag, ['tag', 'line', 'line1B1']);
    assert_position(tag, {x: 222, y:444, w: 555});
    var tag = tags[11];// Une boite
    // boite x=444 y=555 h=666 bgc=black c=white
    assert_classes(tag, ['tag', 'box']);
    assert_position(tag, {x: 444, y:555, w:50, h:666});
    expect = 'rgb(0, 0, 0)';
    actual = $(tag).css('background-color');
    assert(expect == actual,
      'La couleur de fond est bien noire',
      `La couleur de fond devrait être "black", elle vaut ${actual}`
    );
    expect = 'rgb(255, 0, 0)';
    actual = $(tag).css('color');
    assert(expect == actual,
      'La couleur de police est bien rouge',
      `La couleur de police devrait être rouge, elle vaut ${actual}`
    );


  });
});
