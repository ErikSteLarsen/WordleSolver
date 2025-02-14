export type LetterInfo = {
  letter: string;
  correctLetter: boolean;
  correctPosition: boolean;
}

export type LineInfo = {
  letters: LetterInfo[];
  disabled: boolean;
}

export type CorrectPosition = [string, number];

export interface CheckSolutionResponse {
    is_correct: boolean;
    correct_letters: string[];
    correct_positions: CorrectPosition[];
  }

export type GameEndState = {
    gameOver: boolean;
    gameSuccess: boolean;
} | null