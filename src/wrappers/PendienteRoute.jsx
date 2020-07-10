import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { URI_LOGIN_CLIENTE, URI_LOGIN_PELUQUERO } from "../utils/constants";
import { useAuth0 } from "../contexts/Auth0Provider";
import { useUser } from "../contexts/UserProvider";
import PaginaCargando from "../components/PaginaCargando";
import get from "lodash/get";

const pendienteRoute = (fuser, targetUrl, redirect_registrado) => ({
  component: Component,
  path,
  ...rest
}) => {
  const { esCliente, esPeluquero } = useUser();
  const { isAuthenticated, login } = useAuth0();
  const afterLoginUrl = get(rest, "location.state.afterLoginUrl");

  useEffect(() => {
    const registrarSiNecesario = async () => {
      if (!isAuthenticated) {
        await login({ targetUrl, afterLoginUrl });
      }
    };
    registrarSiNecesario();
  }, [afterLoginUrl, isAuthenticated, login]);

  const render = (props) =>
    fuser({ esCliente, esPeluquero }) ? (
      <Redirect to={afterLoginUrl ? afterLoginUrl : redirect_registrado} />
    ) : isAuthenticated ? (
      <Component {...props} />
    ) : (
      <PaginaCargando />
    );

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
