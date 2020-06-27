import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import {
  CLIENTE,
  PELUQUERO,
  REGISTRADO,
  URI_LOGIN_CLIENTE,
  URI_LOGIN_PELUQUERO,
} from "../utils/constants";
import { useUser } from "../contexts/UserProvider";
import Can, { Cliente, Peluquero } from "./Can";

const registradoRoute = (componenteCan, rol, redirect_uri) => ({
  component: Component,
  path,
  ...rest
}) => {
  const ComponenteCan = componenteCan;
  const { roles } = useUser();
  const { push } = useHistory();

  useEffect(() => {
    const redireccionarARegistro = async () => {
      if (roles[rol] !== REGISTRADO) {
        push(redirect_uri);
      }
    };
    redireccionarARegistro();
  }, [roles, push]);

  const render = (props) => (
    <Can>
      <ComponenteCan>
        <Component {...props} />
      </ComponenteCan>
    </Can>
  );

  return <Route path={path} render={render} {...rest} />;
};

export const PeluqueroRoute = registradoRoute(
  Peluquero,
  PELUQUERO,
  URI_LOGIN_PELUQUERO
);
export const ClienteRoute = registradoRoute(
  Cliente,
  CLIENTE,
  URI_LOGIN_CLIENTE
);
