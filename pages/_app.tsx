import '../styles/globals.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/major-mono-display'
import type { AppProps } from 'next/app'
import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { FavouritesProvider } from '../contexts/favourites/favouritesContext'

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
})

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <FavouritesProvider>
                <CssBaseline />
                <Component {...pageProps} />
            </FavouritesProvider>
        </ThemeProvider>
    )
}

export default MyApp
