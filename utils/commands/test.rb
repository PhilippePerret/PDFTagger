#!/usr/bin/env ruby
# encoding: UTF-8
=begin
  Pour lancer les tests :

    - Se rendre dans ce dossier `utils`
    - jouer `test.rb` ou `test.rb chemin/vers/test/depuis/tests`
    - voir dans Firefox les résultats obtenus en console.

=end

begin
  # Inscription de tous les fichiers de tests (système et tests) dans
  # le corps de TABLE_ANALYSE.html (renommé 'test.html')
  TEST_FILE_PATH  = File.join(APPFOLDER,'test.html')
  FOLDER_TESTS    = File.join(APPFOLDER,'xlib','tests')

  # On récupère tous les fichiers js système
  all_js_tags = Dir["#{FOLDER_TESTS}/system/**/*.js"].collect do |pth|
    '<script type="text/javascript" src="%s"></script>' % [pth.sub(/^#{APPFOLDER}\//,'')]
  end
  # On récupère les feuilles de tests
  paths_tests = nil
  if ARGV.first && !ARGV.first.start_with?('-')
    # <= Un argument a été donné
    # => C'est le test ou le dossier de tests qu'il faut jouer
    path_test = File.join(FOLDER_TESTS,'tests', ARGV.first)
    if File.exist?(path_test) && File.directory?(path_test)
      # <= Un dossier a été transmis
      # => Il faut jouer tous les tests qu'il contient
      paths_tests = Dir["#{path_test}/**/*.js"].shuffle
    else
      path_test_file = path_test
      path_test_file.concat('.js') unless path_test.end_with?('.js')
      if File.exist?(path_test_file)
        paths_tests = [path_test_file]
      else
        raise "Test file is unfoundable (#{ARGV.first.inspect})"
      end
    end
  end
  paths_tests ||= Dir["#{FOLDER_TESTS}/tests/**/*.js"].shuffle

  # On construit les balises script qui vont charger les tests
  # On passe le dossier 'offtests'
  all_js_tags += paths_tests.collect do |pth|
    next if pth.match(/\/offtests\//)
    '<script type="text/javascript" src="%s"></script>' % [pth.sub(/^#{APPFOLDER}\//,'')]
  end.compact

  # puts all_js_tags.join("\n")

  FileUtils.copy(PARTITION_PATH, TEST_FILE_PATH)
  code = File.read(TEST_FILE_PATH)
  code = code.sub(/<\!-- TESTS -->/, all_js_tags.join(RC))
  code = code.sub(/<\/title>/, '- TESTS</title>')
  File.open(TEST_FILE_PATH,'wb'){|f|f.write code}

  # Ouverture du fichier test.html pour lancer le test
  if ARGV.include?('-o') || ARGV.include?('--open')
    # `open -a Firefox "#{TEST_FILE_PATH}"`
    `open -a "Google Chrome" "#{TEST_FILE_PATH}"`
  else
    puts '
  Add `-o` option (at the end) to open a first time
  the file in Chrome (and check the console).'.vert
  end

  puts '
  You can now modify the test (the javascript file) in order to
  develop it, and relaunch the page pour run it.

  '.vert


rescue Exception => e
  puts "\n\n  #{e.message.rouge}\n\n"
end
