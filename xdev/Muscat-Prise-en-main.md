
La première chose à faire est de télécharger MUSCAT. Vous pouvez faire une recherche sur mon compte GUIthub avec les mots clés "Philippe Perret Github".

[[slnc 1000]]

Vous cliquez sur le lien affiché par Google, vous rejoignez mes dépôts. Vous choisissez l'application MUSCAT.
Là vous trouvez un bouton "Clone or Download", vous le cliquez et vous choisissez le nouveau bouton « Download ZIP » qui va donc, comme son nom l'indique, télécharger une version compressée de l'application.

[[slnc 1000]]

Pendant qu'elle télécharge — elle fait quand même plusieurs mégaoctets — vous pouvez créer un dossier « Analyses » dans votre dossier Musique.

[[slnc 1000]]

Une fois l'application téléchargée, vous vous retrouvez avec un dossier "Muscat-master" dans votre dossier téléchargement — ou ailleurs si vous avez modifié vos paramètres par défaut.

[[slnc 1000]]

On peut retirer le suffixe "master" — qui indique juste la branche de développement — et vous pouvez glisser ce dossier dans le dossier "Analyses" que nous venons de créer.

[[slnc 1000]]

Ouvrons ce dossier "Muscat" pour voir ce qu'il contient…

D'abord, on trouve un dossier "_analyses_". C'est dans ce dossier que devront se trouver toutes vos analyses en chantier. Pour le moment, on n'en trouve que deux, ou plutôt une seule même, l'analyse d'une sonate de Haydn et un dossier "Template" qui est en fait un modèle à copier pour créer une nouvelle application.

[[slnc 1000]]

> Nous verrons par la suite qu'il y a des moyens beaucoup plus pratique, pour créer une application, que de dupliquer ce dossier.

[[slnc 1000]]

On trouve le fichier "_TABLE_DANALYSE_.html" qui est en quelque sorte le fichier principal. C'est votre table d'analyse, c'est sur elle que vous travaillez vos analyses de partition, dans votre navigateur. On y revient très rapidement.


[[slnc 1000]]

En dessous, vous avez un fichier "analyse.js" qui ne contient que le nom de l'analyse courante, l'analyse qui s'ouvre sur la table d'analyse.

Vous voyez que l'analyse courante s'appelle "EssaiInPlace", mais elle n'existe pas dans le dossier des analyses donc on aurait un problème en ouvrant la table d'analyse.

[[slnc 1000]]

Vous avez ensuite le dossier du manuel, un manuel très complet, en version PDF et HTML, qu'il faut consulter dès que vous avez une interrogation.

[[slnc 1000]]

Les deux fichiers suivants n'ont pas d'importance, vous pouvez même les supprimer sans hésiter.

[[slnc 1000]]

On trouve ensuite un dossier "utils" qui contient des scripts, des utilitaires, très pratiques. Mais pour pouvoir les utiliser, le langage Ruby doit être installé sur votre ordinateur. Si vous êtes sur mac, c'est fait par défaut.

[[slnc 1000]]

Enfin, on trouve deux dossiers commençant par la lettre "x", dont le dossier "xlib" qu'il ne FAUT SURTOUT PAS DÉTRUIRE, c'est lui qui contient tout le code de l'application.

---

[[slnc 1000]]

Nous allons donc créer notre première analyse.

Pour se faire,
* nous ouvrons le dossier "_analyses_"
* nous dupliquons le dossier "Template"
* et nous le renommons. Par exemple "Sonate Mozart". Notez que je ne mets pas d'espace dans les noms. Ce n'est pas obligatoire, mais si vous prenez l'habitude de le faire, ça vous évitera de nombreuses complications.

[[slnc 1000]]

J'ouvre mon tout nouveau dossier d'analyse.

À l'intérieur, je trouve…

* un fichier "tag js". C'est le fichier principal de l'analyse, c'est lui qui définit tous les tags qu'on va poser sur la partition, c'est-à-dire les accords, les cadences, les modulations, les parties et beaucoup d'autres choses encore. Dans Muscat, on appelle tous ces éléments des "tags", comme on en voit sur les murs des villes.

* On a ensuite un fichier "analyse.js" — rappelez-vous, on avait le même dans le dossier principal de Muscat. Ce fichier doit définir le nom de l'analyse, c'est-à-dire le nom de son dossier.
Ici, vous voyez, c'est "Template", puisqu'on a fait une copie de ce dossier.

[[slnc 1000]]

On va tout de suite remplacer ce nom par le nom correct.

* j'ouvre le fichier dans un éditeur, ici, c'est Atom,

* je copie le nom du fichier dans le Finder — ça m'évitera de faire des erreurs de typo,

* je colle ce nom à la place de "Template".

[[slnc 1000]]

Maintenant, je vais pouvoir faire de ma nouvelle analyse l'analyse courante, c'est-à-dire l'analyse qui va s'ouvrir sur la table d'analyse.
Pour ce faire, il suffit de je copie-colle mon fichier "analyse.js" — celui de mon dossier d'analyse — dans le dossier Muscat.

[[slnc 1000]]

Il faut vraiment le dupliquer, plutôt que de le déplacer, comme ça vous gardez votre dossier analyse intact.
Là, sur mac, j'exécute l'opération en déplaçant le fichier tout en tenant la touche ALT appuyée.
L'ordinateur me demande si je veux remplacer le fichier, je confirme.
Cette fois, à la racine du dossier Muscat, c'est bien mon analyse qui est l'analyse courante.

[[slnc 1000]]

Terminons de voir le contenu du dossier d'analyse avant de poursuivre.

[[slnc 1000]]

On trouve un dossier images dans lequel, évidemment, on placera toutes les images.

[[slnc 1000]]

Et on a enfin un fichier README qu'on peut jeter à la poubelle après l'avoir lu — ou pas.

---

[[slnc 1000]]

Nous sommes prêt à commencer notre première analyse.

[[slnc 1000]]

Cela consiste donc à ouvrir la table d'analyse dans Chrome ou un autre navigateur.

[[slnc 1000]]

Notez qu'on l'ouvre dans un navigateur, mais que ça n'a rien à voir avec Internet. Il se trouve simplement que les navigateurs permettent de développer facilement des petites applications très pratiques, sans déployer de trop grands moyens.

[[slnc 1000]]

J'ouvre donc le fichier "TABLE D'ANALYSE POINT HTML".

---

[[slnc 1000]]

C'est un premier message d'erreur qui nous reçoit, nous indiquant qu'il ne connait pas une option. Cela devrait vous arriver plusieurs fois au début de votre utilisation de Muscat, je préférait que vous en soyez informés.

[[slnc 1000]]

Nous corrigerons cette erreur plus tard — pour le moment, jouons un peu avec les tags qui sont déjà présents dans notre modèle.

[[slnc 1000]]

Vous remarquez qu'on peut déplacer facilement les éléments à la souris sur notre table d'analyse — qui est en fait la page blanche du navigateur.

[[slnc 1000]]

Nous pouvons redimensionner les éléments. Ici, j'utilise la touche "w" avec ou sans "ALT".

[[slnc 1000]]

Vous pouvez remarquer que lorsque je sélectionne un élément sur la table, il se sélectionne aussi dans la partie droite de la fenêtre, là où se trouve la définition des tags.
Nous allons y revenir en détail.

---

[[slnc 1000]]

Ce code, on le trouve dans le fichier "tag point js" de notre dossier d'analyse. Attention, il ne faut surtout pas renommer ce fichier.  Comme la plupart des fichiers, d'ailleurs.

Je l'ouvre dans mon éditeur, ici Atom.

[[slnc 1000]]

Vous pouvez l'ouvrir dans n'importe quel éditeur. Il faut juste comprendre un point essentiel : il faut toujours l'enregistre en texte simple. Donc si vous l'ouvrez dans LibreOffice ou Word, surtout, ne l'enregistrez pas en .odt ou .doc, ça ne fonctionnerait plus. Il faut préserver l'extension "poin js" et l'enregistrer en "Simple text".

[[slnc 1000]]

ON repère tout de suite dans ce fichier l'option fautive, celle qui a généré l'erreur quand j'ai ouvert l'analyse sur la table d'analyse. Il manque simplement un "s".

---

[[slnc 1000]]

Je vais supprimer l'intégralité du code, ou presque, pour y voir plus clair.

Allez, je vais même supprimer toutes les options !

[[slnc 1000]]

Si je recharge la table d'analyse — ce qu'il faut faire dès que je change le code de mon fichier "tags point js" — je me retrouve avec une version d'analyse pour le moins minimaliste !

[[slnc 1000]]

Je peux m'amuser à placer mon premier système là où je veux. Remarquez que si je déborde de la table, le contour de la boite devient rouge.

[[slnc 1000]]

Je vais pouvoir ajouter mon premier tag.

Je commence par cliquer à l'endroit où je veux l'ajouter, sur la table d'analyse.

Ensuite, je retourne dans mon fichier "tags point js" et j'ajoute la ligne "accord" (puisque c'est un accord que je veux tagguer), j'indique son nom — Mi mineur — par la suite je noterai plutôt les accords en notation anglosaxonne, convention que j'aime bien utiliser : les accords en notation anglosaxone (avec des lettres) et notes en notation italienne, avec le nom des notes.

[[slnc 1000]]

Ce sera donc un accord de MI mineur.

Et là, à la suite, je colle le contenu de mon presse-papier. Il contient tout simplement les coordonnées du point que j'ai cliqué sur la table d'analyse.

[[slnc 1000]]

Je procède de la même manière pour les accords suivants, en allant cliquer à l'endroit où je veux qu'il apparaissent, puis j'écris leur code. Remarquez la simplicité de ce code.

[[slnc 1000]]

Maintenant que j'ai mis mes trois accords, je peux enregistrer mon fichier tag point js et recharger la table d'analyse pour actualiser l'affichage — comme on le ferait avec un page internet normale.

[[slnc 1000]]

Vous pouvez constater que nos accords ont été taggués. Il suffit de les mettre en place à l'endroit voulu.

[[slnc 1000]]

Certains outils facilitent grandement le travail, comme l'alignement des tags par exemple. Si je veux que mes accords soient parfaitement alignés,

* je les sélectionne — en premier, celui qui doit servir de repère,

* je joue l'outil d'alignement, — ici, j'aligne en bas

* et je clique sur le bouton

Aussitôt, mes tags s'alignent parfaitement.

[[slnc 1000]]

Quand je suis satisfait du résultat, je peux demander le nouveau code de cette analyse, avec les nouveaux emplacements, notamment.

Pour ce faire, je joue le bouton "code source vers presse-papier" dans la boite à outils.

[[slnc 1000]]

Il me suffit de coller ce code dans mon fichier "tags point js".

[[slnc 1000]]

Je pourrais tout à fait remplacer l'intégralité du code, mais je préfère garder des versions de mon analyse. Pas seulement pour le souvenir, mais pour pouvoir revenir en arrière si je rencontre un grand problème.

[[slnc 1000]]

Ici, je précise donc que c'est une version 2 et je colle le code.

[[slnc 1000]]

Vous pouvez noter que ce sont les valeurs "x" et "y" qui ont été modifiées, la position des tags sur la table d'analyse, donc.

[[slnc 1000]]

Pour être sûr d'avoir copié-collé correctement mon code, j'enregistre le fichier "tags point js" et je recharge aussisôt la page. Si rien ne bouge, c'est que le code est bon.

---

[[slnc 1000]]

Passer chaque fois du navigateur à mon éditeur ne me parait somme toute pas la méthode idéale…

Je vais donc utiliser l'option 'code' qui va me permettre d'avoir le code juste à côté de ma table d'analyse.

[[slnc 1000]]

Quand je recharge la page dans Chrome, le code est affiché.
Vous pouvez même noter que le bouton pour copier-coller le code se trouve juste sous ce code.
On trouve également un bouton "plus" et un bouton "moins" qui, comme on s'en doute, vont permettre d'ajouter ou de supprimer des tags.

---

[[slnc 1000]]

Je peux créer ces tags de la même manière :

* je clique à l'endroit où je veux qu'il apparaisse…

* je clique le bouton "plus" — un nouveau tag se créé

* j'écris sa nature — ici une cadence — et je colle les coordonnées que j'ai récupérées simplement en cliquant à l'endroit voulu sur la table d'analyse.
* je joue la touche ENTRÉE, le tag se crée.

[[slnc 1000]]

Je peux bien sûr modifier les données du tag dans le code. Ici, je précise qu'il s'agit plutôt d'un accord de dominante, V, et d'une demi cadence.
Je la place où je veux avec la souris.

[[slnc 1000]]

Notez que lorsqu'on sélectionne un tag sur la table d'analyse, il se sélectionne aussi dans la code. Si je joue TAB (la touche tabulation), je peux même basculer du tag sur la table à son code.
C'est très pratique lorsque l'on veut gagner du temps et utiliser intensivement le clavier.

[[slnc 1000]]

Pour déplacer les tags dans le code, il suffit de jouer les flèches en pressant la touche MÉTA, c'est-à-dire la touche COMMAND sur Mac et la touche CTRL sur PC. Là, je le fais par exemple avec une ligne vide, lorsque je veux en créer une tout en haut du code.

[[slnc 1000]]

Pour créer un nouveau tag, je peux aussi le déplacer en tenant la touche ALT.
Ici, je crée un nouveau chiffrage (un tag de nature "harmonie")
Il me suffit de le prendre et de le glisser à un autre endroit avec la touche ALT, et ça le copie.
Ensuite je le sélectionne, ce qui sélectionne aussi sa ligne de code, pour pouvoir le modifier.
De cette manière il est possible de créer très rapidement l'analyse complète.

[[slnc 1000]]

Comme autres tags, je peux ajouter des lignes, par exemple ici pour indiquer que le chiffrage I dure sur trois mesures.
Pour cette ligne, je vais caler sa position et sa longueur avec seulement les touches.
La touche "x" permet de déplacer l'objet sélectionné horizontalement
La touche "y" permet de le déplacer verticalement.
Avec la touche ALT vous inverser le mouvement
Avec la touche MAJuscule, vous augmenter les pas
et avec la touche CTRL, vous pouvez affiner l'affichage au pixel près.

[[slnc 1000]]

Vous noterez que le code se modifie en même temps qu'on modifie les dimensions et les positions du tag.

---

[[slnc 1000]]

Pour dupliquer un tag, on peut aussi copier-coller son code sur une autre ligne. Je peux le faire avec une image, par exemple, pour créer un deuxième système.
Je rectifie grossièrement les positions dans le code…
… je fait TAB pour sélectionner le tag sur la table d'analyse
… je me sers de x et y pour placer le tag à l'endroit voulu.

Et enfin, il me suffit de copier le code dans le presse-papier pour le coller dans mon fichier "tag point js". Ce sera ma version 3.

[[slnc 1000]]

Il ne faut surtout pas oublier de copier-coller le code, sinon il serait définitivement perdu, il ne s'enregistre pas automatiquement dans le fichier, ce qui demanderait d'autres moyens.

[[slnc 1000]]

Je recharge la table d'analyse dans le navigateur pour m'assurer que le code a bien été copié.

---

[[slnc 1000]]

Je peux poursuivre de cette manière avec un troisième système qui va nous permettre d'aborder d'autres outils très utiles.

[[slnc 1000]]

Là, on voit que mes systèmes ne sont pas bien alignés.

Malheureusement, je ne peux pas me servir de l'outil d'alignement ici puisque je ne sais pas comment ont été découpés les images.

---

[[slnc 1000]]

Pour le faire, je vais utiliser l'options "reperes", rappelez-vous c'était celle qui était mal écrite au tout départ.

En ajoutant cette option et en rechargeant la page, je me retrouve avec deux lignes vertes, mes lignes repères, que je peux déplacer à ma guise à la souris.

[[slnc 1000]]

Je vais donc me servir du repère vertical pour aligner un peu mieux mes systèmes. Ce n'est pas obligatoire, mais c'est plus joli.

Bien évidemment, il aurait été plus intelligent de le faire avant de poser les premiers tags, que nous serons obligés de replacer, ici.

[[slnc 1000]]

Heureusement, je vais pouvoir grouper plus tags et les déplacer en même temps. Je les sélectionne en tenant la touche MAJUSCULE appuyée… puis je clique sur le bouton "GROUPER" dans la boite d'outils.
Maintenant, les tags sont solidaires et se déplacent en même temps.

[[slnc 1000]]

J'aurais pu le programmer simplement avec la sélection, mais je préfère que les opérations multiples soient bien contrôlées, pour éviter les résultats inattendus.

---

[[slnc 1000]]

Bien entendu, vous avez remarqué que maintenant que le code est assez long, la page scrolle pour toujours afficher les tags sélectionnés. On peut de cette manière passer très rapidement d'une partie à l'autre même dans une partition très longue.

---

[[slnc 1000]]

Ajoutons pour terminer cette première approche les informations sur l'œuvre et celui qui l'analyse. On peut le faire à l'aide du tag "titre", du tag "compositeur"…
… Ici, j'indique évidemment n'importe quoi puisqu'il s'agit en vérité d'une sonate de mi mineur de Haydn.
… avec le tag "analyste", je peux mettre l'auteur de l'analyse (avec ou sans "e" — il y a toujours deux manières d'entrer les données, en français ou en angalis). Et enfin le tag "date analyse" permet de préciser quand l'analyse a été menée.

[[slnc 1000]]

Je peux copier coller tout ce code pour faire la version 4 de mon analyse.

---

[[slnc 1000]]

Quand mes versions se multiplient, je peux supprimer les premières, évidemment, pour ne pas trop alourdir mon fichier "tags point js", qui est chaque fois chargé dans le navigateur.

[[slnc 1000]]

Je voudrais retirer les lignes repères, mais lorsque j'essaie de le faire, rien ne se passe…
En fait, c'est tout simplement parce qu'un réglage des options précédent interfère avec mon choix courant.
Il faut donc que je retire cette définition des options.
Et cette fois, ça marche ! les lignes repères ont bien disparu.

---

[[slnc 1000]]

Et je peux pour terminer imprimer cette analyse. En fait, je vais faire un fichier PDF.
Je lance l'impression dans Google, je vérifie les réglages pour avoir des marges minimum, un affichage de 100%, pas d'entête ou de pied de page.
Je peux enfin demander l'enregistrement du fichier au format PDF… et le visualiser dans Aperçu ou autre application de visualisation des documents.

[[slnc 1000]]

Et voilà !
