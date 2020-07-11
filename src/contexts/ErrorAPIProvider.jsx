import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import { useHistory } from "react-router-dom";
import PaginaError from "../views/PaginaError";

const ErrorAPIContext = createContext();
export const useError = () => useContext(ErrorAPIContext);

const ErrorAPIProvider = ({ children }) => {
  const history = useHistory();
  const [error, setError] = useState();

  useEffect(() => {
    return history.listen(() => setError(undefined));
    // eslint-disable-next-line
  }, []);

  const mostrarContenido = () => {
    if (error) {
      const { status, ...paginaErrorProps } = get(error, "response.data", {});
      return <PaginaError {...paginaErrorProps} />;
    } else {
      return children;
    }
  };

  return (
    <ErrorAPIContext.Provider value={{ setError }}>
      {mostrarContenido()}
    </ErrorAPIContext.Provider>
  );
};

ErrorAPIProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ErrorAPIProvider;
