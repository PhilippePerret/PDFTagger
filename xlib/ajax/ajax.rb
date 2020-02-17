#!/usr/bin/env ruby
# encoding: UTF-8
=begin

  Ajax
  ----------
  version 1.0.0
  Module ruby ajax universel

  REQUIS
  ------
    - Le fichier .htaccess (pour utilisation du ruby)
    - le dossier ./ajax contenant les éléments
    - le dossier ./ajax/_scripts contenant tous les scripts propres à
      l'application, qui seront utilisés par Ajax.script (le 'script' passé
      en paramètre par Ajax)
      Cf. ci-dessous "LES SCRIPTS"

  UTILISATION
  -----------

    Faire une requête ajax qui transmettra les données :
      - 'script'      Le scrit à jouer
      - 'args'        Table des arguments à transmettre au script
      - autres clés possibles mais il faudra les connaitre et les appeler
        par le programme à l'aide de 'cgi.params[<clé>][0]'
        Note : il faut ne rester aux données scalaires simples.

    Exemple :
      $.ajax({
        url: 'path/to/this/file/ajax.rb'
      , type: 'POST'
      , data: {
            script: "path/relative/script.rb"
          , args: JSON.stringify({ma:"Table", des:"arguments"})
        }
      , success:function(codeRetour, err){

        }
      , error:function(retour, statut, err){

        }
      , complete:function(retour,err){

        }
      })

  LES SCRIPTS
  ===========
    Ce sont les scripts qui, en local, exécutent les opérations voulues et
    retourne les valeurs attendues.
    Ces scripts se trouvent dans le dossier ./ajax/_scripts et sont propres à
    chaque application (si on duplique ce fichier/dossier ajax, on peut donc
    les supprimer aveuglément).

    Dans Ajax, ces scripts sont simplement requis, donc le code est évalué
    tel qu'il est.
    Dans le script, on peut utiliser les arguments transmis grâce à Ajax.args
    qui est une table contenant les valeurs. Par exemple : Ajax.args['key1']
    On peut aussi utiliser la méthode Ajax.arg('key1') ou Ajax.arg(:key1)

=end


require_relative './ajax/required.rb'
Ajax.treate_request()
