import React from "react";
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
import { useUser } from "./contexts/UserProvider";
import ContenidoCuerpo from "./components/app/ContenidoCuerpo";
import PropTypes from "prop-types";
import Can, { Registrado } from "./wrappers/Can";
import { LinearProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const Header = getHeader(styled);
const DrawerSidebar = getDrawerSidebar(styled);
const SidebarContent = getSidebarContent(styled);
const Content = getContent(styled);
const Footer = getFooter(styled);

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
  const { loading } = useUser();

  if (loading) {
    return <LinearProgress color="secondary" />;
  }

  return (
    <>
      <Header color="primary">
        <ContenidoHeader />
      </Header>
      <Can>
        <Registrado>
          <DrawerSidebar sidebarId="primarySidebar">
            <SidebarContent>
              <ContenidoBarraLateral collapsed={collapsed} />
            </SidebarContent>
            <CollapseBtnStyled />
          </DrawerSidebar>
        </Registrado>
      </Can>
      <Content>
        <ContenidoCuerpo />
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
