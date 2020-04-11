import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
    palette: {
        primary: { main: '#0eacd4', contrastText:'#ffffff' },
        secondary: { main: '#0e49d4' }
    }
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <App />
    </ThemeProvider>,
    document.querySelector('#father'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
