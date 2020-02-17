'use strict';
class Ajax {

  static send(data){
    Object.assign(data, {
        url: 'xlib/ajax/ajax.rb'
      , error:function(res, status, err){
          console.error("# ERREUR AJAX #")
          console.error("# err = ", err)
          console.error("# res = ", res)
          console.error("# status = ", status)
        }
    })
    if ( data.data.args && 'object' === typeof(data.data.args)){
      data.data.args = JSON.stringify(data.data.args)
    }
    console.log("Data ajax : ", data)
    $.ajax(data)
  }
}
