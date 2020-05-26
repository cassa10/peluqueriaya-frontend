import {Children, cloneElement, isValidElement} from "react";
import {CLIENTE, DUAL, PELUQUERO, PENDIENTE_DE_REGISTRO, VISITANTE} from "../constants";
import {useUser} from "../contexts/UserProvider";

const roles = [VISITANTE, PENDIENTE_DE_REGISTRO, CLIENTE, PELUQUERO, DUAL].map(value => {
    return ({ children, rol }) => rol === value && children;
});

roles.push(({ children, rol }) => (rol === CLIENTE || rol === PELUQUERO || rol === DUAL) && children)

const Can = ({ children }) => {
    const {rol} = useUser();

    return Children.map(children, child => {
        if (isValidElement(child)) {
            return cloneElement(child, {rol});
        }
        return child;
    });

};

Can.Visitante = roles[0];
Can.PendienteDeRegistro = roles[1];
Can.Cliente = roles[2];
Can.Peluquero = roles[3];
Can.Dual = roles[4];
Can.Registrado = roles[5];

export default Can;