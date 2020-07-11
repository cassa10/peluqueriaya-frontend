import React from "react";
import { Switch } from "@material-ui/core";
import { useUser } from "../contexts/UserProvider";
import PropTypes from "prop-types";
import { useNotificacion } from "../contexts/NotificacionProvider";

const SwitchEstadoPeluquero = ({ estaDesconectado }) => {
  const {
    setDisponibilidad,
    peluquero: { estaDisponible },
  } = useUser();
  const { setNotificacion } = useNotificacion();

  const handleChange = () => {
    if (estaDesconectado || estaDisponible) {
      setDisponibilidad(estaDesconectado ? "Desconectado" : "Disponible");
    } else {
      setNotificacion({
        mensaje: "No puede desconectarse si posee turnos confirmados!",
        severidad: "error",
      });
    }
  };

  return (
    <Switch edge="start" checked={!estaDesconectado} onChange={handleChange} />
  );
};

SwitchEstadoPeluquero.propTypes = {
  estaDesconectado: PropTypes.bool,
};

export default SwitchEstadoPeluquero;
