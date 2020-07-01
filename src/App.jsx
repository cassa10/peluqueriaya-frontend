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
import { withSegunUser1 } from "./wrappers/OtroCan";

const Header = getHeader(styled);
const DrawerSidebar = getDrawerSidebar(styled);
const SidebarContent = getSidebarContent(styled);
const Content = getContent(styled);
const Footer = getFooter(styled);
const CanRegistrado = withSegunUser1(
  ({ esCliente, esPeluquero }) => esCliente || esPeluquero
);

const useStyles = makeStyles(() => ({
  footer: {
    maxWidth: 700,
    margin: "auto",
    textAlign: "center",
    paddingTop: "5%",
  },
}));

const App = ({ collapsed }) => {
  const classes = useStyles();

  return (
    <>
      <Header color="primary">
        <ContenidoHeader />
      </Header>
      <CanRegistrado>
        {() => (
          <DrawerSidebar sidebarId="primarySidebar">
            <SidebarContent>
              <ContenidoBarraLateral collapsed={collapsed} />
            </SidebarContent>
            <CollapseBtnStyled />
          </DrawerSidebar>
        )}
      </CanRegistrado>
      <Content>
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
    </>
  );
};

App.propTypes = {
  collapsed: PropTypes.bool,
};

export default App;
