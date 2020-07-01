import React, { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [cliente, setCliente] = useState();
  const [peluquero, setPeluquero] = useState();
  const [error, setError] = useState();
  const [disponibilidad, setDisponibilidad] = useState();

  const esCliente = useMemo(() => !!cliente, [cliente]);

  const esPeluquero = useMemo(() => !!peluquero, [peluquero]);

  return (
    <UserContext.Provider
      value={{
        esCliente,
        esPeluquero,
        cliente,
        setCliente,
        peluquero,
        setPeluquero,
        error,
        setError,
        disponibilidad,
        setDisponibilidad,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
