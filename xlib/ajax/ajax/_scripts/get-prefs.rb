# encoding: UTF-8
=begin

  Nouveau fonctionnement : les tags sont enregistrés dans
  un fichier JSON qui est lu à l'ouverture de l'application.

=end

begin

  require_relative 'loadPrefs.rb' # => PREFS

  # Pour les retourner
  Ajax << {prefs: PREFS}

rescue Exception => e

  Ajax << {error: "#{e.message}. Je ne peux pas renvoyer les préférences."}

end
