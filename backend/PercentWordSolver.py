import string
from WordProcessor import count_words_in_file
from WordProcessor import return_words_in_file


# Specify the path to your .txt file
filename = "words.txt"

def print_number_of_words():
    # Call the function and print the result
    word_count = count_words_in_file(filename)
    print(f"Number of words in '{filename}': {word_count}")

# ---------------------------------------

# Create a dictionary with every letter mapped to a uniform probability
alphabet_prob = {letter: 0.0 for letter in string.ascii_lowercase}

# Create five separate dictionaries (one for each letter position in a five-letter word)
slot0 = alphabet_prob.copy()
slot1 = alphabet_prob.copy()
slot2 = alphabet_prob.copy()
slot3 = alphabet_prob.copy()
slot4 = alphabet_prob.copy()

letter_occurences = [slot0, slot1, slot2, slot3, slot4]
wordCount = 0

def init_occurences_for_slots():
    global wordCount
    words = return_words_in_file(filename)
    for word in words:
        wordCount += 1
        characters = list(word.lower())
        for  i in range(5):
            letter_occurences[i][characters[i]] += 1

    return letter_occurences

def printLetterSlots():
    for i in range(5):
        print(f"<-------------- Slot {i+1} -------------->")
        for letter, occurences in sorted(letter_occurences[i].items()):
            print(f"{letter}: {occurences}")


def printProbabilitiesForSlots():
    for i in range(5):
        print(f"<-------------- Slot {i+1} -------------->")
        for letter, occurences in sorted(letter_occurences[i].items()):
                print(f"{letter}: {occurences/wordCount *100:.2f}")


def main():
    init_occurences_for_slots()
    printProbabilitiesForSlots()

#main()