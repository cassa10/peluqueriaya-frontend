import React from "react";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";
import ListItemLink from "../../ListItemLink";

const ListItemEditarPerfil = ({ estaDesconectado, ...props }) => {
  return !estaDesconectado ? (
    <Tooltip
      PopperProps={{ disablePortal: true }}
      title="Debe estar desconectado para editar su perfil!"
    >
      <span>
        <ListItemLink disabled={!estaDesconectado} {...props} />
      </span>
    </Tooltip>
  ) : (
    <ListItemLink {...props} />
  );
};

ListItemEditarPerfil.propTypes = {
  estaDesconectado: PropTypes.bool,
};

export default ListItemEditarPerfil;
