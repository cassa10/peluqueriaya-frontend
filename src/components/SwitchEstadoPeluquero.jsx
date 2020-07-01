import React from "react";
import PropTypes from "prop-types";
import { Switch } from "@material-ui/core";
import { useUser } from "../contexts/UserProvider";

const SwitchEstadoPeluquero = ({ estaDesconectado }) => {
  const { setDisponibilidad } = useUser();

  return (
    <Switch
      edge="start"
      checked={!estaDesconectado}
      onChange={() =>
        setDisponibilidad(estaDesconectado ? "Desconectado" : "Disponible")
      }
    />
  );
};

SwitchEstadoPeluquero.propTypes = {
  estaDesconectado: PropTypes.bool.isRequired,
};

export default SwitchEstadoPeluquero;
