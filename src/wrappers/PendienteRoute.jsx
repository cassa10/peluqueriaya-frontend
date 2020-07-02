import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { URI_LOGIN_CLIENTE, URI_LOGIN_PELUQUERO } from "../utils/constants";
import { useAuth0 } from "../contexts/Auth0Provider";
import { useUser } from "../contexts/UserProvider";

const pendienteRoute = (fuser, redirect_uri, redirect_registrado) => ({
  component: Component,
  path,
  ...rest
}) => {
  const { esCliente, esPeluquero } = useUser();
  const { isAuthenticated, login } = useAuth0();

  useEffect(() => {
    const registrarSiNecesario = async () => {
      if (!isAuthenticated) {
        await login(redirect_uri);
      }
    };
    registrarSiNecesario();
  }, [isAuthenticated, login]);

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
