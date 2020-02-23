# encoding: UTF-8
=begin
  Script pour épurer les fichiers backups
  i.e. supprimer les plus anciens
  n'en garder qu'une dizaine
=end
NOW = Time.now.to_i
dixJours = 10 * 24 * 3600
Dir["#{TAGS_BACKUPS_FOLDER}/*.json"].each do |pth|
  time = File.basename(pth).split('-')[1].to_i
  File.unlink(pth) if ( NOW - time > dixJours )
end
