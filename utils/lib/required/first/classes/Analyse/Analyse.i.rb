# encoding: UTF-8
class Analyse

  attr_reader :name

  # On instancie une analyse avec le nom de son dossier
  def initialize folder_name
    @name = folder_name
  end

  # Pour ouvrir le dossier dans le finder
  def open_folder
    `open "#{path}"`
  end

  # Nom réel
  def real_name
    @real_name ||= name.gsub(/[_\-]/,' ')
  end

  # Retourne les options pour l'analyse
  def options
    @options ||= begin
      if File.exists?(path_options_js)
        JSON.parse(File.read(path_options_js).force_encoding('utf-8').split(RC)[1])
      else
        {}
      end
    end
  end

  # Définit les options pour l'analyse
  def options= opts
    File.open(path_options_js,'wb'){|f| f.write opts.to_json}
    @options = opts
  end


  # Chemin d'accès au fichier options.js de l'analyse
  def path_options_js
    @path_options_js ||= File.join(path,'options.js')
  end

  # Chemin d'accès absolu au dossier de l'analyse
  def path
    @path ||= File.join(ANALYSES_FOLDER,name)
  end

end #/Analyse
