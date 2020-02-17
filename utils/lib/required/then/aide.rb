# encoding: UTF-8
def puts_help cmd_id
  pth = File.join(LOCALES_FOLDER,'command_helps',"#{cmd_id}.txt")
  File.exist?(pth) || pth = File.join(LOCALES_EN_FOLDER,'command_helps',"#{cmd_id}.txt")
  puts RC*4
  puts "#{"="*40} #{t('title-help')} #{'='*40}"
  puts RC*2
  puts "= #{t('command').upcase} #{cmd_id.to_s.jaune}"
  puts RC*2
  # On évalue les textes entre '#{...}'
  text = File.read(pth).force_encoding('utf-8')
  text.gsub!(/#\{(.+?)\}/){
    eval($1)
  }
  puts INDENT + text.split(RC).join(RC + INDENT)
  puts RC*3
end
