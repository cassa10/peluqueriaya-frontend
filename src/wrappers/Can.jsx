import { Children, cloneElement, isValidElement } from "react";
import { useUser } from "../contexts/UserProvider";

const pasarProps = (children, props) => {
  return Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, props);
    }
    return child;
  });
};

const crearCondicion = (children, condicion, ...props) =>
  condicion && pasarProps(children, props);

export const Can = ({ children, ...props }) => {
  const { esPeluquero, esCliente } = useUser();

  return pasarProps(children, { esPeluquero, esCliente, props });
};

export const CondicionCan = (f) => ({
  children,
  esCliente,
  esPeluquero,
  ...props
}) => crearCondicion(children, f({ esCliente, esPeluquero }), props);

export const Cliente = CondicionCan(({ esCliente }) => esCliente);
export const Peluquero = CondicionCan(({ esPeluquero }) => esPeluquero);
export const ClienteNoPeluquero = CondicionCan(
  ({ esCliente, esPeluquero }) => esCliente && !esPeluquero
);
export const NoCliente = CondicionCan(({ esCliente }) => !esCliente);
export const PeluqueroNoCliente = CondicionCan(
  ({ esCliente, esPeluquero }) => !esCliente && esPeluquero
);
export const NoPeluquero = CondicionCan(({ esPeluquero }) => !esPeluquero);
export const Registrado = CondicionCan(
  ({ esCliente, esPeluquero }) => esCliente || esPeluquero
);
export const ClienteYPeluquero = CondicionCan(
  ({ esCliente, esPeluquero }) => esCliente && !esPeluquero
);

export default Can;
