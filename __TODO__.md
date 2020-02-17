# TODO liste

Il faut réorganiser les méthodes au chargement

PRELOAD
  Chargement des locales
  Gestion des cookies

LOAD
  Les données de l'analyse courante ou par défaut
  A.loadTags()
  A.loadOptions()

POSTLOAD
  Construction de l'analyse
  Mise en route de l'animation si nécessaire (ou plutôt si on a décidé dans
    les options de la démarrer au chargement, sinon, un simple bouton pour)


Ensuite M (MuScaT) gère l'ensemble, mais on utilise Analyse (A pour l'analyse courante)
pour tout ce qui touche à l'analyse.
