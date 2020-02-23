# encoding: UTF-8
=begin

  Nouveau fonctionnement : les tags sont enregistrés dans
  un fichier JSON qui est lu à l'ouverture de l'application.

=end

begin

  require_relative 'loadTags.rb' # => TAGS

  # Pour les retourner
  Ajax << {tags: TAGS}

rescue Exception => e

  Ajax << {error: "#{e.message}. Je ne peux pas renvoyer la liste des tags."}

end
