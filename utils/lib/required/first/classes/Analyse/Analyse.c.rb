# encoding: UTF-8
=begin


  Il faut comprendre qu'on peut tirer le nom de l'analyse de plusieurs
  sources :
    - le nom explicite donné en argument de la commande
    - le nom partiel donné en argument de la commande
    - le nom 'cible' déterminé par la commande 'use' (ce nom peut être
      différent du nom de l'analyse courante)
    - le nom de l'analyse courante (en dernier recours)

  Analyse.cible retourne le nom déterminé en argument ou dans le fichier .cible
  Analyse.current retourne le nom déterminé par l'analyse courante, qui
      s'ouvre sur la table d'analyse.
=end
class Analyse
class << self

  # L'analyse cible, soit fournie en argument, soit définie dans .cible,
  # soit demandé.
  def cible
    @cible ||= get_from_all
  end

  # +return+ [Analyse] L'instance de l'analyse définie dans le fichier
  # racine analyse.js
  def current
    @current ||= Analyse.new(get_current_analyse)
  end

  # Met l'analyse +analyse+ [Analyse|String] en analyse courante
  def set_current analyse
    analyse = analyse.name if analyse.instance_of?(Analyse)
    File.open(CUR_ANALYSE_FILE,'wb'){|f|f.write("const ANALYSE=\"#{analyse}\";")}
    puts t('analysis-folder-chosen', {name: analyse.inspect})
  end

  # Méthode qui retourne l'instance [Analyse] en la prenant dans tous les
  # endroit possible :
  #   - de l'argument de la commande, en nom complet ou partiel
  #   - dans le fichier .cible
  #   - dans la liste de toutes les analyses
  # +return+ [Analyse] L'analyse ou [NilClass] Nil
  def get_from_all
    get_from_args || get_from_definition_cible || get_from_ask
  end

  # Retourne l'instance [Analyse] de l'analyse après l'avoir demandée
  # L'utilisateur a pu renoncer.
  def get_from_ask
    nameasked = ask_for_analyse
    if nameasked
      Analyse.new(nameasked)
    else
      nil # pour la clarté
    end
  end

  # Retourne le nom de l'analyse courante (dans le fichier racine analyse.js)
  def get_current_analyse
    File.read(CUR_ANALYSE_FILE).match(/ANALYSE(?:.*?)=(?:.*?)"(.*?)"/).to_a[1]
  end

  # Retourne l'instance analyse d'après l'analyse spécifiée en ligne de
  # commande (deuxième argument). Le nom spécifié peut être partiel ou pas
  # +return+ [Analyse] L'analyse ou [NilClass] Nil
  def get_from_args
    nfroma = get_name_from_args
    if nfroma
      Analyse.new(nfroma)
    else
      nil # pour la clarté
    end
  end

  # Retourne l'instance d'analyse d'après le fichier .cible s'il existe
  def get_from_definition_cible
    if File.exists?(cible_path)
      require cible_path
      Analyse.new(CIBLE_NAME)
    end
  end

  def define_cible cible
    File.open(cible_path,'wb'){|f| f.write "CIBLE_NAME = '#{cible}'\n"}
  end

  # On retourne le nom de l'analyse (nom de son dossier) d'après le nom
  # fourni en argument de commande (il peut être partiel)
  # +return+ [String] Le nom (forcément complet) ou [NilClass] Nil
  def get_name_from_args
    ARGSTRING.each do |arg|
      name = arg.gsub(/ /, '_')
      if File.exists?(File.join(ANALYSES_FOLDER,name))
        # <= le nom complet bien donné
        # => On retourne le nom
        return name
      else
        # <= Le nom incomplet ou mauvais
        # => On cherche le bon
        return get_realname_from_args(name)
      end
    end
    return nil # pour la clarté
  end

  # C'est un nom partiel qui a pu être donné. On renvoie le vrai
  # nom, ou NIL si ce nom n'a pas pu être trouvé
  def get_realname_from_args name
    # Liste qui contiendra tous les candidats
    names = Array.new
    names_list.each do |n|
      if n.start_with?(name)
        names << n
      end
    end
    if names.count == 1
      return names.first
    elsif names.count == 0
      return nil
    else
      puts t('too-much-candidate', {name:name, list: names.join(', ')}).rouge
    end
    return nil
  end


  # Retourne la liste des noms d'analyse (les noms des dossiers)
  def names_list
    @names_list ||= Dir["#{ANALYSES_FOLDER}/*"].collect{|d| File.basename(d)}
  end


  # Méthode qui demande de choisir une analyse dans la liste proposée
  # Retourne le NOM DU DOSSIER de l'analyse
  def ask_for_analyse
    puts "\n\n"
    names_list.each_with_index do |aname, idx|
      puts "    #{(97+idx).chr}: #{aname}"
    end
    puts "\n\n"
    puts RC*2 + "#{t('currente')} #{Analyse.get_current_analyse}"
    print t('which-folder')
    choix = STDIN.getch()
    puts ''
    case choix.to_s.strip
    when ''
      return Analyse.get_current_analyse
    when 'q'
      return nil
    else
      choix = choix.ord - 97
      return names_list[choix] # peut être nil
    end
  end



  def cible_path
    @cible_path ||= File.join(UTILS_FOLDER,'.cible.rb')
  end
end #/ << self
end #/ Analyse
