import PercentWordSolver
import WordProcessor
import pprint

class WordleLogic:
    def exclude_letter(words, letter):
        updated_words = []
        for word in words:
            if letter not in word:
                updated_words.append(word)
        return updated_words

    def exclude_letter_at_position(words, letter, pos):
        updated_words = []
        if (pos >= 0 and pos < 5):
            for word in words:
                if list(word.lower())[pos] != letter.lower():
                    updated_words.append(word)
        return updated_words

    def include_letter(words, letter):
        updated_words = []
        for word in words:
            if letter in word:
                updated_words.append(word)
        return updated_words

    def include_letter_at_position(words, letter, pos):
        updated_words = []
        if (pos >= 0 and pos < 5):
            for word in words:
                if list(word.lower())[pos] == letter.lower():
                    updated_words.append(word)
        return updated_words
    
    def reinclude_letter(words, letter, excluded_letters):
        if letter in excluded_letters:
            excluded_letters.remove(letter)
        return [word for word in words if letter in word]

    def reinclude_letter_at_position(words, letter, pos, excluded_letters):
        if (letter, pos) in excluded_letters:
            excluded_letters.remove((letter, pos))
        return [word for word in words if list(word.lower())[pos] == letter.lower()]


    def test(color, prev_color, words, char, col):
        remaining_words = words

        if prev_color == "white":
            if (color == "green"):
                remaining_words = include_letter_at_position(words, char, col)
            elif (color == "yellow"):
                remaining_words = include_letter(words, char)
                remaining_words = exclude_letter_at_position(words, char, col)
            elif (color == "gray"):
                remaining_words = exclude_letter(words, char)
        elif prev_color == "gray" and color == "yellow":
            
        elif prev_color == "yellow" and color == "green":

        elif prev_color == "green" and color == "yellow":

        elif prev_color == 
 // LAG EN RESET KNAPP I STEDET FOR, CURRENT ROW RESET. IKKE TIDLIGERE ROWS. SAMME BOKSTAV SOM RADEN OVER FÅR AUTOMATISK FARGEN DEN HAR OVER.


        return remaining_words