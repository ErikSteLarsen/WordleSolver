# Function to count words in a .txt file
def count_words_in_file(filename):
    try:
        with open(filename, 'r') as file:
            # Read the content of the file
            text = file.read()

            # Split the text into words based on whitespace
            words = text.split()

            # Count the number of words
            word_count = len(words)

            return word_count

    except FileNotFoundError:
        print(f"The file {filename} does not exist.")
        return 0

def return_words_in_file(filename):
    try:
        with open(filename, 'r') as file:
            # Read the content of the file
            text = file.read()

            # Split the text into words based on whitespace
            words = text.split()

            return words

    except FileNotFoundError:
        print(f"The file {filename} does not exist.")
        return 0