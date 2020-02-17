#!/usr/bin/env ruby
# encoding: UTF-8
=begin

  Ce script permet de définir des valeurs, à commencer par la
  langue, pour laquelle il a été créé

      > mus set lang=fr

=end
DPROPERTIES = {
  'lang'    => {id: 'lang',   value: nil, default: 'en'},
  'editor'  => {id: 'editor', value: nil, default: 'TextEdit'}
}
PROPS_BY_LANG = {
  'langue'  =>  'lang',
  'éditeur' =>  'editor'
}

# Définition de la langue, pour ruby et pour javascript
def set_lang data_prop
  # On vérifie que la langue existe
  lang_folder_path = File.join(APPFOLDER,'xlib','locales', data_prop[:value])
  File.exist?(lang_folder_path) || begin
    puts t('unknown-lang', {lang: data_prop[:value]})
    return
  end
  File.open(LANG_FILE,'wb'){|f| f.write(data_prop[:value])}
  # On charge tout de suite
  require File.join(lang_folder_path,'locales')
  # On change pour l'interface et l'application
  File.open(LANG_JS_FILE,'wb'){|f| f.write("OPTIONS.lang.value='#{data_prop[:value]}';")}
  puts t('lang-successfully-defined').vert
end

# Pour définir l'éditeur
def set_editor data_prop
  INFOS[:updated_at] = Time.now.to_i
  INFOS[:editor] = data_prop[:value]
  File.open(INFOS_FILE,'wb'){|f| f.write(<<-EOF)}
# MuScaT Infos
# encoding: UTF-8
INFOS = #{INFOS.inspect}
  EOF
  puts t('editor-successfully-defined').vert
end

unless ARGV.include?('-h') || ARGV.include?('--help') || ARGV.empty?
  begin

    ARGV.each do |paire|
      prop, value = paire.split('=')
      value ||= true
      prop = PROPS_BY_LANG[prop] || prop
      dprop = DPROPERTIES[prop] || begin
        puts t('unknown-property', {prop: prop}).rouge
        next
      end
      self.send("set_#{prop}".to_sym, dprop.merge(value: value))
    end

  rescue Exception => e
    unless e.message.empty?
      puts t('fatal-error', {err_msg: e.message, command: 'set'}).blanc_sur_fond_rouge
    end
  end
else
  puts_help('set')
end
