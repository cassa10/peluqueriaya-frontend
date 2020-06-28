import React, { useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";
import {
  CLIENTE,
  PELUQUERO,
  REGISTRADO,
  URI_LOGIN_CLIENTE,
  URI_LOGIN_PELUQUERO,
} from "../utils/constants";
import { useAuth0 } from "../contexts/Auth0Provider";

const pendienteRoute = (rol, redirect_uri, redirect_registrado) => ({
  component: Component,
  path,
  ...rest
}) => {
  const { roles } = useUser();
  const history = useHistory();
  const { isAuthenticated, login, logout } = useAuth0();

  useEffect(() => {
    const registrarSiNecesario = async () => {
      if (!isAuthenticated) {
        await login(redirect_uri);
      }
    };
    registrarSiNecesario();
  }, [isAuthenticated, login]);

  useEffect(() => {
    return history.listen(async () => {
      if (
        isAuthenticated &&
        roles[CLIENTE] !== REGISTRADO &&
        roles[PELUQUERO] !== REGISTRADO
      ) {
        await logout();
      }
    });
  }, [history, isAuthenticated, roles, logout]);

  const render = (props) =>
    roles[rol] === REGISTRADO ? (
      <Redirect to={redirect_registrado} />
    ) : isAuthenticated ? (
      <Component {...props} />
    ) : null;

  return <Route path={path} render={render} {...rest} />;
};

export const PendienteClienteRoute = pendienteRoute(
  CLIENTE,
  URI_LOGIN_CLIENTE,
  "/turnos"
);
export const PendientePeluqueroRoute = pendienteRoute(
  PELUQUERO,
  URI_LOGIN_PELUQUERO,
  "/peluquero/turnos"
);
