import React, { createContext, useContext, useState } from "react";
import { CLIENTE, PELUQUERO, REGISTRADO, VISITANTE } from "../utils/constants";
import PropTypes from "prop-types";
import { useGetPerfil } from "../service/ServicioDeRoles";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

const rolesIniciales = {
  [CLIENTE]: VISITANTE,
  [PELUQUERO]: VISITANTE,
};

const UserProvider = ({ children }) => {
  const [roles, setRoles] = useState(rolesIniciales);
  const [perfil, setPerfil] = useState();
  const { cargando, fetchPerfil } = useGetPerfil(
    ({ email, peluquero, cliente }) => {
      setRoles({
        [CLIENTE]: cliente ? REGISTRADO : VISITANTE,
        [PELUQUERO]: peluquero ? REGISTRADO : VISITANTE,
      });
      setPerfil({ email, peluquero, cliente });
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
