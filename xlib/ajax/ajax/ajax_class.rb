# encoding: UTF-8
require 'cgi'
require 'json'

class Ajax
  class << self

    def treate_request
      STDOUT.write "Content-type: application/json; charset:utf-8;\n\n"


      # Le script doit exister
      script_fullpath = File.expand_path(File.join('.','ajax','_scripts',script))
      self << {
        script_fullpath: script_fullpath
      }

      if File.exists?(script_fullpath)
        # Jouer le script
        self << {
          OK: "Le script '#{script_fullpath}' existe."
        }
        begin
          require_relative "./_scripts/#{script}"
        rescue Exception => e
          raise e # pour le moment
        end
      else
        self << {
          error: "Le script '#{script_fullpath}' est introuvable. Je ne peux pas le jouer."
        }
      end

      # On ajoute au retour, le script joué et les clés envoyés en
      # paramètres CGI
      self << {
        'ran_script': script,
        'transmited_keys': cgi.params.keys.join(', '),
        'APP_FOLDER': APP_FOLDER
      }
      # Débug : pour voir ce que reçoit
      # self << {
      #   # params: cgi.params.inspect,
      #   script: script,
      #   args: args,
      #   message: message
      # }
      STDOUT.write data.to_json+"\n"
    rescue Exception => e
      error = Hash.new
      error.merge!(error: Hash.new)
      error[:error].merge!(message: e.message)
      error[:error].merge!(backtrace: e.backtrace)
      STDOUT.write error.to_json
    end

    # Pour ajouter des données à renvoyer
    # Utiliser : Ajax << {ma: "data"}
    def << hashdata
      @data ||= {}
      @data.merge!(hashdata)
    end

    # Retourne l'argument de clé +key+
    def arg key
      args[key.to_s]
    end

    # ---------------------------------------------------------------------
    def data
      @data ||= {}
    end
    def script
      @script ||= begin
        s = cgi.params['script'][0]
        s.end_with?('.rb') || s.concat('.rb')
        s
      end
    end

    def args
      @args ||= JSON.parse(cgi.params['args'][0])
    end

    def cgi
      @cgi ||= CGI.new('html4')
    end

  end #/ << self
end
