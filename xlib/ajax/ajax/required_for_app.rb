# encoding: UTF-8

DOC_FOLDER_PATH = File.join(APPFOLDER,'__DOC__')
`mkdir -p "#{DOC_FOLDER_PATH}"`
TAGS_PATH = File.join(DOC_FOLDER_PATH, 'comments.js')
TAGS_BACKUPS_FOLDER = File.join(DOC_FOLDER_PATH, 'xbackups')
`mkdir -p "#{TAGS_BACKUPS_FOLDER}"`
