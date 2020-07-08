import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Badge, IconButton, Tooltip } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import AvatarValidado from "../../AvatarValidado";
import { useUser } from "../../../contexts/UserProvider";
import TypographyWithToolTip from "../../TypographyWithToolTip";

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
        <Badge
          overlap="circle"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          badgeContent={
            <Tooltip title="Actualizar perfil">
              <IconButton
                color="secondary"
                onClick={() => setFetchPerfil(true)}
                className={classes.refresh}
              >
                <RefreshIcon fontSize={collapsed ? "default" : "large"} />
              </IconButton>
            </Tooltip>
          }
        >
          <AvatarValidado className={avatarStyles} src={imagenSrc}>
            P
          </AvatarValidado>
        </Badge>
        <TypographyWithToolTip variant="h6">{titulo}</TypographyWithToolTip>
        <TypographyWithToolTip color="textSecondary">
          {textoSecundario1}
        </TypographyWithToolTip>
        {textoSecundario2 && (
          <TypographyWithToolTip color="textSecondary">
            {textoSecundario2}
          </TypographyWithToolTip>
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
