import React from 'react';
import { createTheme, MuiThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import { AppRouter } from './router/AppRouter';
import { store } from './store/store';

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
            <Provider store={store}>
                <AppRouter />
            </Provider>
        </MuiThemeProvider>
    )
}
