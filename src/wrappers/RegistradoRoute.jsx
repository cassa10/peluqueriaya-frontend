import React from "react";
import { Route, Redirect } from "react-router-dom";
import {
  CLIENTE,
  PELUQUERO,
  REGISTRADO,
  URI_LOGIN_CLIENTE,
  URI_LOGIN_PELUQUERO,
} from "../utils/constants";
import { useUser } from "../contexts/UserProvider";

const registradoRoute = (rol, redirect_uri) => ({
  component: Component,
  path,
  ...rest
}) => {
  const { roles } = useUser();

  const render = (props) =>
    roles[rol] === REGISTRADO ? (
      <Component {...props} />
    ) : (
      <Redirect to={redirect_uri} />
    );

  return <Route path={path} render={render} {...rest} />;
};

export const PeluqueroRoute = registradoRoute(PELUQUERO, URI_LOGIN_PELUQUERO);
export const ClienteRoute = registradoRoute(CLIENTE, URI_LOGIN_CLIENTE);
