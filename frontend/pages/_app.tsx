import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import createEmotionCache from '../utility/emotionCache'
import { temaClaro, temaEscuro } from '../utility/tema'

const clientSideEmotionCache = createEmotionCache();

function MyApp(props: AppProps) {
    //@ts-ignore
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    return (
        <CacheProvider value={emotionCache}>
        <ThemeProvider theme={temaEscuro}>
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
        </CacheProvider>
    );
}

export default MyApp
