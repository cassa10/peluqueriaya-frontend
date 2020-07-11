import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Alert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";
import { Snackbar } from "@material-ui/core";

const NotificacionContext = createContext();
export const useNotificacion = () => useContext(NotificacionContext);

const notificacionInicial = {
  mensaje: "",
  severidad: "info",
};

const NotificacionProvider = ({ children }) => {
  const [abrir, setAbrir] = useState(false);
  const [notificacion, setNotificacion] = useState(notificacionInicial);

  useEffect(() => {
    if (!isEqual(notificacion, notificacionInicial)) {
      setAbrir(true);
    }
  }, [notificacion]);

  const contextPayload = useMemo(() => ({ setNotificacion }), [
    setNotificacion,
  ]);

  const handleClose = (event, reason) => {
    if (reason !== "clickaway") {
      setAbrir(false);
    }
  };

  return (
    <NotificacionContext.Provider value={contextPayload}>
      {children}
      <Snackbar open={abrir} autoHideDuration={10000} onClose={handleClose}>
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={notificacion.severidad}
        >
          {notificacion.mensaje}
        </Alert>
      </Snackbar>
    </NotificacionContext.Provider>
  );
};

NotificacionProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default NotificacionProvider;
