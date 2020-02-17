'use strict';
/** ---------------------------------------------------------------------
  *   Opération d'entrée/sortie (surtout de sortie pour le moment)
  *
  La principale fonction de ce module est de permettre l'enregistrement
  des tags dans le fichier de l'analyse
*** --------------------------------------------------------------------- */

class IO {

  static setSavingLoop() {
    if ( Options.get('auto-save') ) {
      this.startSavingLoop()
    } else if ( this.saveLooping ) {
      this.stopSavingLoop()
    }
  }
  /**
    Pour mettre en route ou arrêter la sauvegarde automatique
  **/
  static toggleSaveLoop(){
    if ( this.saveLooping ) {
      this.stopSavingLoop()
    } else {
      this.startSavingLoop()
    }
  }
  /**
    On met en route la boucle qui va checker s'il faut sauver le
    code
  **/
  static startSavingLoop(){
    this.saveLooping = true
    this.saveTimer = setInterval(this.saveIfModified.bind(this), 5000)
    this.setAutoSaveButton()
    console.log("Boucle de sauvegarde automatique ON")
  }

  /**
    Règle le bouton de sauvegarde automatique
    Note : la méthode est appelée par UI.setUI au démarrage.
  **/
  static setAutoSaveButton(){
    const autosave = Options.get('auto-save')
    UI.btnStopSave.querySelector('img').src = `xlib/images/pictos/auto-save-${autosave?'on':'off'}.png`
    UI.btnStopSave.style.opacity = autosave ? '1' : '0.3'
  }
  /**
    On arrête la sauvegarde auto
  **/
  static stopSavingLoop(){
    if ( undefined !== this.saveTimer ) {
      clearInterval(this.saveTimer)
      delete this.saveTimer
      this.setAutoSaveButton()
      console.log("Boucle de sauvegarde automatique OFF")
    }
    this.saveLooping = false
  }

  static saveIfModified(){
    if ( Muscat.modified ) {
      this.saving = true
      console.log('%c--- Modification du code => Enregistrement', 'color:green;')
      this.saveTags()
      Muscat.modified = false
      this.saving = false
    } else {
      console.log('%c--- Pas de modification (pas d’enregistrement)', 'color:blue;')
    }
  }

  static saveTags(){
    const my = this
    A.increaseVersionPatch() // Patch suivant
    Ajax.send({
        type:'POST'
      , data: {
            script: "save_current.rb"
          , args: { code: A.veryFullCode }
        }
      , success: my.onTagsSaved.bind(my)
    })

  }

  static saveOptions(){
    const my = this
    Ajax.send({
        type: 'POST'
      , data: {
            script: "save_options.rb"
          , args: {
                options: Options.OPTIONS
              , analyse: A.name
            }
        }
    })
  }

  /**
    Méthode retour de l'enregistrement des tags
  **/
  static onTagsSaved(retour, err){
    console.log('-> onTagsSaved')
    if ( retour.error ) {
      console.error(retour.error)
    } else {
      console.log(retour.success)
      // console.log("Retour : ", retour)
    }
    console.log('<- onTagsSaved')
  }


}
