import React, { createContext, useContext, useState } from "react";
import { CLIENTE, PELUQUERO, VISITANTE } from "../utils/constants";
import PropTypes from "prop-types";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

const rolesIniciales = {
  [CLIENTE]: VISITANTE,
  [PELUQUERO]: VISITANTE,
};

const UserProvider = ({ children }) => {
  const [roles, setRoles] = useState(rolesIniciales);
  const [perfil, setPerfil] = useState();

  return (
    <UserContext.Provider value={{ roles, setRoles, perfil, setPerfil }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
