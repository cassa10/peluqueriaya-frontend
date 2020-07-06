import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import App from "./App";
import UserProvider from "./contexts/UserProvider";
import Auth0Provider from "./contexts/Auth0Provider";
import withRoot from "./wrappers/withRoot";

const Auth0ProviderWithRouter = withRouter(
  ({ history, location, match, ...props }) => {
    return <Auth0Provider {...{ history, ...props }} />;
  }
);
const AppWithRoot = withRoot(App);

ReactDOM.render(
  <Router>
    <Auth0ProviderWithRouter
      domain={process.env.REACT_APP_DOMAIN}
      client_id={process.env.REACT_APP_CLIENT_ID}
      audience={process.env.REACT_APP_AUDIENCE}
      redirect_uri={window.location.origin}
    >
      <UserProvider>
        <AppWithRoot />
      </UserProvider>
    </Auth0ProviderWithRouter>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
