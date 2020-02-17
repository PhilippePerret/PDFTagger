/*
  Script principal
*/

window.error = function(err_msg, err_type){
  Errors.show(err_msg, err_type);
}
const Errors = {
  messages: new Array(),
  show: function(err_msg, err_type = null){
    this.messages.push({msg: err_msg, type: err_type}) ;
    Flash.error(err_msg);
  }
}
Object.defineProperties(Errors,{
  jqObj: {
    get: function(){return $(this.domObj);}
  },
  domObj:{
    get: function(){return document.getElementById('message');}
  }
});
