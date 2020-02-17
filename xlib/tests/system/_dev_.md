RÉFLEXION
=========

Les tests, maintenant, sont par définition asynchrones, puisqu'il faut toujours attendre au moins le traitement des images. Et puis on ne sait jamais ce qui peut être utilisé.

Mais pour ne pas avoir à utiliser le code des promesses, il faudrait gérer tout ça en interne :

Avoir une instance `Test` comme ici, mais qui soit une promesse (ou on garde l'idée qu'à la fin de son run, on ajoute toujours un appel au test suivant)

Avec des instances `Case` qui sont des promesses.

Ça pourrait donner quelque chose comme :

```javascript

var test = new Test("Mon test");

test.run = function(){
  new Case('Une valeur est attendue', function(){
    // ... ici le code
  });
  new Case('Un comportement est attendu', function(){
    M.reset_for_tests();
    Tags = ``;
    M.relaunch_for_tests().then(function(){
      // ... ici les tests ...
    })
  });
}
```

Ou :

```javascript
var test = new Test('mon test');
test.case('Intitulé du cas', function(){

});
test.case('Intitulé de l’autre cas', function(){
  // ... code du test...
})
```
