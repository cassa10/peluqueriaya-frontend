import React, { createContext, useContext, useState } from "react";
import {
  CLIENTE,
  PELUQUERO,
  REGISTRADO,
  URI_LOGIN_CLIENTE,
  URI_LOGIN_PELUQUERO,
  VISITANTE,
} from "../utils/constants";
import PropTypes from "prop-types";
import { useGetPerfil } from "../service/ServicioDeRoles";
import { useAuth0 } from "./Auth0Provider";
import { useLocation } from "react-router-dom";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

const rolesIniciales = {
  [CLIENTE]: VISITANTE,
  [PELUQUERO]: VISITANTE,
};

const UserProvider = ({ children }) => {
  const [roles, setRoles] = useState(rolesIniciales);
  const [perfil, setPerfil] = useState();
  const { email, logout } = useAuth0();
  const { pathname } = useLocation();
  const { cargando, fetchPerfil } = useGetPerfil(
    async ({ peluquero, cliente }) => {
      setPerfil({ email, peluquero, cliente });
      setRoles({
        [CLIENTE]: cliente ? REGISTRADO : VISITANTE,
        [PELUQUERO]: peluquero ? REGISTRADO : VISITANTE,
      });
      if (
        !cliente &&
        !peluquero &&
        pathname !== URI_LOGIN_CLIENTE &&
        pathname !== URI_LOGIN_PELUQUERO
      ) {
        await logout();
      }
    }
  );

  return (
    <UserContext.Provider
      value={{ roles, setRoles, perfil, setPerfil, fetchPerfil, cargando }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
