# encoding: UTF-8
TAGS =  if File.exists?(TAGS_PATH)
          JSON.parse(File.read(TAGS_PATH).force_encoding('utf-8'))
        else
          {}
        end
