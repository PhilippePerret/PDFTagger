# encoding: UTF-8
=begin

  Commande permettant de définir l'analyse à utiliser

=end

if Analyse.cible

  analyse = Analyse.cible

  Analyse.define_cible(analyse.name)

  conf = "L'analyse '#{analyse.real_name}' a été mise en analyse cible."
  puts <<-EOT
  #{conf.vert}

  Toutes les commandes peuvent s'utiliser maintenant sans
  préciser l'analyse.
  
  (Noter que cela ne change pas l'analyse courante analysée.
   pour mettre cette analyse en analyse courante, jouer la
   commande '#{'muscat analyse'.jaune}'.
  EOT

else
  error "Aucune analyse trouvée"
end
