export const returnWordsInFile = async (filename) => {
    try {
        const response = await fetch(filename);
        const text = await response.text();
        return text.split(/\s+/);
    } catch (err) {
        console.error(`The file ${filename} does not exist.`);
        return [];
    }
};

export const pickRandomSolutionWord = (words) => {
    if (words.length > 0) {
        return words[Math.floor(Math.random() * words.length)];
    }
    return '';
};


export const resetGame = (words) => {
    return pickRandomSolutionWord(words);
};

export const checkSolution = (solution, solutionWord) => {
    const correctLetters = [];
    const correctPositions = [];

    if (solution === solutionWord) {
        return { isCorrect: true, correctLetters, correctPositions };
    }

    for (let i = 0; i < solution.length; i++) {
        if (solution[i] === solutionWord[i]) {
            correctPositions.push({ letter: solution[i], position: i });
        } else if (solutionWord.includes(solution[i])) {
            correctLetters.push(solution[i]);
        }
    }

    return { isCorrect: false, correctLetters, correctPositions };
};