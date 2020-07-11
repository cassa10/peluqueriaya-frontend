import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { URI_LOGIN_CLIENTE, URI_LOGIN_PELUQUERO } from "../../utils/constants";
import { getSidebarTrigger } from "@mui-treasury/layout";
import styled from "styled-components";
import { IconButton, Tooltip } from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import TijeraIcon from "../icons/TijeraIcon";
import logo from "../../assets/images/peluqueriaya-logo.png";
import { withSegunUserN } from "../../wrappers/withSegunUser";

const SidebarTrigger = getSidebarTrigger(styled);
const CanNoClienteNoPeluquero = withSegunUserN([
  {
    f: ({ esCliente }) => !esCliente,
    fProps: {
      redirect_login: URI_LOGIN_CLIENTE,
      title: "Soy Cliente",
      icon: PersonOutlineIcon,
    },
  },
  {
    f: ({ esPeluquero }) => !esPeluquero,
    fProps: {
      redirect_login: URI_LOGIN_PELUQUERO,
      title: "Soy Peluquero",
      icon: TijeraIcon,
    },
  },
]);

const useStyles = makeStyles(() => ({
  img: {
    margin: "auto",
    display: "block",
    width: "293px",
    minWidth: "150px",
    maxWidth: "293px",
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
      <CanNoClienteNoPeluquero>
        {({ redirect_login, title, icon }) => {
          const Icon = icon;
          return (
            pathname !== redirect_login && (
              <Tooltip title={title} key={redirect_login}>
                <IconButton edge="end" onClick={() => push(redirect_login)}>
                  <Icon
                    className={classes.customHoverFocus}
                    fontSize="large"
                    color="secondary"
                  />
                </IconButton>
              </Tooltip>
            )
          );
        }}
      </CanNoClienteNoPeluquero>
    </Toolbar>
  );
};

export default ContenidoHeader;
