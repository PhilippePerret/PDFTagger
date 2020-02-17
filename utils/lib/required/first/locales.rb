# encoding: UTF-8
# Requérir les mots de la langue
require File.join(LOCALES_FOLDER,'locales')
# Requérir les infos
if File.exist?(INFOS_FILE)
  require INFOS_FILE
else
  INFOS = {
    editor: "TextMate",
    updated_at: nil,
    created_at: Time.now.to_i
  }
end


# Retourne le texte localisé en fonction de la langue
def t str_id, templates = nil
  templates ||= Hash.new
  LOCALES[str_id.to_s] % templates
end
