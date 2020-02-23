# encoding: UTF-8
=begin
  Pour enregistrer les préférences
=end
shortcuts = Ajax.arg(:shortcuts)

require_relative 'loadPrefs.rb' # => PREFS

PREFS.merge!(shortcuts: shortcuts)

File.open(PREFS_PATH,'wb'){|f| f.write PREFS.to_json}
