import React from "react";
import PropTypes from "prop-types";
import ErrorIcon from "@material-ui/icons/Error";
import DoneIcon from "@material-ui/icons/Done";
import { CircularProgress } from "@material-ui/core";

const EstadoIcon = ({ condicion, cargando }) => {
  if (condicion && !cargando) return <DoneIcon color="secondary" />;
  if (cargando) return <CircularProgress color="secondary" size={30} />;
  return <ErrorIcon color="secondary" />;
};

EstadoIcon.propTypes = {
  condicion: PropTypes.bool.isRequired,
  cargando: PropTypes.bool.isRequired,
};

export default EstadoIcon;
