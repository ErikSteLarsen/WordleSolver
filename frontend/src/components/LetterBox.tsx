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

  return (
    <Paper 
      key={index} 
      elevation={3} 
      sx={{ 
        p: 2, 
        textAlign: 'center', 
        width: '80px',
        height: '80px',
        aspectRatio: '1/1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0
      }} 
      onClick={() => onClick()}
    > 
      <TextField
        disabled={disabled}
        key={index}
        value={letter}
        onChange={(e) => onChange(index, e.target.value)}
        onKeyDown={handleKeyDown}
        onBeforeInput={handleBeforeInput}
        inputRef={inputRef}
        inputProps={{ maxLength: 1, style: { padding: 1, textAlign: 'center', fontSize: '30px', textTransform: 'uppercase', fontWeight: 'bold' } }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none',
              padding: 0,
            },
          },
        }}
      />
      {/* <Typography variant="body1">
        {excludedLetters}
      </Typography> */}
    </Paper>
  );
};

export default LetterBox;