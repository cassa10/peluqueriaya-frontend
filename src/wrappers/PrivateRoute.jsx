import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import {CLIENTE, PELUQUERO, REGISTRADO} from "../constants";
import { useUser } from "../contexts/UserProvider";
import Can, {Cliente, Peluquero} from "./Can";

const privateRoute = (componenteCan, rol) =>
    ({ component: Component, path, ...rest }) => {
    const ComponenteCan = componenteCan;
    const { loading, roles, login } = useUser();

    useEffect(() => {
        const loginSiNoEstaRegistrado = async () => {
            if (!loading && roles[rol] !== REGISTRADO) {
                await login(rol);
            }
        };
        loginSiNoEstaRegistrado();
    }, [loading, roles, login, path]);

    const render = props => <Can>
        <ComponenteCan>
            <Component {...props} />
        </ComponenteCan>
    </Can>

    return <Route path={path} render={render} {...rest} />;
};


export const PeluqueroRoute = privateRoute(Peluquero, PELUQUERO);
export const ClienteRoute = privateRoute(Cliente, CLIENTE);
