# encoding: UTF-8
=begin

  Destruction du tag

=end

require_relative 'loadTags.rb' # => TAGS
tagId  = Ajax.arg(:tagId)
Ajax << {tag_to_destroy: "#{tagId}::#{tagId.class}"}

begin
  # On vérifie d'abord que le code soit conforme
  now = Time.now.to_i


  # Nombre de tags initialement, pour vérifier
  init_tags_count = TAGS.keys.count.to_i
  motif = 'raison inconnue' # pour mettre le motif d'échec

  if TAGS[tagId.to_s].nil?
    motif = 'ce tag est inconnu'
  else
    # On supprime le tag
    TAGS.delete(tagId.to_s)
  end

  # Nombre de tags après la suppression
  final_tags_count = TAGS.keys.count.to_i

  if final_tags_count == init_tags_count - 1
    # On fait un backup avant de supprimer le tags
    # Noter que le fichier existe forcément ici
    dst = File.join(TAGS_BACKUPS_FOLDER, "comments-#{now}.json")
    FileUtils.move(TAGS_PATH, dst)
    # On enregistre le nouveau code
    File.open(TAGS_PATH,'wb'){|f| f.write TAGS.to_json}
    Ajax << {success: "- La tag ##{tagId} a été détruit avec succès -"}
  else
    Ajax << {error: "Impossible de détruire le tag : #{motif}"}
  end

  # On en profite pour épurer la liste des backups
  require_relative 'epureBackups.rb'

rescue Exception => e

  Ajax << {error: "#{e.message}. Je ne l'enregistre pas."}

end
