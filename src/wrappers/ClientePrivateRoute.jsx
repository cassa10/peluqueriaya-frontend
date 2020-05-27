import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { CLIENTE, DUAL } from "../constants";
import { useUser } from "../contexts/UserProvider";
import PropTypes from "prop-types";

const ClientePrivateRoute = ({ component: Component, path, ...rest }) => {
    const { loading, rol, loginComoCliente } = useUser();

    useEffect(() => {
        const loginSiNoEsCliente = async () => {
            if (!loading && (rol !== CLIENTE && rol !== DUAL)) {
                await loginComoCliente();
            }
        };
        loginSiNoEsCliente();
    }, [loading, rol, loginComoCliente, path]);

    const render = props => (rol !== CLIENTE && rol !== DUAL)? <Component {...props} />: null;

    return <Route path={path} render={render} {...rest} />;
};

ClientePrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired
}

export default ClientePrivateRoute;