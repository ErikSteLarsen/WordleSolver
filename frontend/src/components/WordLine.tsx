import { Box, Container, Grid, Grid2 } from "@mui/material";
import LetterBox from "./LetterBox";
import { createRef, useEffect, useRef, useState } from "react";
import { LineInfo } from "../types";


interface WordLineProps {
  lineInfo: LineInfo;
  onEnter: (line: LineInfo) => void;
}

const WordLine: React.FC<WordLineProps> = ({ lineInfo, onEnter }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [line, setLine] = useState<LineInfo>(lineInfo);

  useEffect(() => {
    if (inputRefs.current.length !== lineInfo.letters.length) {
      inputRefs.current = Array(lineInfo.letters.length).fill(null).map((_, i) => inputRefs.current[i] || createRef<HTMLInputElement>().current);
    }
    inputRefs.current[0]?.focus();
  }, [lineInfo]);


  const handleLetterChange = (letterIndex: number, newLetter: string) => {
    setLine(prevLine => {
      const updatedLetters = prevLine.letters.map((item, j) =>
        (j === letterIndex ? { ...item, letter: newLetter } : item)
      );
      return { ...prevLine, letters: updatedLetters };
    });

    if (newLetter && letterIndex < line.letters.length - 1) {
      inputRefs.current[letterIndex + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onEnter(line);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Box
        display="flex"
        justifyContent="center"
      >
        <Grid2 container spacing={1.5} direction="row" wrap="nowrap">
          {line.letters.map((letter, index) => (
            <Grid item key={index}>
              <LetterBox
                key={index}
                index={index}
                letterInfo={letter}
                disabled={line.disabled}
                onClick={() => { }}
                onChange={(index, newLetter) => handleLetterChange(index, newLetter)}
                onKeyDown={(e) => handleKeyDown(e)}
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