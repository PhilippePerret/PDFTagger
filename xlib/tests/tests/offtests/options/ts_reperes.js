var tes = new Test('Option Repères');

tes.run = function(){

  for(var opt of ['repères', 'reperes', 'guides', 'lines-of-reference']){
    this.les_lignes_reperes_existent(opt);
  }

  // this.on_peut_bouger_les_lignes_reperes();

}
tes.les_lignes_reperes_existent = function(opt){

  given(`Sans l'option "${opt}"`);
  M.reset_for_tests();
  Tags=`
  acc G x=100 y=100
  `;
  M.relaunch_for_tests();

  assert(
    $('#refline_h.refline').is(':visible') == false,
    'Aucune ligne repère horizontale n’existe.',
    'La ligne repère horizontale ne devrait pas exister.'
  );
  assert(
    $('#refline_v.refline').is(':visible') == false,
    'Aucune ligne repère verticale n’existe.',
    'La ligne repère verticale ne devrait pas exister.'
  );

  given(`Avec l'option "${opt}"`);
  M.reset_for_tests();
  option(opt);
  Tags=`
  acc G x=100 y=100
  `;
  M.relaunch_for_tests();

  assert(
    $('#refline_h.refline').is(':visible'),
    'Une ligne repère horizontale existe.',
    'Une ligne repère horizontale devrait exister.'
  );
  assert(
    $('#refline_v.refline').is(':visible'),
    'Une ligne repère verticale existe.',
    'Une ligne repère verticale devrait exister.'
  );
};
//
// tes.mouveMouse = function(){
//   tes.y ++ ;
//   var e = $.Event('mousemove');
//   e.pageY = tes.y ;
//   $(document).trigger(e);
//   if(tes.y > 200){
//     console.log('-> fin déplacement');
//     clearInterval(tes.timer);
//   }
// }
// tes.on_peut_bouger_les_lignes_reperes = function() {
//
//   // // Je ne sais pas encore faire ça…
//   given("Avec l'option 'repères'")
//   M.reset_for_tests();
//   option('repères');
//   Tags=`
//   acc G x=100 y=100
//   `;
//   M.relaunch_for_tests();
//
//   var lineh = $('#refline_h') ;
//   var e = $.Event('mousedown', {
//     which: 1,
//     pageX: lineh.offset().left,
//     pageY: lineh.offset().top
//   });
//   lineh.trigger(e);
//
//   try {
//     tes.y = lineh.offset().top ;
//     tes.timer = setInterval(tes.mouveMouse, 10);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     // $('#refline_h').trigger({type:'mouseup'});
//     e = $.Event('mouseup');
//     $(document).trigger(e);
//   }
//
// };
