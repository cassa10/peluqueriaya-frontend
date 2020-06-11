import React from 'react';
import styled from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
    Root,
    getHeader,
    getDrawerSidebar,
    getSidebarContent,
    getContent,
    getFixedScheme
} from '@mui-treasury/layout';
import theme from "./assets/theme";
import ContenidoBarraLateral from "./components/sidebar/ContenidoBarraLateral";
import CollapseBtnStyled from "./components/sidebar/CollapseBtnStyled";
import ContenidoHeader from "./components/ContenidoHeader";
import {useUser} from "./contexts/UserProvider";
import LinearProgress from "@material-ui/core/LinearProgress";
import ContenidoCuerpo from "./components/ContenidoCuerpo";

const Header = getHeader(styled);
const DrawerSidebar = getDrawerSidebar(styled);
const SidebarContent = getSidebarContent(styled);
const Content = getContent(styled);

const scheme = getFixedScheme();

const App = () => {
    const {loading} = useUser();

    return (
        <Root theme={theme} scheme={scheme}>
            {({state: {sidebar}}) => {
                if (loading) {
                    return <LinearProgress color="secondary"/>;
                }
                return <>
                    <CssBaseline/>
                    <Header color="secondary">
                        <ContenidoHeader/>
                    </Header>
                    <DrawerSidebar sidebarId="primarySidebar">
                        <SidebarContent>
                            <ContenidoBarraLateral collapsed={sidebar.primarySidebar.collapsed}/>
                        </SidebarContent>
                        <CollapseBtnStyled/>
                    </DrawerSidebar>
                    <Content>
                        <ContenidoCuerpo/>
                    </Content>
                </>;
            }}
        </Root>
    );
};

export default App;