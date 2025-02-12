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

  const [response, setResponse] = useState(null);


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
    }
  };


  return (
    <div className="startPage">

        <TopMenuBar />
        <Container maxWidth="xl">
            <Box textAlign="center" mt={8} mb={8}>
                <Typography variant="h2" gutterBottom>
                 Wordle
                </Typography>
            </Box>


            {wordLines.map((line, lineIndex) => (
              <WordLine
                key={lineIndex}
                lineInfo={line}
                onChange={(letterIndex, newLetter) => handleLetterChange(lineIndex, letterIndex, newLetter)}
                onEnter={() => handleEnterPress(lineIndex)}
              />
            ))}
        </Container>
    </div>
  );
};

export default StartPage;