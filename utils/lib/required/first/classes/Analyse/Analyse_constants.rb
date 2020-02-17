# encoding: UTF-8

=begin

  Liste des options réglables pour l'analyse

  Ce fichier permet :

    a) de régler les options en ligne de commandes, à l'aide de la
        commande 'options'
    b) de produire le fichier 'Options_data.js' utilisé par l'application

Note : `user_name` permet de garder la trace du nom de l'option que l'user
a employée, en cas de "aka" pour lui redonner la même.

Si une option est ajoutée
-------------------------
  - ajouter sa description courte dans les locales, dans la partie
    définissant les autres options (s'inspirer du nom)

  - jouer 'mus update options' pour actualiser le fichier javascript

  - il n'y a rien à faire pour les options en javascript puisque le
    fichier Options_data.js sera actualisé.

=end
DEFAULT_SCORE_LEFT_MARGIN = 50
DEFAULT_SCORE_TOP_MARGIN  = 100
DEFAULT_SCORES_SPACES     = 50    # espace entre les images de système

ANALYSIS_OPTIONS = {
  'animation-speed' =>              {boolean: false, type: :integer, max:100, min:1, default: 50, user_name: nil},
  'auto-save' =>                    {boolean: true, default: true, type: :boolean},
  'crop-image' =>                   {boolean: true, aka:['découpe-image'], type: :boolean},
  'images-PNG' =>                   {boolean: true, type: :boolean}, # true si on veut des noms de fichier ne png (pour convert par exemple)
  'coordonates' =>                  {boolean: true, type: :boolean}, # afficher les coordonnées lors des déplacementss
  'lang' =>                         {boolean: false, type: :string, length:2, default: 'fr', aka:['langue','language','langage']},
  'lines-of-reference' =>           {boolean: true, type: :boolean, aka:['repères','reperes','guides']},
  'horizontal-line-offset' =>       {boolean: false, type: :integer, default: 46, aka:'position-repère-horizontal'},
  'vertical-line-offset' =>         {boolean: false, type: :integer, default: 42, aka:'position-repère-vertical'},
  'space-between-scores' =>         {boolean: false, type: :integer, default: DEFAULT_SCORES_SPACES, aka:'espacement-images'},
  'top-first-score' =>              {boolean: false, type: :integer, aka:'marge-haut', default:DEFAULT_SCORE_TOP_MARGIN},
  'left-margin' =>                  {boolean: false, type: :integer, aka:'marge-gauche', default:DEFAULT_SCORE_LEFT_MARGIN},
  'theme' =>                        {boolean: false, type: :string},
  'visor' =>                        {boolean: true, type: :boolean, default: false, aka:['viseur']},
  # TOUTES LES DIMENSIONS
  'cadence-size' =>                 {boolean: false, type: :integer},
  'chord-size' =>                   {boolean: false, type: :integer},
  'harmony-size' =>                 {boolean: false, type: :integer, aka:['harmonie-size', 'dimension-harmonie']},
  'measure-size' =>                 {boolean: false, type: :integer, aka:['mesure-size', 'dimension-mesure', 'dimension-mesures']},
  'modulation-size' =>              {boolean: false, type: :integer, aka:['dimension-modulation','dimension-modulations']},
  'degree-size' =>                  {boolean: false, type: :integer, aka:['degre-size','dimension-degre','dimension-degres']},
  'part-size' =>                    {boolean: false, type: :integer, aka:['dimension-partie','dimension-parties']},
  'text-size' =>                    {boolean: false, type: :integer, aka:['dimension-texte','dimension-textes']},
  'rectangle-selection' =>          {boolean: true, type: :boolean, default: false},
  'shuffle-tests' =>                {boolean: true, type: :boolean, default: true}
}

class Options
class << self
  def js_outofdate?
    File.stat(js_path).mtime > File.stat(rb_path).mtime
  end

  # Méthode pour actualiser le fichier Options_data.js
  def update_js_file
    code = []
    code << "'use strict';"
    code << "/*==================================================================="
    code << " * === NE PAS TOUCHER DIRECTEMENT ===                               *"
    code << " * Modifier le fichier :                                            *"
    code << " * ./utils/lib/required/first/classes/Analyse/Analyse_constants.rb  *"
    code << " * puis jouer 'mus update options'                                  *"
    code << " *================================================================= */"
    code << "const DEFAULT_SCORE_LEFT_MARGIN = #{DEFAULT_SCORE_LEFT_MARGIN};"
    code << "const DEFAULT_SCORE_TOP_MARGIN = #{DEFAULT_SCORE_TOP_MARGIN};"
    code << "const DEFAULT_SCORES_SPACES = #{DEFAULT_SCORES_SPACES};"
    code << ""
    code << "const OPTIONS = {"
    code << "  'option': {'prop': value, 'prop': value}"
    ANALYSIS_OPTIONS.each do |key, data|
      data.merge!(value: nil)
      aka = data.delete(:aka)
      code << ", '#{key}': #{data.to_json}"
      if aka
        aka.instance_of?(Array) || aka = [aka]
        aka.each do |aka_key|
          code << ",     '#{aka_key}': {aka: '#{key}'}"
        end
      end
    end
    code << "}"
    code = code.join(RC)
    puts "\n\n\n#{code}\n\n\n"
    File.open(js_path, 'wb'){|f| f.write code}
    puts "Fichier Options_data.js actualisé".vert
  end

  def js_path
    @js_path ||= File.join(JS_FOLDER,'Options_data.js')
  end
  def rb_path
    @rb_path ||= File.expand_path(__FILE__)
  end
end #/ << self
end #/ Options
