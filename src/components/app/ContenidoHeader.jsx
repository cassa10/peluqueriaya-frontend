import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Can, { NoCliente, NoPeluquero } from "../../wrappers/Can";
import { URI_LOGIN_CLIENTE, URI_LOGIN_PELUQUERO } from "../../utils/constants";
import { getSidebarTrigger } from "@mui-treasury/layout";
import styled from "styled-components";
import { IconButton, Tooltip } from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import TijeraIcon from "../icons/TijeraIcon";
import logo from "../../assets/images/peluqueriaya-logo.png";
import { useAuth0 } from "../../contexts/Auth0Provider";

const SidebarTrigger = getSidebarTrigger(styled);

const useStyles = makeStyles(() => ({
  img: {
    margin: "auto",
    display: "block",
    width: "350px",
    minWidth: "150px",
    cursor: "pointer",
  },
  customHoverFocus: {
    marginLeft: "5px",
    "&:hover, &.Mui-focusVisible": {
      color: "white",
      boxShadow: "0 2px 0px 0px white",
    },
  },
}));

const ContenidoHeader = () => {
  const classes = useStyles();
  const { login } = useAuth0();
  let { push } = useHistory();
  const { pathname } = useLocation();

  return (
    <Toolbar>
      <SidebarTrigger sidebarId="primarySidebar" />
      {pathname !== "/" && (
        <img
          className={classes.img}
          src={logo}
          alt="logo"
          onClick={() => push("/")}
        />
      )}
      <Can>
        <NoCliente>
          <Tooltip title="Soy Cliente">
            <IconButton edge="end" onClick={() => login(URI_LOGIN_CLIENTE)}>
              <PersonOutlineIcon
                className={classes.customHoverFocus}
                fontSize="large"
                color="secondary"
              />
            </IconButton>
          </Tooltip>
        </NoCliente>
        <NoPeluquero>
          <Tooltip title="Soy Peluquero">
            <IconButton edge="end" onClick={() => login(URI_LOGIN_PELUQUERO)}>
              <TijeraIcon
                className={classes.customHoverFocus}
                fontSize="large"
                color="secondary"
              />
            </IconButton>
          </Tooltip>
        </NoPeluquero>
      </Can>
    </Toolbar>
  );
};

export default ContenidoHeader;
