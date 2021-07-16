import { createTheme, MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import { AppRouter } from './router/AppRouter';

export const DadApp = () => {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#ffad4e'
            }
        }
    })

    return (
        <MuiThemeProvider theme={theme}>
            <AppRouter />
        </MuiThemeProvider>
    )
}
