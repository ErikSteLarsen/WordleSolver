from flask import Flask, jsonify, request
from flask_cors import CORS

import WordProcessor
from WordleGame import WordleGameInstance

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Initialize the game instance with a list of words
available_words = WordProcessor.return_words_in_file("words.txt")
game = WordleGameInstance(available_words)

@app.route('/')
def home():
    return "Wordle Solver API"

@app.route('/api/data')
def test():
    return "Wordle Solver API"


@app.route('/exclude_letter', methods=['POST'])
def exclude_letter():
    data = request.json
    letter = data.get('letter')
    game.remaining_words = game.exclude_letter(letter)
    return jsonify({"remaining_words": game.remaining_words, "excluded_letters": game.excluded_letters})

@app.route('/include_letter', methods=['POST'])
def include_letter():
    data = request.json
    letter = data.get('letter')
    game.remaining_words = game.include_letter(letter)
    return jsonify({"remaining_words": game.remaining_words, "included_letters": game.included_letters})

@app.route('/exclude_letter_at_position', methods=['POST'])
def exclude_letter_at_position():
    data = request.json
    letter = data.get('letter')
    pos = data.get('position')
    game.remaining_words = game.exclude_letter_at_position(letter, pos)
    return jsonify({"remaining_words": game.remaining_words})

@app.route('/include_letter_at_position', methods=['POST'])
def include_letter_at_position():
    data = request.json
    letter = data.get('letter')
    pos = data.get('position')
    game.remaining_words = game.include_letter_at_position(letter, pos)
    return jsonify({"remaining_words": game.remaining_words, "solution_word": game.solution_word})




if __name__ == "__main__":
    app.run(debug=True)