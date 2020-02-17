# encoding: UTF-8
=begin

  Script qui sauve le code de l'analyse courante

=end

tags  = Ajax.arg(:tags)

begin
  # On vérifie d'abord que le code soit conforme
  now = Time.now.to_i

  if File.exists?(TAGS_PATH)
    dst = File.join(TAGS_BACKUPS_FOLDER, "tags-#{now}.js")
    FileUtils.move(TAGS_PATH, dst)
  end

  # On finalise
  tags = "const TAGS = #{tags};"

  # On enregistre le nouveau code
  File.open(TAGS_PATH,'wb'){|f| f.write tags}

  Ajax << {success: "- Tags sauvées avec succès -"}

rescue Exception => e

  Ajax << {error: "#{e.message}. Je ne l'enregistre pas."}

end
