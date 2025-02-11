// src/components/TopMenuBar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const TopMenuBar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ height: 40 }}>
      <Toolbar variant="dense" sx={{ minHeight: 40 }}>
        <Typography variant="h6" component="div">
          Wordle Solver
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopMenuBar;