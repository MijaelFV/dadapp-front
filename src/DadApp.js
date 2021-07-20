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

    theme.overrides = {
        MuiTableCell: {
            root: {
                padding: '12px'
            }
        },
        MuiButton: {
            label: {
                color: 'white'
            }
        }
    }

    return (
        <MuiThemeProvider theme={theme}>
            <AppRouter />
        </MuiThemeProvider>
    )
}
