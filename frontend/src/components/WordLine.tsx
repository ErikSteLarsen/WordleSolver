import { Box, Container, Grid, Grid2 } from "@mui/material";
import LetterBox from "./LetterBox";
import { createRef, useEffect, useRef, useState } from "react";
import { LetterInfo, LineInfo } from "./Start";




function onLetterClick(string: String) {
  console.log(string)
}

interface WordLineProps {
  lineInfo: LineInfo;
  onChange: (letterIndex: number, newLetter: string) => void;
  onEnter: (index: number) => void;
}

const WordLine: React.FC<WordLineProps> = ({ lineInfo, onChange, onEnter }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current.length !== lineInfo.letters.length) {
      inputRefs.current = Array(lineInfo.letters.length).fill(null).map((_, i) => inputRefs.current[i] || createRef<HTMLInputElement>().current);
    }
    inputRefs.current[0]?.focus();
  }, []);


  const onClick = () => {
    // Implement click, although not in wordle game
  }

  const handleLetterChange = (index: number, newLetter: string) => {
    onChange(index, newLetter);
    if (newLetter && index < lineInfo.letters.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Enter') {
      onEnter(index);
    }
  };

    return (
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <Box
            display="flex"
            justifyContent="center"
        >
          <Grid2 container spacing={1.5} direction="row" wrap="nowrap">
            {lineInfo.letters.map((letter, index) => (
              <Grid item key={index}>
                <LetterBox
                  key={index}
                  index={index} 
                  letter={letter.letter}
                  disabled={lineInfo.disabled}
                  onClick={() => onClick}
                  onChange={(index, newLetter) => handleLetterChange(index, newLetter)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  onBackspace={handleBackspace}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                />
              </Grid>
            ))}
          </Grid2>
        </Box>
      </Container> 
    )
}

export default WordLine;