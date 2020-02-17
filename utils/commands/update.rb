#!/usr/bin/env ruby
# encoding: UTF-8
=begin
  Script pour renommer les fichiers du dossier donné en argument.
=end

WHAT = FIRST_ARG

unless OPTIONS[:help] || WHAT.nil?
  begin
    case WHAT
    when 'options'
      Options.update_js_file
    when 'manuel', 'manual'
      folder_manual = case LANG
      when 'fr' then File.join(APPFOLDER,'Manuel')
      else File.join(LOCALES_FOLDER,'Manual')
      end
      affixe = case LANG
      when 'fr' then 'manuel'
      else 'manual'
      end
      affixe_tit = affixe
      affixe_tit[0] = affixe_tit[0].upcase
      pdf_pth = File.join(folder_manual,'Manuel.pdf')

      Dir.chdir(folder_manual) do
        `pandoc -s #{affixe_tit}.md --css="manuel.css" --metadata pagetitle="#{affixe_tit}" --from=markdown --output=#{affixe_tit}.html;open #{affixe_tit}.html;`
      end
      # Pour ne pas avoir à confirmer la commande "Remplacer", on détruit le
      # fichier original (note : le pdf est fait après cette ligne car
      # ci-dessus, c'est seulement le html qui est produit)
      File.unlink(pdf_pth) if File.exist?(pdf_pth)
      puts t('export-to-pdf').vert
    end
  rescue Exception => e
    unless e.message.empty?
      puts t('fatal-error', {err_msg: e.message, command: 'update'}).blanc_sur_fond_rouge
    end
  end

else

  puts_help('update')

end #/if (help)
