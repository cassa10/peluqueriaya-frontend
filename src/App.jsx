import React from 'react';
import styled from 'styled-components';
import {getHeader, getDrawerSidebar, getSidebarContent, getContent} from '@mui-treasury/layout';
import ContenidoBarraLateral from "./components/sidebar/ContenidoBarraLateral";
import CollapseBtnStyled from "./components/sidebar/CollapseBtnStyled";
import ContenidoHeader from "./components/ContenidoHeader";
import {useUser} from "./contexts/UserProvider";
import LinearProgress from "@material-ui/core/LinearProgress";
import ContenidoCuerpo from "./components/ContenidoCuerpo";
import PropTypes from "prop-types";

const Header = getHeader(styled);
const DrawerSidebar = getDrawerSidebar(styled);
const SidebarContent = getSidebarContent(styled);
const Content = getContent(styled);

const App = ({collapsed}) => {
    const {loading} = useUser();

    if (loading) {
        return <LinearProgress color="secondary"/>;
    }

    return <>
        <Header color="primary">
            <ContenidoHeader/>
        </Header>
        <DrawerSidebar sidebarId="primarySidebar">
            <SidebarContent>
                <ContenidoBarraLateral collapsed={collapsed}/>
            </SidebarContent>
            <CollapseBtnStyled/>
        </DrawerSidebar>
        <Content>
            <ContenidoCuerpo/>
        </Content>
    </>;
};

App.propTypes = {
    collapsed: PropTypes.bool
};

export default App;