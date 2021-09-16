import React from 'react';
import { createTheme, MuiThemeProvider } from '@material-ui/core';
import { esES } from '@material-ui/core/locale';
import { Provider } from 'react-redux';
import { AppRouter } from './router/AppRouter';
import { store } from './redux/store';

export const DadApp = () => {
    const theme = createTheme(
        {
            palette: {
                type: "dark",
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
    theme.overrides = {
        // MuiTableCell: {
        //     root: {
        //         padding: '12px'
        //     }
        // },
        // MuiButton: {
        //     label: {
        //         color: 'white'
        //     }
        // }
    }

    return (
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <AppRouter />
            </Provider>
        </MuiThemeProvider>
    )
}
