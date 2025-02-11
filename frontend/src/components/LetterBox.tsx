// src/components/DayBox.tsx
import React from 'react';
import { Paper, TextField, Typography } from '@mui/material';


interface LetterBoxProps {
  index: number;
  letter: string;
  disabled: boolean;
  onClick: () => void;
  onChange: (index: number, newLetter: string) => void;
  onBackspace: (index: number) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: React.Ref<HTMLInputElement>;
}


const LetterBox: React.FC<LetterBoxProps> = ({ index, letter, disabled, onClick, onChange, onBackspace, onKeyDown, inputRef }) => {
  
  const handleBeforeInput = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.nativeEvent as InputEvent;
    const key = input.data;
    if (!/[a-zA-Z]/.test(key ? key : '')) {
      event.preventDefault();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && letter === '')  {
      onBackspace(index);
    }
    onKeyDown(event);
  };

  console.log(disabled);

  return (
    <Paper key={index} elevation={3} sx={{ p: 2, textAlign: 'center', maxWidth: 60 }} onClick={() => onClick()}> 
      <TextField
        disabled={disabled}
        key={index}
        value={letter}
        onChange={(e) => onChange(index, e.target.value)}
        onKeyDown={handleKeyDown}
        onBeforeInput={handleBeforeInput}
        inputRef={inputRef}
        inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
      />
      {/* <Typography variant="body1">
        {excludedLetters}
      </Typography> */}
    </Paper>
  );
};

export default LetterBox;