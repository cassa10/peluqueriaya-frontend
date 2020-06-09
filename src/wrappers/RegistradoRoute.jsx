import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import {CLIENTE, PELUQUERO, REGISTRADO} from "../assets/constants";
import { useUser } from "../contexts/UserProvider";
import Can, {Cliente, Peluquero} from "./Can";

const registradoRoute = (componenteCan, rol) =>
    ({ component: Component, path, ...rest }) => {
    const ComponenteCan = componenteCan;
    const { loading, roles, login } = useUser();

    useEffect(() => {
        const loginSiNoEstaRegistrado = () => {
            if (!loading && roles[rol] !== REGISTRADO) {
                login(rol);
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


export const PeluqueroRoute = registradoRoute(Peluquero, PELUQUERO);
export const ClienteRoute = registradoRoute(Cliente, CLIENTE);
