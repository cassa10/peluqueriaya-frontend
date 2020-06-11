import React from 'react';
import styled from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
    Root,
    getHeader,
    getDrawerSidebar,
    getSidebarContent,
    getContent,
    getDefaultScheme
} from '@mui-treasury/layout';
import theme from "./assets/theme";
import ContenidoBarraLateral from "./components/sidebar/ContenidoBarraLateral";
import CollapseBtnStyled from "./components/sidebar/CollapseBtnStyled";
import ContenidoHeader from "./components/ContenidoHeader";
import {useUser} from "./contexts/UserProvider";
import LinearProgress from "@material-ui/core/LinearProgress";
import ContenidoCuerpo from "./components/ContenidoCuerpo";
import Can, {Registrado} from "./wrappers/Can";

const Header = getHeader(styled);
const DrawerSidebar = getDrawerSidebar(styled);
const SidebarContent = getSidebarContent(styled);
const Content = getContent(styled);

const scheme = getDefaultScheme();

const App = () => {
    const {loading} = useUser();
    const initialState = {sidebar: {primarySidebar: { collapsed: true, open: true }}};

    return (
        <Root theme={theme} scheme={scheme} initialState={initialState}>
            {({state: {sidebar}}) => {
                if (loading) {
                    return <LinearProgress color="secondary"/>;
                }
                return <>
                    <CssBaseline/>
                    <Header color="primary">
                        <ContenidoHeader/>
                    </Header>
                    <Can>
                        <Registrado>
                            <DrawerSidebar sidebarId="primarySidebar">
                                <SidebarContent>
                                    <ContenidoBarraLateral collapsed={sidebar.primarySidebar.collapsed}/>
                                </SidebarContent>
                                <CollapseBtnStyled/>
                            </DrawerSidebar>
                        </Registrado>
                    </Can>
                    <Content>
                        <ContenidoCuerpo/>
                    </Content>
                </>;
            }}
        </Root>
    );
};

export default App;