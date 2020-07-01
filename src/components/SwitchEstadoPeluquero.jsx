import React from "react";
import { Switch } from "@material-ui/core";
import { useUser } from "../contexts/UserProvider";

const SwitchEstadoPeluquero = () => {
  const {
    setDisponibilidad,
    peluquero: { estaDesconectado },
  } = useUser();

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

export default SwitchEstadoPeluquero;
