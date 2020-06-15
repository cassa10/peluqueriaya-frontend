import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useUser } from "../../contexts/UserProvider";
import Can, { NoCliente, NoPeluquero } from "../../wrappers/Can";
import { CLIENTE, PELUQUERO } from "../../assets/constants";
import { getSidebarTrigger } from "@mui-treasury/layout";
import styled from "styled-components";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import TijeraIcon from "../icons/TijeraIcon";
import logo from "../../assets/images/peluqueriaya-logo.png";

import { Toolbar, IconButton, Tooltip } from "@material-ui/core";

const SidebarTrigger = getSidebarTrigger(styled);

const useStyles = makeStyles(() => ({
  img: {
    margin: "auto",
    display: "block",
    width: "350px",
    minWidth: "150px",
    cursor: "pointer",
  },
}));

const ContenidoHeader = () => {
  const classes = useStyles();
  const { login } = useUser();
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
            <IconButton edge="end" onClick={() => login(CLIENTE)}>
              <PersonOutlineIcon fontSize="large" color="secondary" />
            </IconButton>
          </Tooltip>
        </NoCliente>
        <NoPeluquero>
          <Tooltip title="Soy Peluquero">
            <IconButton edge="end" onClick={() => login(PELUQUERO)}>
              <TijeraIcon fontSize="large" color="secondary" />
            </IconButton>
          </Tooltip>
        </NoPeluquero>
      </Can>
    </Toolbar>
  );
};

export default ContenidoHeader;
