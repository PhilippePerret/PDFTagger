# encoding: UTF-8
=begin
  Analyse des arguments

  Produit :
    OPTIONS
    PARAMS    (=)

  Pour obtenir une option :
    OPTIONS[<key symbolique>]

  Pour obtenir un paramètre
    PARAMS[<key string>]
    PARAMS_SYM[<key symbolique>]

=end
OPTIONS_DIM_TO_REAL = {
  'a' => :all,
  'c' => :cible,
  'e' => :edit,
  'h' => :help,
  'l' => :list,
  'm' => :make
}
OPTIONS = {}
PARAMS  = {}
PARAMS_SYM  = {}
ARGSTRING = []
ARGV.each do |arg|
  if arg.start_with?('--')
    OPTIONS.merge!(arg[2..-1].to_sym => true)
  elsif arg.start_with?('-')
    arg = arg[1..-1]
    OPTIONS.merge!(OPTIONS_DIM_TO_REAL[arg] => true)
  elsif arg.include?('=')
    var, val = arg.split('=')
    if ( val.start_with?('"') && val.end_with?('"') ) then
      val = val[1...-1]
    end
    val = case val
          when /^[0-9]+$/     then val.to_i
          when /^[0-9.]+$/    then val.to_f
          when "true"         then true
          when "false"        then false
          when "nil", "null"  then nil
          end
    PARAMS.merge!(var => val)
    PARAMS_SYM.merge!(var.to_sym => val)
  else
    ARGSTRING << arg
  end
end

# ---------------------------------------------------------------------
# TRAITEMENT DE LA LIGNE DE COMMANDE

# Pour mettre la commande en français ou en anglais
COMMAND_LANG = {
  'aide' =>                     'help',
  'commandes' =>                'commands',
  'ouvre' =>                    'open',
  'créer' =>                    'create',
  'renommer_images' =>          'rename_images',
  'change_dossier_captures' =>  'change_folder_caputres',
  'option' =>                   'options'
}
cmd = ARGSTRING.shift
COMMAND = (COMMAND_LANG[cmd] || cmd).gsub(/\-/, '_')

FIRST_ARG = ARGSTRING.first # peut-être nul
