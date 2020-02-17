# encoding: UTF-8
require 'fileutils'

# Le dossier de l'application
# ---------------------------
# Contient quelque chose comme '/Users/moi/Sites/MonApplication'
#
APP_FOLDER = File.dirname(File.dirname(File.dirname(File.dirname(__FILE__))))
APPFOLDER = APP_FOLDER

require_relative './ajax_class'
require_relative './required_for_app'
