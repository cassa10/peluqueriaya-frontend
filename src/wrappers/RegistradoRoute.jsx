import React from "react";
import { Route, Redirect } from "react-router-dom";
import { URI_LOGIN_CLIENTE, URI_LOGIN_PELUQUERO } from "../utils/constants";
import { useUser } from "../contexts/UserProvider";
import flocation from "../utils/flocation";

const registradoRoute = (fuser, redirect_uri) => ({
  component: Component,
  path,
  ...rest
}) => {
  const { esCliente, esPeluquero } = useUser();

  const render = (props) =>
    fuser({ esCliente, esPeluquero }) ? (
      <Component {...props} />
    ) : (
      <Redirect to={flocation(redirect_uri, path)} />
    );

  return <Route path={path} render={render} {...rest} />;
};

export const PeluqueroRoute = registradoRoute(
  ({ esPeluquero }) => esPeluquero,
  URI_LOGIN_PELUQUERO
);
export const ClienteRoute = registradoRoute(
  ({ esCliente }) => esCliente,
  URI_LOGIN_CLIENTE
);
