import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  getHeader,
  getDrawerSidebar,
  getSidebarContent,
  getContent,
  getFooter,
} from "@mui-treasury/layout";
import ContenidoBarraLateral from "./components/app/sidebar/ContenidoBarraLateral";
import CollapseBtnStyled from "./components/app/sidebar/CollapseBtnStyled";
import ContenidoHeader from "./components/app/ContenidoHeader";
import ContenidoCuerpo from "./components/app/ContenidoCuerpo";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ErrorAPIProvider from "./contexts/ErrorAPIProvider";
import { withSegunUser1 } from "./wrappers/withSegunUser";

const Header = getHeader(styled);
const DrawerSidebar = getDrawerSidebar(styled);
const SidebarContent = getSidebarContent(styled);
const Content = getContent(styled);
const Footer = getFooter(styled);
const CanRegistrado = withSegunUser1(
  ({ esCliente, esPeluquero }) => esCliente || esPeluquero
);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  content: {
    flex: 1,
  },
  footer: {
    maxWidth: 700,
    margin: "auto",
    textAlign: "center",
    paddingBottom: theme.spacing(3),
  },
}));

const App = ({ collapsed }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header color="primary">
        <ContenidoHeader />
      </Header>
      <CanRegistrado>
        <DrawerSidebar sidebarId="primarySidebar">
          <SidebarContent>
            <ContenidoBarraLateral collapsed={collapsed} />
          </SidebarContent>
          <CollapseBtnStyled />
        </DrawerSidebar>
      </CanRegistrado>
      <Content className={classes.content}>
        <ErrorAPIProvider>
          <ContenidoCuerpo />
        </ErrorAPIProvider>
      </Content>
      <div className={classes.footer}>
        <Footer>
          <Typography variant="caption" align="center">
            © 2020 - MIT License
          </Typography>
        </Footer>
      </div>
    </div>
  );
};

App.propTypes = {
  collapsed: PropTypes.bool,
};

export default App;
