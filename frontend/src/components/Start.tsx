import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import TopMenuBar from './menu/TopMenuBar';
import WordLine from './WordLine';
import '../style/Start.css';

export type LetterInfo = {
  letter: string;
  excludedLetters: string[];
}

export type LineInfo = {
  letters: LetterInfo[];
  disabled: boolean;
}

const StartPage: React.FC = () => {
  const initLine: LetterInfo[] = [
    { letter: '', excludedLetters: [] },
    { letter: '', excludedLetters: [] },
    { letter: '', excludedLetters: [] },
    { letter: '', excludedLetters: [] },
    { letter: '', excludedLetters: [] }
  ];

  const initLineInfo: LineInfo[] = [{
    letters: initLine,
    disabled: false,
  }]

  const [wordLines, setWordLines] = useState<LineInfo[]>(initLineInfo);

  /* const [lettersInWord, setLettersInWord] = useState<LetterInfo[]>(initLine); */

/*   const handleLetterChange = (lineIndex: number, letterIndex: number, newLetter: string) => {
    
    const updatedLetters = lettersInWord.map((item, i) => {
      return i === index ? { ...item, letter: newLetter } : item
    }
    );
    setLettersInWord(updatedLetters);
    
  }; 
  */

/*   const handleLetterChange = (lineIndex: number, letterIndex: number, newLetter: string) => {
    const updatedWordLines = wordLines.map((lineInfo, i) => {
      if (i === lineIndex) {
        return lineInfo.letters.map((item, j) => (j === letterIndex ? { ...item, letter: newLetter } : item));
      }
      return lineInfo.letters;
    });
    setWordLines(updatedWordLines);
  }; */

  const handleLetterChange = (lineIndex: number, letterIndex: number, newLetter: string) => {
    const updatedWordLines: LineInfo[] = wordLines.map((lineInfo, i) => {
      if (i === lineIndex) {
        const updatedLetters: LetterInfo[] = lineInfo.letters.map((item, j) => 
          (j === letterIndex ? { ...item, letter: newLetter } : item)
        );
        return { ...lineInfo, letters: updatedLetters };
      }
      return lineInfo;
    });
    setWordLines(updatedWordLines);
  };


  const handleEnterPress = (lineIndex: number) => {
    const currentLine = wordLines[lineIndex];
    const allValid = currentLine.letters.every((item) => /^[a-zA-Z]$/.test(item.letter));
    if (allValid) {
      currentLine.disabled = true;
      const newLineInfo: LineInfo = {
        letters: initLine.map(letter => ({ ...letter })),
        disabled: false,
      };
      setWordLines([...wordLines, newLineInfo]);
      console.log(wordLines);
    }
  };


  return (
    <div className="startPage">

        <TopMenuBar />
        <Container maxWidth="xl">
            <Box textAlign="center" mt={5}>
                <Typography variant="h2" gutterBottom>
                 Wordle Solver
                </Typography>
               {/*  <Typography variant="h5" gutterBottom>
                This is a simple start page using Material-UI and TypeScript.
                </Typography> */}
                <Button variant="contained" color="primary">
                Get Started
                </Button>
            </Box>
            {wordLines.map((line, lineIndex) => (
              <WordLine
                key={lineIndex}
                letters={line.letters}
                onChange={(letterIndex, newLetter) => handleLetterChange(lineIndex, letterIndex, newLetter)}
                onEnter={() => handleEnterPress(lineIndex)}
              />
            ))}
        </Container>
    </div>
  );
};

export default StartPage;