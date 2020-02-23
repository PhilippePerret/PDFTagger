# encoding: UTF-8
PREFS = if File.exists?(PREFS_PATH)
          JSON.parse(File.read(PREFS_PATH).force_encoding('utf-8'))
        else
          {}
        end
