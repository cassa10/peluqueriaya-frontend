import {Children, cloneElement, isValidElement} from "react";
import {CLIENTE, PELUQUERO, PENDIENTE, REGISTRADO, VISITANTE} from "../assets/constants";
import {useUser} from "../contexts/UserProvider";

export const Cliente = ({children, roles}) => roles[CLIENTE] === REGISTRADO && children;
export const ClienteNoPeluquero = ({children, roles}) =>
    roles[CLIENTE] === REGISTRADO && roles[PELUQUERO]  === VISITANTE && children;
export const NoCliente = ({children, roles}) => roles[CLIENTE] === VISITANTE && children;
export const Peluquero = ({children, roles}) => roles[PELUQUERO] === REGISTRADO && children;
export const PeluqueroNoCliente = ({children, roles}) =>
    roles[PELUQUERO] === REGISTRADO && roles[CLIENTE]  === VISITANTE && children;
export const NoPeluquero = ({children, roles}) => roles[PELUQUERO]  === VISITANTE && children;
export const Registrado = ({children, roles}) =>
    (roles[CLIENTE] === REGISTRADO || roles[PELUQUERO] === REGISTRADO) && children;
export const Pendiente = ({children, roles}) =>
    (roles[CLIENTE] === PENDIENTE || roles[PELUQUERO] === PENDIENTE) && children;
export const ClienteYPeluquero = ({children, roles}) =>
    roles[CLIENTE] === REGISTRADO && roles[PELUQUERO] === REGISTRADO && children;

const Can = ({children}) => {
    const {roles} = useUser();

    return Children.map(children, child => {
        if (isValidElement(child)) {
            return cloneElement(child, {roles});
        }
        return child;
    });

};

export default Can;