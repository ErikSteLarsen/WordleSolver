import random
import PercentWordSolver
import WordProcessor
import pprint


class WordleGameInstance:
    def __init__(self, start_words):
        self.current_row = 0
        self.excluded_letters = []
        self.solved = False
        #self.solution_word = ['' for i in range(5)]
        self.solution_word = self.pick_random_solution_word(start_words)

    def pick_random_solution_word(self, words):
        if words:
            return random.choice(words)
        

    def check_solution(self, solution):
        print(self.solution_word)
        solution = solution.lower()
        correct_letters = []
        correct_positions = []

        if solution == ''.join(self.solution_word):
            return True, correct_letters, correct_positions

        for i, letter in enumerate(solution):
            if letter == self.solution_word[i]:
                correct_positions.append((letter, i))
            elif letter in self.solution_word:
                correct_letters.append(letter)

        return False, correct_letters, correct_positions