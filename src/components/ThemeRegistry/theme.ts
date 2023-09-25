import { Roboto, Comic_Neue } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { teal, blueGrey } from '@mui/material/colors';

const colorTeal = teal[50];
const colorblueGrey = blueGrey[50];
const whitest = '#FFFFFF'


const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const comic_Neue = Comic_Neue({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
});


// rgb(249, 250, 251) #f9fafb
const globalTheme = createTheme({
  palette: {
      background: {
      default: colorblueGrey
    },
    backgroundLight: {
      main: blueGrey[50],
    },
    secondary: {
      main: whitest
    },
    // mode: 'light',
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
  },
});

export default globalTheme;
