'use strict';
/** ---------------------------------------------------------------------
  *
  *   class TiroirTools
  *
*** --------------------------------------------------------------------- */
class TiroirTools {
  static toggle(ev){
    ev && stopEvent(ev)
    if ( this.obj.classList.contains('opened') ) {
      // On doit le fermer
      this.obj.classList.remove('opened')
      this.obj.classList.add('closed')
    } else {
      this.built || this.build()
      this.obj.classList.add('opened')
      this.obj.classList.remove('closed')
    }
    return false;
  }


  /**
    Construction de la boite d'outil, avec toutes les définitions qui
    ont été données.
  **/
  static build(){
    const container = DGet('.types-support', this.obj)
    var letters = ['q','s','d','f','g', 'w','x','c','v','b']
    const typesLines = letters.forEach(letter => {
      var menuTypes = String(this.tempMenuTypes).replace(/__ID__/g,`${letter}-click`)
      container.appendChild( DCreate('DIV', {class:'line-type', inner:[
          DCreate('SPAN', {class:'label', inner:`${letter.toUpperCase()} + click `})
        , DCreate('SPAN', {inner:'= '})
        , DCreate('SPAN', {inner:menuTypes})
      ]}))
    })
    this.setup()
    this.built = true
  }

  /**
    Régler les valeurs
  **/
  static setup(){
    Object.values(DATA_TAG_TYPES).forEach(dtype => {
      DGet(`#typesmenu-${dtype.shortcut}-click`, this.obj).value = dtype.id
    })
  }

  /**
    Retourne un menu pour les types de commentaires
    Il faut définir __ID__ pour qu'il soit unique
  **/
  static get tempMenuTypes(){
    if ( undefined === this.tempmenutypes){
      var options = Object.values(DATA_TAG_TYPES).map(dtype => {
        return DCreate('OPTION', {value:dtype.id, inner:dtype.hname})
      })
      options.unshift(DCreate('OPTION', {value:'', inner:'- non défini -'}))
      this.tempmenutypes = DCreate('SELECT', {id:'typesmenu-__ID__', class:'menu-types', inner: options}).outerHTML
    } return this.tempmenutypes ;
  }

  /**
    Les options, par exemple pour connaitre le type de commentaire qu'on
    marque lorsque l'on tient la touche 'A'.
    TODO Plus tard, devra être chargée et enregistrée
  **/
  static get dataOptions(){
    return {
      'a+click': {combo:'a+click', type:'dro'}
    }
  }

  static get obj(){return UI.tiroirTools}
}
