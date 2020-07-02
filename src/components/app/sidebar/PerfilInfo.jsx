import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Typography, Divider } from "@material-ui/core";
import AvatarValidado from "../../AvatarValidado";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useUser } from "../../../contexts/UserProvider";

const useStyles = makeStyles(() => ({
  root: {
    padding: 10,
  },
  rootCollapsed: {
    padding: 8,
  },
  divTransition: {
    transition: "0.3s",
  },
  avatar: {
    width: 80,
    height: 80,
  },
  avatarCollapsed: {
    width: 48,
    height: 48,
  },
  avatarPadding: {
    paddingBottom: 16,
  },
  refresh: {
    padding: "0 0 0 5px",
  },
}));

const PerfilInfo = ({
  collapsed,
  imagenSrc,
  titulo,
  textoSecundario1,
  textoSecundario2,
  infoExtra,
}) => {
  const classes = useStyles();
  const { setFetchPerfil } = useUser();

  const rootStyles = clsx(
    classes.divTransition,
    collapsed && classes.rootCollapsed,
    !collapsed && classes.root
  );

  const avatarStyles = clsx(
    classes.divTransition,
    collapsed && classes.avatarCollapsed,
    !collapsed && classes.avatar
  );

  return (
    <>
      <div className={rootStyles}>
        <AvatarValidado className={avatarStyles} src={imagenSrc}>
          P
        </AvatarValidado>
        <Typography variant="h6" noWrap>
          {titulo}
        </Typography>
        <Typography color="textSecondary" noWrap>
          {textoSecundario1}
          <Tooltip title="Actualizar perfil">
            <IconButton
              color="secondary"
              onClick={() => setFetchPerfil(true)}
              className={classes.refresh}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Typography>
        {textoSecundario2 && (
          <Typography color="textSecondary" noWrap>
            {textoSecundario2}
          </Typography>
        )}
        {infoExtra}
      </div>
      <Divider />
    </>
  );
};

PerfilInfo.propTypes = {
  collapsed: PropTypes.bool,
  imagenSrc: PropTypes.string,
  titulo: PropTypes.string,
  textoSecundario1: PropTypes.string,
  textoSecundario2: PropTypes.string,
  infoExtra: PropTypes.element,
};

export default PerfilInfo;
