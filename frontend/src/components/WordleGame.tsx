import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import TopMenuBar from './menu/TopMenuBar';
import WordLine from './WordLine';
import '../style/Start.css';
import { CheckSolutionResponse, GameEndState, LetterInfo, LineInfo } from '../types';
import { v4 as uuidv4 } from 'uuid';
import Title from './Title';
import { darkerBlue, lightBlack } from '../variables/colors';
import { checkSolution, resetGame } from '../utils/wordleUtils';


const WordleGame: React.FC = () => {
  const [solution, setSolution] = useState<GameEndState>(null);

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

  const [wordLines, setWordLines] = useState<LineInfo[]>([{ letters: initLine, disabled: false }]);
  const [endGameResult, setEndGameResult] = useState<GameEndState>(null);


  useEffect(() => {
    //console.log("useEffect", endGameResult);
    if (endGameResult?.gameOver) {
      console.log("Lose.");
    } else if (endGameResult?.gameSuccess) {
      console.log("WIN!!");
    } else {
      if (wordLines.every(line => lineValid(line))) {
        createNewGameLine();
      }
    }
  }, [endGameResult]);

  const maxAttempts: number = 6;




  const handleCheckSolution = async (lineIndex: number, solution: string): Promise<GameEndState> => {
    //const res: CheckSolutionResponse = await checkSolution(solution); // Backend call
    const res: CheckSolutionResponse = checkSolution()
    let gameOver = false;
    let gameSuccess = false;

    setWordLines(prevWordLines => {
      const updatedWordLines = [...prevWordLines];
      const currentLine = updatedWordLines[lineIndex];

      console.log("currentline", currentLine);
      currentLine.letters = currentLine.letters.map((letterInfo, index) => {
        let isCorrectPosition: boolean;
        let isCorrectLetter: boolean;
        if (res.is_correct) {
          isCorrectPosition = true;
          isCorrectLetter = true;
        }
        else {
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

    if (res.is_correct) {
      gameSuccess = true;
      console.log("gameSuccess set")
    } else {
      if (maxAttemptsReached(wordLines.length)) {
        gameOver = true
        console.log("gameOver set")
      }
    }

    console.log("return handleCheckSolution", { gameOver, gameSuccess });
    return { gameOver, gameSuccess }
  };


  const lineValid = (lineInfo: LineInfo) => {
    return lineInfo.letters.every((item) => /^[a-zA-Z]$/.test(item.letter));
  }

  const handleOnEnter = (lineIndex: number, lineInfo: LineInfo) => {
    if (lineValid(lineInfo)) {
      //const endGameResult = handleCheckSolution(lineIndex, lineInfo.letters.map(letterInfo => letterInfo.letter).join(''));
      handleCheckSolution(lineIndex, lineInfo.letters.map(letterInfo => letterInfo.letter).join('')).then(res => {
        //console.log(res);
        setEndGameResult(res)
      });
      disableCurrentLine(lineIndex, lineInfo);
    }
  };

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

  const handleResetGame = async () => {
    // const res = await resetGame(); // backend call
    const res = resetGame();
    setSolution(res);
    console.log(res);
    setWordLines(initLineInfo);
    setEndGameResult({ gameOver: false, gameSuccess: false })
  }



  return (
    <div className="startPage">
      <TopMenuBar />
      <Container maxWidth="xl">

        <Title title={'Wordle'} />

        {wordLines.map((line, lineIndex) => (
          <WordLine
            key={uuidv4()}
            lineInfo={line}
            onEnter={(lineInfo: LineInfo) => handleOnEnter(lineIndex, lineInfo)}
          />
        ))}

        <Box textAlign="center" mt={8} mb={8}>
          {(endGameResult?.gameOver || endGameResult?.gameSuccess) &&
            <Button variant={'contained'} sx={{ backgroundColor: lightBlack, color: 'white' }} onClick={() => handleResetGame()}>
              {'Play again'}
            </Button>}
        </Box>

      </Container>
    </div>
  );
};

export default WordleGame;