import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { esES } from '@mui/material/locale';
import { Provider } from 'react-redux';
import { AppRouter } from './router/AppRouter';
import { store } from './redux/store';

export const DadApp = () => {
    const theme = createTheme(
        {   
            palette: {
                mode: "dark",
                primary: {
                    main: '#FFFFFF'
                },
                secondary: {
                    main: '#0b101f'
                },
            },
        },
        esES
    )

    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <AppRouter />
            </Provider>
        </ThemeProvider>
    )
}
