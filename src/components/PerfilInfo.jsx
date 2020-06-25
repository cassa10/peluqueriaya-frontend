import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Typography, Divider } from "@material-ui/core";
import AvatarValidado from "./AvatarValidado";
import StyledRating from "./PuntajePeluquero";

const useStyles = makeStyles(() => ({
  root: {
    padding: 16,
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
}));

const PerfilInfo = ({
  collapsed,
  imagenSrc,
  titulo,
  textoSecundario1,
  textoSecundario2,
  infoExtra: InfoExtra,
}) => {
  const classes = useStyles();

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
        <div className={classes.avatarPadding} />
        <Typography variant="h6" noWrap>
          {titulo}
        </Typography>
        <Typography
          color="textSecondary"
          noWrap
          gutterBottom={!textoSecundario2}
        >
          {textoSecundario1}
        </Typography>
        {textoSecundario2 && (
          <Typography color="textSecondary" noWrap gutterBottom>
            {textoSecundario2}
          </Typography>
        )}
        {InfoExtra && <InfoExtra />}
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

export const ClientePerfilInfo = ({ collapsed, email, perfil = {} }) => {
  const { fullName, imgPerfil, nroTelefono } = perfil;
  return (
    <PerfilInfo
      collapsed={collapsed}
      textoSecundario1={email}
      textoSecundario2={nroTelefono}
      titulo={fullName}
      imagenSrc={imgPerfil}
    />
  );
};

ClientePerfilInfo.propTypes = {
  collapsed: PropTypes.bool,
  perfil: PropTypes.object,
  email: PropTypes.string,
};

export const PeluqueroPerfilInfo = ({ collapsed, email, perfil = {} }) => {
  const { nombre, logo, puntuacion } = perfil;

  return (
    <PerfilInfo
      collapsed={collapsed}
      textoSecundario1={email}
      infoExtra={puntuacion && <StyledRating defaultValue={puntuacion} />}
      titulo={nombre}
      imagenSrc={logo}
    />
  );
};

PeluqueroPerfilInfo.propTypes = {
  collapsed: PropTypes.bool,
  perfil: PropTypes.object,
  email: PropTypes.string,
};
