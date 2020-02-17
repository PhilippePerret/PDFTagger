'use strict';

function require(path){
  return new Promise((ok,ko)=>{
    const script = document.body.appendChild(document.createElement('script'))
    script.src = path
    $(script)
      .on('load', ()=>{
        // console.log("Le module "+path+" a été chargé avec succès")
        ok()
      })
      .on('erro', (err) => {
        console.error("L'erreur suivante est levée en requirant le script '%s'", path, err)
        ko(err)
      })
  })
}

/**
  @async
  Pour requérir un module
**/
function requireModule(moduleName) {
  return require(`xlib/js/modules/${moduleName}.js`)
}
const loadModule = requireModule
