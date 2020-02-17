# encoding: UTF-8

INDENT = '  '

RC = '
'

APPFOLDER       = File.expand_path(File.dirname(File.dirname(File.dirname(__dir__))))
INDEX_PATH      = File.join(APPFOLDER,'index.html')

UTILS_FOLDER    = File.join(APPFOLDER,'utils')
LIB_FOLDER      = File.join(UTILS_FOLDER, 'lib')
COMMANDS_FOLDER = File.join(UTILS_FOLDER, 'commands')

JS_FOLDER       = File.join(APPFOLDER,'xlib','js')

INFOS_FILE      = File.join(APPFOLDER,'xlib','infos.rb')
LANG_FILE       = File.join(APPFOLDER,'xlib','locales','LANG')
LANG_JS_FILE    = File.join(JS_FOLDER,'system','LANG.js')
LANG            = File.exist?(LANG_FILE) ? File.read(LANG_FILE).strip : 'en'
# puts "Langue: #{LANG}"
LOCALES_FOLDER    = File.join(APPFOLDER,'xlib','locales', LANG)

LOCALES_EN_FOLDER = File.join(APPFOLDER,'xlib','locales','en')

REQUIRED_FIRST_FOLDER = File.join(LIB_FOLDER,'required','first')
REQUIRED_THEN_FOLDER = File.join(LIB_FOLDER,'required','then')
