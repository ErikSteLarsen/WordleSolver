from flask import Flask, jsonify, request
from flask_cors import CORS

import WordProcessor
from WordleGameSolver import WordleSolverInstance
from WordleGame import WordleGameInstance

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Initialize the game instance with a list of words
available_words = WordProcessor.return_words_in_file("words.txt")
gameSolver = WordleSolverInstance(available_words)
game = WordleGameInstance(available_words)

@app.route('/')
def home():
    return "Wordle API"

@app.route('/exclude_letter', methods=['POST'])
def exclude_letter():
    data = request.json
    letter = data.get('letter')
    gameSolver.remaining_words = gameSolver.exclude_letter(letter)
    return jsonify({"remaining_words": gameSolver.remaining_words, "excluded_letters": gameSolver.excluded_letters})

@app.route('/include_letter', methods=['POST'])
def include_letter():
    data = request.json
    letter = data.get('letter')
    gameSolver.remaining_words = gameSolver.include_letter(letter)
    return jsonify({"remaining_words": gameSolver.remaining_words, "included_letters": gameSolver.included_letters})

@app.route('/exclude_letter_at_position', methods=['POST'])
def exclude_letter_at_position():
    data = request.json
    letter = data.get('letter')
    pos = data.get('position')
    gameSolver.remaining_words = gameSolver.exclude_letter_at_position(letter, pos)
    return jsonify({"remaining_words": gameSolver.remaining_words})

@app.route('/include_letter_at_position', methods=['POST'])
def include_letter_at_position():
    data = request.json
    letter = data.get('letter')
    pos = data.get('position')
    gameSolver.remaining_words = gameSolver.include_letter_at_position(letter, pos)
    return jsonify({"remaining_words": gameSolver.remaining_words, "solution_word": gameSolver.solution_word})


@app.route('/check_solution', methods=['POST'])
def check_solution():
    data = request.json
    suggested_solution = data.get('solution')
    
    if suggested_solution:
        is_correct, correct_letters, correct_positions = game.check_solution(suggested_solution)
        return jsonify({
            "is_correct": is_correct,
            "correct_letters": correct_letters,
            "correct_positions": correct_positions
        })
    else:
        return jsonify({"error": "No solution provided"}), 400
    

@app.route('/reset_game', methods=['POST'])
def reset_game():
    global game
    available_words = WordProcessor.return_words_in_file("words.txt")
    game = WordleGameInstance(available_words)
    return jsonify({"message": "Game has been reset."})



if __name__ == "__main__":
    app.run(debug=True)