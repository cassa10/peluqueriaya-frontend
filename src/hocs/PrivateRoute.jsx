import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import {VISITANTE} from "../constants";
import {useUser} from "../contexts/UserProvider";
import Can from "./Can";
import PropTypes from "prop-types";

const {Registrado} = Can;

const PrivateRoute = ({ component: Component, path, ...rest }) => {
    const { loading, rol, loginWithRedirect } = useUser();

    useEffect(() => {
        const loginSiEsVisitante = async () => {
            if (!loading && rol === VISITANTE) {
                await loginWithRedirect({
                    appState: {targetUrl: window.location.pathname}
                });
            }
        };
        loginSiEsVisitante();
    }, [loading, rol, loginWithRedirect, path]);

    const render = props => <Can>
        <Registrado>
            <Component {...props} />
        </Registrado>
    </Can>

    return <Route path={path} render={render} {...rest} />;
};

PrivateRoute.propTypes = {
    component: PropTypes.element.isRequired,
    path: PropTypes.string.isRequired
}

export default PrivateRoute;