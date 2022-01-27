import type {NextPage} from 'next'
import Head from 'next/head'

import Main from "../components/main";
import {CssBaseline} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: '#000e26'
    },
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const Home: NextPage = () => {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Head>
          <title>Astronomy Picture of the Day</title>
          <meta name="description" content="Astronomy Picture of the Day"/>
          <link rel="icon" href="/logo.svg"/>
        </Head>
        <Main/>
      </ThemeProvider>
  )
}

export default Home
