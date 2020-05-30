/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import {BrowserRouter as Router, withRouter} from 'react-router-dom';
import App from "./components/App";
import theme from "./assets/theme";
import UserProvider from "./contexts/UserProvider";

const UserProviderWithRouter = withRouter(UserProvider);

ReactDOM.render(
    <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline/>
        <Router>
            <UserProviderWithRouter domain={process.env.REACT_APP_DOMAIN}
                                    client_id={process.env.REACT_APP_CLIENT_ID}
                                    audience={process.env.REACT_APP_AUDIENCE}
                                    redirect_uri={window.location.origin}>
                <App/>
            </UserProviderWithRouter>
        </Router>
    </ThemeProvider>,
    document.querySelector('#father')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
