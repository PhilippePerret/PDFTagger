# frozen_string_literal:true
# encoding: UTF-8
require 'json'
require 'io/console'
require 'fileutils'

# Requérir ce module utilisé par les suivants
require_relative 'required/first/String_helpers'

# Requérir d'abord toutes les constantes
require_relative 'required/constants'

# Requérir tous les modules du fichier required
Dir["#{REQUIRED_FIRST_FOLDER}/**/*.rb"].each{|m|require m}
Dir["#{REQUIRED_THEN_FOLDER}/**/*.rb"].each{|m|require m}
