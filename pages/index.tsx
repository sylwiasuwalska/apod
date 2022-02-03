import type {NextPage} from 'next'
import Head from 'next/head'

import Main from "../components/main";
import {CssBaseline} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#8e24aa',
      main: '#c158dc',
      dark: '#5c007a',
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
        <Main />
      </ThemeProvider>
  )
}

export default Home
