# encoding: UTF-8


class String
  # Pour utiliser des choses comme 'Mon texte en jaune'.jaune
def jaune
  "\033[0;93m#{self}\033[0m"
end
def vert
  "\033[0;92m#{self}\033[0m"
end
def mauve
  "\033[0;94m#{self}\033[0m"
end
def rouge
  "\033[0;31m#{self}\033[0m"
end
def rouge_vif
  "\033[0;91m#{self}\033[0m"
end
def blanc_sur_fond_rouge
  "\033[0;41m#{self}\033[0m"
end
def gris
  "\033[0;90m#{self}\033[0m"
end
def essai
  (1..100).each do |i|
    puts "\033[0;#{i}m#{i}: #{self}\033[0m"
  end
end
end
