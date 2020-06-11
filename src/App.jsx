import React from 'react';
import styled from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import {
    Root,
    getHeader,
    getDrawerSidebar,
    getSidebarTrigger,
    getSidebarContent,
    getContent,
    getFixedScheme
} from '@mui-treasury/layout';
import theme from "./assets/theme";
import ContenidoBarraLateral from "./components/sidebar/ContenidoBarraLateral";
import CollapseBtnStyled from "./components/sidebar/CollapseBtnStyled";

const Header = getHeader(styled);
const DrawerSidebar = getDrawerSidebar(styled);
const SidebarTrigger = getSidebarTrigger(styled);
const SidebarContent = getSidebarContent(styled);
const Content = getContent(styled);

const scheme = getFixedScheme();

const App = () => {
    return (
        <Root theme={theme} scheme={scheme}>
            {({state: {sidebar}}) => (
                <>
                    <CssBaseline/>
                    <Header color="secondary">
                        <Toolbar>
                            <SidebarTrigger sidebarId="primarySidebar"/>
                        </Toolbar>
                    </Header>
                    <DrawerSidebar sidebarId="primarySidebar">
                        <SidebarContent>
                            <ContenidoBarraLateral collapsed={sidebar.primarySidebar.collapsed}/>
                        </SidebarContent>
                        <CollapseBtnStyled/>
                    </DrawerSidebar>
                    <Content>
                    </Content>
                </>
            )}
        </Root>
    );
};

export default App;