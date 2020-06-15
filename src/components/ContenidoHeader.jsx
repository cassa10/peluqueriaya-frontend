import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useUser } from "../contexts/UserProvider";
import Can, { NoCliente, NoPeluquero } from "../wrappers/Can";
import { CLIENTE, PELUQUERO } from "../assets/constants";
import { getSidebarTrigger } from "@mui-treasury/layout";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import TijeraIcon from "./icons/TijeraIcon";
import Tooltip from "@material-ui/core/Tooltip";
import logo from "../assets/images/peluqueriaya-logo.png";

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
    color: "#F5F5DC",
    marginLeft: "5px",
    "&:hover, &.Mui-focusVisible": {
      color: "white",
      boxShadow: "0 2px 0px 0px white",
    },
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
              <PersonOutlineIcon
                className={classes.customHoverFocus}
                fontSize="large"
              />
            </IconButton>
          </Tooltip>
        </NoCliente>
        <NoPeluquero>
          <Tooltip title="Soy Peluquero">
            <IconButton edge="end" onClick={() => login(PELUQUERO)}>
              <TijeraIcon
                className={classes.customHoverFocus}
                fontSize="large"
              />
            </IconButton>
          </Tooltip>
        </NoPeluquero>
      </Can>
    </Toolbar>
  );
};

export default ContenidoHeader;
