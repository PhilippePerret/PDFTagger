/**
 * Assertions propres à l'application

 var tags = assert_nombre_tags(<nombre>[, <nombre sur table>])
    Pour vérifier le nombre de tags dans ULTags ET sur la table
    Retourne les DOMElements des tags existants

 */


// Note : en sus, la méthode retourne tous les tags (DOM elements)
window.assert_nombre_tags = function(nombre, nombre_sur_table){
 if(undefined==nombre_sur_table){nombre_sur_table = nombre};
 assert(
   ULTags.length == nombre,
   `Il y a bien ${nombre} tags dans ULTags`,
   `Il devrait y avoir ${nombre} tags dans ULTags, il y en a ${ULTags.length}`
 );
 var tags = document.getElementsByClassName('tag');
 assert(
   tags.length == nombre_sur_table,
   `Il y a bien ${nombre_sur_table} tags construits sur la table`,
   `Il devrait y avoir ${nombre_sur_table} tags construits sur la table, il y en a ${tags.length}.`
 );
 return tags ;
};
