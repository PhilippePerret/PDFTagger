# encoding: UTF-8
=begin

  Script qui sauve les options

=end

options  = Ajax.arg(:options)
analyse_name = Ajax.arg(:analyse)  # Nouvelle version (json)

begin

  Ajax << {options: options, analyse_name:analyse_name}

  raise "Il faut implémenter la sauvegarde des options"
  # # On vérifie d'abord que le code soit conforme
  # code.include?('Tags = ') || raise("Le code devrait contenir 'Tags = '")
  #
  # ANALYSE_TAGS_JSON
  # if File.exists?(ANALYSE_TAGS_JSON)
  #   dst = File.join(ANALYSE_BACKUP_FOLDER, "tags-#{now}.json")
  #   FileUtils.move(ANALYSE_TAGS_JSON, dst)
  # end
  #
  # if File.exists?(ANALYSE_TAGS_JS)
  #   # Ancienne formule
  #   # On commence par faire une copie du fichier _tags_.js actuel dans le backup
  #   dst = File.join(ANALYSE_BACKUP_FOLDER, "_tags_-#{Time.now.to_i}.js")
  #   FileUtils.move(ANALYSE_TAGS_JS, dst)
  # end
  #
  # # On enregistre le nouveau code
  # File.open(ANALYSE_TAGS_JS,'wb'){|f| f.write code}
  # File.open(ANALYSE_TAGS_JSON, 'wb'){|f| f.write lines.to_json}

  Ajax << {success: "- Options sauvées avec succès -"}

rescue Exception => e

  Ajax << {error: "#{e.message}. Je ne l'enregistre pas."}

end
