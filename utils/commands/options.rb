# encoding: UTF-8
=begin

  Commande qui gère les options de l'analyse choisie

=end
WIDTH_OPTION_KEY = 24

unless OPTIONS[:help]

  begin

  rescue Exception => e
    unless e.message.empty?
      puts t('fatal-error', {err_msg: e.message, command: 'set'}).blanc_sur_fond_rouge
    end
  end

else
  puts_help('options')
end #/if (help)

if $0 == __FILE__
  puts "C'est ce fichier qui est joué"
end
