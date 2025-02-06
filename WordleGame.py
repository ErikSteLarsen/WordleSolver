import PercentWordSolver
import WordProcessor
import pprint


class WordleGameInstance:
    def __init__(self, start_words):
        self.remaining_words = start_words
        self.current_row = 0
        self.excluded_letters = []
        self.included_letters = []
        self.solution_word = ['_' for i in range(5)]

    def exclude_letter(self, letter):
        updated_words = []
        for word in self.remaining_words:
            if letter not in word:
                updated_words.append(word)

        self.excluded_letters.append(letter)
        return updated_words

    def exclude_letter_at_position(self, letter, pos):
        updated_words = []
        if (pos >= 0 and pos < 5):
            for word in self.remaining_words:
                if list(word.lower())[pos] != letter.lower():
                    updated_words.append(word)
        return updated_words

    def include_letter(self, letter):
        updated_words = []
        for word in self.remaining_words:
            if letter in word:
                updated_words.append(word)

        self.included_letters.append(letter)
        return updated_words

    def include_letter_at_position(self, letter, pos):
        updated_words = []
        if (pos >= 0 and pos < 5):
            for word in self.remaining_words:
                if list(word.lower())[pos] == letter.lower():
                    updated_words.append(word)

        self.included_letters.append(letter)
        self.solution_word[pos] = letter
        print(self.solution_word)
        return updated_words

    #def reinclude_letter(self, letter, excluded_letters):
    #    if letter in excluded_letters:
    #        excluded_letters.remove(letter)
    #    return [word for word in self.remaining_words if letter in word]

    #def reinclude_letter_at_position(self, letter, pos, excluded_letters):
    #    if (letter, pos) in excluded_letters:
    #        excluded_letters.remove((letter, pos))
    #    return [word for word in self.remaining_words if list(word.lower())[pos] == letter.lower()]

    def calculate_remaining_words(self, color, prev_color, char, col):
        remaining_words = ["Some error has occured."]
        if prev_color == "white":
            if (color == "green"):
                self.remaining_words = self.include_letter_at_position(char, col)
            elif (color == "yellow"):
                self.remaining_words = self.include_letter(char)
                self.remaining_words = self.exclude_letter_at_position(char, col)
            elif (color == "gray"):
                self.remaining_words = self.exclude_letter(char)
            else:
                self.remaining_words = remaining_words
        else:
            self.remaining_words = remaining_words

        # elif prev_color == "gray" and color == "yellow":
            
        # elif prev_color == "yellow" and color == "green":

        # elif prev_color == "green" and color == "yellow":

        #elif prev_color == 
    # LAG EN RESET KNAPP I STEDET FOR, CURRENT ROW RESET. IKKE TIDLIGERE ROWS. SAMME BOKSTAV SOM RADEN OVER FÅR AUTOMATISK FARGEN DEN HAR OVER.


    