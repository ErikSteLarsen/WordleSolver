// src/components/DayBox.tsx
import React from 'react';
import { Paper, TextField } from '@mui/material';
import { LetterInfo } from '../types';


interface LetterBoxProps {
  index: number;
  letterInfo: LetterInfo;
  disabled: boolean;
  onClick: () => void;
  onChange: (index: number, newLetter: string) => void;
  onBackspace: (index: number) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: React.Ref<HTMLInputElement>;
}


const LetterBox: React.FC<LetterBoxProps> = ({ index, letterInfo, disabled, onClick, onChange, onBackspace, onKeyDown, inputRef }) => {

  const handleBeforeInput = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.nativeEvent as InputEvent;
    const key = input.data;
    if (!/[a-zA-Z]/.test(key ? key : '')) {
      event.preventDefault();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && letterInfo.letter === '') {
      onBackspace(index);
    }
    onKeyDown(event);
  };

  let backgroundColor = '#FFFFFF';
  if (disabled) {
    if (letterInfo.correctPosition) {
      backgroundColor = '#6AAA64';
    } else if (letterInfo.correctLetter) {
      backgroundColor = '#C9B458';
    } else if (letterInfo.letter !== '') {
      backgroundColor = '#787C7E';
    }
  }

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
        padding: 0,
        backgroundColor: backgroundColor
      }}
      onClick={() => onClick()}
    >
      <TextField
        disabled={disabled}
        key={index}
        value={letterInfo.letter}
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
          //caretColor: 'transparent',
        }}
      />
    </Paper>
  );
};

export default LetterBox;