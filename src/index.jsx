import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import UserProvider from "./contexts/UserProvider";
import withRoot from "./wrappers/withRoot";
import App from "./App";

const UserProviderWithRouter = withRouter(UserProvider);
const AppWithRoot = withRoot(App);

ReactDOM.render(
  <Router>
    <UserProviderWithRouter
      domain={process.env.REACT_APP_DOMAIN}
      client_id={process.env.REACT_APP_CLIENT_ID}
      audience={process.env.REACT_APP_AUDIENCE}
      redirect_uri={window.location.origin}
    >
      <AppWithRoot />
    </UserProviderWithRouter>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
