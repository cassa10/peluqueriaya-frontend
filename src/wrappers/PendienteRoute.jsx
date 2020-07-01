import React, { useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";
import { URI_LOGIN_CLIENTE, URI_LOGIN_PELUQUERO } from "../utils/constants";
import { useAuth0 } from "../contexts/Auth0Provider";

const pendienteRoute = (fuser, redirect_uri, redirect_registrado) => ({
  component: Component,
  path,
  ...rest
}) => {
  const { esCliente, esPeluquero } = useUser();
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
      if (isAuthenticated && !esCliente && !esPeluquero) {
        await logout();
      }
    });
  }, [history, isAuthenticated, esPeluquero, esCliente, logout]);

  const render = (props) =>
    fuser({ esCliente, esPeluquero }) ? (
      <Redirect to={redirect_registrado} />
    ) : isAuthenticated ? (
      <Component {...props} />
    ) : null;

  return <Route path={path} render={render} {...rest} />;
};

export const PendienteClienteRoute = pendienteRoute(
  ({ esCliente }) => esCliente,
  URI_LOGIN_CLIENTE,
  "/turnos"
);
export const PendientePeluqueroRoute = pendienteRoute(
  ({ esPeluquero }) => esPeluquero,
  URI_LOGIN_PELUQUERO,
  "/peluquero/turnos"
);
