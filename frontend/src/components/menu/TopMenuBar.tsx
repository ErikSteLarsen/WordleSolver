// src/components/TopMenuBar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { darkerBlack, darkerBlue, lightBlack, lightBlue, mediumBlack, mediumBlue } from '../../variables/colors';

const TopMenuBar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ height: 40 }}>
      <Toolbar variant="dense" sx={{ minHeight: 40, backgroundColor: mediumBlack, color: 'white' }}>
        <Typography variant="h6" component="div">
          Exercise for your brain
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopMenuBar;