#!/usr/bin/env ruby
# encoding: UTF-8
=begin

  Ce script permet d'être utilisé pour faire un alias dans son profil bash
  pour pouvoir utiliser une commande comme :

      > mus create "Ma nouvelle analyse"

=end
require_relative 'lib/required'



begin
  if !COMMAND || COMMAND == 'help'
    # Afficher l'aide
    # puts "\033c"
    puts_help('run')
  else
    COMMAND_PATH = File.join(COMMANDS_FOLDER, "#{COMMAND}.rb")
    if File.exist?(COMMAND_PATH)
      # C'est bon, on peut le faire
      # On se place toujours dans l'application
      Dir.chdir(APPFOLDER) do
        # require_relative COMMAND
        require COMMAND_PATH
      end
    else
      puts (RC*2 + t('unknown-command', {command: COMMAND}) + RC*2).rouge
    end
  end
rescue Exception => e
  puts e.message
  puts e.backtrace.join(RC)
end
