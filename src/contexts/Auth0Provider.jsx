import React, { createContext, useContext, useEffect, useState } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import PropTypes from "prop-types";
import { URI_CASA } from "../utils/constants";

export const Auth0Context = createContext();
export const useAuth0 = () => useContext(Auth0Context);

const Auth0Provider = ({ history, children, ...initOptions }) => {
  const [email, setEmail] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onRedirectCallback = (appState) => {
    history.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  };

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);
      if (
        window.location.search.includes("code=") &&
        window.location.search.includes("state=")
      ) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }
      const isAuthenticated = await auth0FromHook.isAuthenticated();
      setIsAuthenticated(isAuthenticated);
      const { email = null } =
        isAuthenticated && (await auth0FromHook.getUser());
      setEmail(email);
      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const login = (redirect_uri) => {
    if (isAuthenticated) {
      history.push(redirect_uri);
    } else {
      auth0Client.loginWithRedirect({ appState: { targetUrl: redirect_uri } });
    }
  };

  const logout = () => auth0Client.logout({ returnTo: URI_CASA });

  return (
    <Auth0Context.Provider
      value={{
        email,
        loading,
        isAuthenticated,
        login,
        logout,
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

Auth0Provider.propTypes = {
  history: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default Auth0Provider;
