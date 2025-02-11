import { Box, Container, Grid, Grid2 } from "@mui/material";
import LetterBox from "./LetterBox";
import { createRef, useEffect, useRef, useState } from "react";
import { LetterInfo, LineInfo } from "./Start";




function onLetterClick(string: String) {
  console.log(string)
}

interface WordLineProps {
  lineInfo: LineInfo[];
  onChange: (letterIndex: number, newLetter: string) => void;
  onEnter: (index: number) => void;
}

const WordLine: React.FC<WordLineProps> = ({ lineInfo, onChange, onEnter }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [lineDisabled, setLineDisabled] = useState(false);

  useEffect(() => {
    if (inputRefs.current.length !== letters.length) {
      inputRefs.current = Array(letters.length).fill(null).map((_, i) => inputRefs.current[i] || createRef<HTMLInputElement>().current);
    }
    inputRefs.current[0]?.focus();
  }, []);


  

  const onClick = () => {

  }

  const handleLetterChange = (index: number, newLetter: string) => {
    onChange(index, newLetter);
    if (newLetter && index < letters.length - 1) {
      console.log()
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
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <Box
            display="flex"
            justifyContent="center"
            mt={5}
        >
          <Grid2 container spacing={1.5} direction="row" wrap="nowrap">
            {letters.map((letter, index) => (
              <Grid item xs={12 / 7} key={index}>
                <LetterBox
                  key={index}
                  index={index} 
                  letter={letter.letter}
                  disabled={lineDisabled}
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