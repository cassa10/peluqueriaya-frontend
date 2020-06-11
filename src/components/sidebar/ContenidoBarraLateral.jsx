import React from 'react';
import PerfilInfo from "./PerfilInfo";
import ClienteMenu from "./ClienteMenu";
import {getSidebarContent} from "@mui-treasury/layout";
import styled from "styled-components";
import PropTypes from "prop-types";

const SidebarContent = getSidebarContent(styled);

const ContenidoBarraLateral = ({collapsed}) => {

    return <SidebarContent>
        <PerfilInfo collapsed={collapsed}/>
        <ClienteMenu/>
    </SidebarContent>;
};

ContenidoBarraLateral.propTypes = {
    collapsed: PropTypes.bool
};

export default ContenidoBarraLateral;