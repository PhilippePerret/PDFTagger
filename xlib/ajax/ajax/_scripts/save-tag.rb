# encoding: UTF-8
=begin

  Script qui sauve le tag

=end

require_relative 'loadTags.rb' # => TAGS
tag  = Ajax.arg(:tag)

begin
  # On vérifie d'abord que le code soit conforme
  now = Time.now.to_i

  if File.exists?(TAGS_PATH)
    dst = File.join(TAGS_BACKUPS_FOLDER, "tags-#{now}.json")
    FileUtils.move(TAGS_PATH, dst)
  end

  # Soit on ajoute le nouveau tag, soit on l'actualise
  TAGS.merge!(tag['id'] => tag)

  # On enregistre le nouveau code
  File.open(TAGS_PATH,'wb'){|f| f.write TAGS.to_json}

  Ajax << {success: "- Tags (#{TAGS.keys.count}) sauvés avec succès -"}

  require_relative 'epureBackups.rb'

rescue Exception => e

  Ajax << {error: "#{e.message}. Je ne l'enregistre pas."}

end
