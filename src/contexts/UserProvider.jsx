import React, {useState, useEffect, useContext, createContext} from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import PropTypes from "prop-types";
import {URI_CASA, URI_LOGIN_CLIENTE, URI_LOGIN_PELUQUERO, VISITANTE} from "../constants";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

const UserProvider = ({history, children, ...initOptions}) => {
    const [user, setUser] = useState();
    const [auth0Client, setAuth0] = useState();
    const [loading, setLoading] = useState(true);
    const [rol, setRol] = useState(VISITANTE);

    const onRedirectCallback = appState => {
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
            if (window.location.search.includes("code=") &&
                window.location.search.includes("state=")) {
                const { appState } = await auth0FromHook.handleRedirectCallback();
                onRedirectCallback(appState);
            }
            const isAuthenticated = await auth0FromHook.isAuthenticated();
            if (isAuthenticated) {
                const user = await auth0FromHook.getUser();
                setUser(user);
                //Pedir rol de back y setear ese
                setRol(VISITANTE);
            }
            setLoading(false);
        };
        initAuth0();
        // eslint-disable-next-line
    }, []);

    const loginComoCliente = () => auth0Client.loginWithRedirect({redirect_uri: URI_LOGIN_CLIENTE})

    const loginComoPeluquero = () => auth0Client.loginWithRedirect({redirect_uri: URI_LOGIN_PELUQUERO})

    const logout = () => {
        setRol(VISITANTE);
        auth0Client.logout({returnTo: URI_CASA})
    }

    return (
        <UserContext.Provider
            value={{ user, loading, rol, setRol, loginComoCliente, loginComoPeluquero, logout,
                getTokenSilently: (...p) => auth0Client.getTokenSilently(...p)
            }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    history: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
};

export default UserProvider;