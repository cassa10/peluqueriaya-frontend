import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import {useUser} from "../contexts/UserProvider";
import {URI_LOGIN_CLIENTE, URI_LOGIN_PELUQUERO} from "../assets/constants";

const pendienteRoute = (redirect_uri) => ({ component: Component, path, ...rest }) => {
    const { loading, isAuthenticated, loginWithRedirect } = useUser();

    useEffect(() => {
        const fn = async () => {
            if (!loading && !isAuthenticated) {
                await loginWithRedirect({
                    appState: {targetUrl: redirect_uri}
                });
            }
        };
        fn();
    }, [loading, isAuthenticated, loginWithRedirect, path]);

    const render = props => isAuthenticated? <Component {...props} /> : null;

    return <Route path={path} render={render} {...rest} />;
};

export const PendienteClienteRoute = pendienteRoute(URI_LOGIN_CLIENTE);
export const PendientePeluqueroRoute = pendienteRoute(URI_LOGIN_PELUQUERO);