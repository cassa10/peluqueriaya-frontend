import React from "react";
import { Switch } from "@material-ui/core";
import { useUser } from "../contexts/UserProvider";
import PropTypes from "prop-types";

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
  estaDesconectado: PropTypes.bool,
};

export default SwitchEstadoPeluquero;
