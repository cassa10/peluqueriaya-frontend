import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { PELUQUERO, DUAL } from "../constants";
import { useUser } from "../contexts/UserProvider";
import PropTypes from "prop-types";

const ClientePrivateRoute = ({ component: Component, path, ...rest }) => {
    const { loading, rol, loginComoPeluquero } = useUser();

    useEffect(() => {
        const loginSiNoEsPeluquero = async () => {
            if (!loading && (rol !== PELUQUERO && rol !== DUAL)) {
                await loginComoPeluquero();
            }
        };
        loginSiNoEsPeluquero();
    }, [loading, rol, loginComoPeluquero, path]);

    const render = props => (rol !== PELUQUERO && rol !== DUAL)? <Component {...props} />: null;

    return <Route path={path} render={render} {...rest} />;
};

ClientePrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired
}

export default ClientePrivateRoute;