/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import {responsiveFontSizes} from "@material-ui/core";
import MolotWoff2 from './assets/fonts/Molot.woff2';
import {BrowserRouter as Router, withRouter} from 'react-router-dom';
import App from "./components/App";
import {Auth0Provider} from "./service/ProveedorAuth0";


const molot = {
    fontFamily: 'Molot',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
    local('Molot'),
    local('Molot-Regular'),
    url(${MolotWoff2}) format('woff2')
  `,
    unicodeRange:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

let theme = createMuiTheme({
    typography: {
        h1: {
            fontFamily: 'Molot, Arial'
        }
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [molot],
            },
        },
    },
    palette: {
        primary: { main: '#0eacd4', contrastText: '#ffffff'},
        secondary: { main: '#0e49d4', contrastText: '#ffffff'},
    }
});

theme = responsiveFontSizes(theme);

const Auth0ProviderWithRouter = withRouter(Auth0Provider);


ReactDOM.render(
    <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Router>
            <Auth0ProviderWithRouter domain={process.env.REACT_APP_DOMAIN}
                                     client_id={process.env.REACT_APP_CLIENT_ID}
                                     redirect_uri={window.location.origin}>
                 <App/>
             </Auth0ProviderWithRouter>
        </Router>
    </ThemeProvider>,
    document.querySelector('#father'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
