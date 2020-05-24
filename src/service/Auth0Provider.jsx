import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import PropTypes from "prop-types";

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);

const Auth0Provider = ({children, ...initOptions}) => {
    const [isAuthenticated, setIsAuthenticated] = useState();
    const [user, setUser] = useState();
    const [auth0Client, setAuth0] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth0 = async () => {
            const auth0FromHook = await createAuth0Client(initOptions);
            setAuth0(auth0FromHook);
            const isAuthenticated = await auth0FromHook.isAuthenticated();
            setIsAuthenticated(isAuthenticated);
            if (isAuthenticated) {
                const user = await auth0FromHook.getUser();
                setUser(user);
            }
            setLoading(false);
        };
        initAuth0();
        // eslint-disable-next-line
    }, []);

    return (
        <Auth0Context.Provider
            value={{ isAuthenticated, user, loading,
                loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
                getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
                logout: (...p) => auth0Client.logout(...p)
            }}>
            {children}
        </Auth0Context.Provider>
    );
};

Auth0Provider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Auth0Provider;