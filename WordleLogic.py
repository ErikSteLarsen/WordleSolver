import PercentWordSolver
import WordProcessor
import pprint



def main():
    print("Welcome to this epic wordle solver!")

    while True:
        word = input("Enter a 5-letter word: ")
        if len(word) == 5:
           break  # Exit the loop if the length is correct
        print("Invalid input. Please enter exactly 5 letters.")

        print("You entered:", word)
    
    word = word.lower()
    


main()




