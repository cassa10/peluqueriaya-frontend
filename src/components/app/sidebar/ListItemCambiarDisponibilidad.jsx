import React from "react";
import PropTypes from "prop-types";
import ListItemIconText from "../../ListItemIconText";

const ListItemCambiarDisponibilidad = ({ icon: Icon, estaDesconectado }) => {
  return (
    <ListItemIconText
      icon={() => <Icon {...{ estaDesconectado }} />}
      primary={estaDesconectado ? "Desconectado" : "Disponible"}
    />
  );
};

ListItemCambiarDisponibilidad.propTypes = {
  estaDesconectado: PropTypes.bool,
  icon: PropTypes.any.isRequired,
};

export default ListItemCambiarDisponibilidad;
