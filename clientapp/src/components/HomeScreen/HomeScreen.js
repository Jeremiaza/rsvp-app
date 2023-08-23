import * as React from 'react';
import FormDialog from '../FormDialog/FormDialog';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './HomeScreen.css';
const theme = createTheme();

theme.typography.h1 = {
  fontSize: '2.0rem',
  '@media (min-width:600px)': {
    fontSize: '2.0rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3.4rem',
  },
};

theme.typography.h2 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.6rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.8rem',
  },
};


theme.typography.h3 = {
  fontSize: '1.6rem',
  '@media (min-width:600px)': {
    fontSize: '2.0rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.0rem',
  },
};
function HomeScreen() {
  return (
    <div className='homescreen'>
      <ThemeProvider theme={theme}>
      <Typography variant="h1" id={'welcome_text'}>Tervetuloa</Typography>
      <div id={'love_letter-base'}><Typography variant="h3" className={'love_letter'}>J</Typography><FavoriteBorderIcon color='success' /><Typography variant="h3" className={'love_letter'}>J</Typography></div>
      <Typography variant="h2" id={'welcome_date'}>5.8.2023</Typography>
      </ThemeProvider>
      <FormDialog />
    </div>
  );
}

export default HomeScreen;
