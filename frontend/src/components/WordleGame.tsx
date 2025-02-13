import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import TopMenuBar from './menu/TopMenuBar';
import WordLine from './WordLine';
import '../style/Start.css';
import { checkSolution, resetGame } from './service';
import { CheckSolutionResponse, gameEndState, LetterInfo, LineInfo } from '../types';
import { v4 as uuidv4 } from 'uuid';
import Title from './Title';
import { darkerBlue, lightBlack } from '../variables/colors';


const WordleGame: React.FC = () => {
  const initLine: LetterInfo[] = [
    { letter: '', correctLetter: false, correctPosition: false },
    { letter: '', correctLetter: false, correctPosition: false },
    { letter: '', correctLetter: false, correctPosition: false },
    { letter: '', correctLetter: false, correctPosition: false },
    { letter: '', correctLetter: false, correctPosition: false }
  ];

  const initLineInfo: LineInfo[] = [{
    letters: initLine,
    disabled: false,
  }]

  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameSuccess, setGameSuccess] = useState<boolean>(false);
  const [wordLines, setWordLines] = useState<LineInfo[]>([{letters: initLine, disabled: false}]);
  
  const maxAttempts: number = 6;

  const handleCheckSolution = async (lineIndex: number, solution: string): Promise<gameEndState> =>  {
    const res: CheckSolutionResponse = await checkSolution(solution);
    let gameOver = false;
    let gameSuccess = false;
  
    setWordLines(prevWordLines => {
      const updatedWordLines = [...prevWordLines];
      const currentLine = updatedWordLines[lineIndex];
  
      currentLine.letters = currentLine.letters.map((letterInfo, index) => {
        let isCorrectPosition: boolean;
        let isCorrectLetter: boolean;
        if (res.is_correct) {
          gameSuccess = true;
          isCorrectPosition = true;
          isCorrectLetter = true;
        }
        else {
          if (maxAttemptsReached(wordLines.length)) {
            gameOver = true
          }
          isCorrectPosition = res.correct_positions.some(([letter, pos]) => letter === letterInfo.letter && pos === index);
          isCorrectLetter = res.correct_letters.includes(letterInfo.letter) && !isCorrectPosition;
        }
  
        return {
          ...letterInfo,
          correctPosition: isCorrectPosition,
          correctLetter: isCorrectLetter
        };
      });
  
      
      updatedWordLines[lineIndex] = currentLine;
      return updatedWordLines;
    });


    return {gameOver, gameSuccess}

  };

  const handleOnEnter = (lineIndex: number, lineInfo: LineInfo) => {
    const allValid = lineInfo.letters.every((item) => /^[a-zA-Z]$/.test(item.letter));
    if (allValid) {
      const endGameResult = handleCheckSolution(lineIndex, lineInfo.letters.map(letterInfo => letterInfo.letter).join('')).then(data => {
        console.log(data);
        if (data.gameSuccess) {
          console.log("Lose.");
        } else if (data.gameOver) {
          console.log("WIN!!");
        } else {
          createNewGameLine();
        }
      })
      disableCurrentLine(lineIndex, lineInfo);
    
    }
  };

  const endGame = () => {
    if (gameOver) {
      gameFailed();
    }
    else if (gameSuccess) {
      gameWon();
    }
  }

  const maxAttemptsReached = (attempts: number) => {
    return attempts >= maxAttempts
  }

  const disableCurrentLine = (lineIndex: number, lineInfo: LineInfo) => {
    lineInfo.disabled = true;
    setWordLines(prevWordLines => 
      prevWordLines.map((line, index) => (index === lineIndex ? lineInfo : line))
    )
  }

  const createNewGameLine = () => {
    const newLineInfo: LineInfo = {
      letters: initLine.map(letter => ({ ...letter })),
      disabled: false,
    };
    setWordLines(prevWordLines => [...prevWordLines, newLineInfo]);
  }

  const gameWon = () => {
    setGameSuccess(true);
    if (gameSuccess) {
      console.log("WIN.");
    }
    
  }

  const gameFailed = () => {
    setGameOver(true);
    if (gameSuccess) {
      console.log("Lose.");
    }
  }


  const handleResetGame = async () => {
    const res = await resetGame();
    console.log(res.message);
    setWordLines(initLineInfo);  
    setGameOver(false);
    setGameSuccess(false);
  }



  return (
    <div className="startPage">
      <TopMenuBar />
      <Container maxWidth="xl">
        
          <Title title={'Wordle'}/>

          {wordLines.map((line, lineIndex) => (
            <WordLine
              key={uuidv4()}
              lineInfo={line}
              onEnter={(lineInfo: LineInfo) => handleOnEnter(lineIndex, lineInfo)}
            />
          ))}

          <Box textAlign="center" mt={8} mb={8}>
            {(gameOver || gameSuccess) &&
            <Button variant={'contained'} sx={{backgroundColor: lightBlack, color: 'white'}} onClick={() => handleResetGame()}>
              {'Play again'}
            </Button>}
          </Box>

      </Container>
    </div>
  );
};

export default WordleGame;