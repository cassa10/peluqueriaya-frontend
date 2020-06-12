import React, {useState} from 'react';
import PerfilInfo from "./PerfilInfo";
import {getSidebarContent} from "@mui-treasury/layout";
import styled from "styled-components";
import PropTypes from "prop-types";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Divider from "@material-ui/core/Divider";
import ListItemIconText from "./ListItemIconText";
import List from "@material-ui/core/List";
import Can, {ClienteNoPeluquero, ClienteYPeluquero, PeluqueroNoCliente} from "../../wrappers/Can";
import TijeraIcon from "../icons/TijeraIcon";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import {useUser} from "../../contexts/UserProvider";
import ClienteOpcionesList from "./ClienteOpcionesList";
import PeluqueroOpcionesList from "./PeluqueroOpcionesList";

const SidebarContent = getSidebarContent(styled);

const ContenidoBarraLateral = ({collapsed}) => {
    const [mostrarOpcCliente, setMostrarOpcCliente] = useState(true);
    const {logout} = useUser();

    return <SidebarContent>
        <PerfilInfo collapsed={collapsed}/>
        <List>
            <Can>
                <ClienteNoPeluquero><ClienteOpcionesList/></ClienteNoPeluquero>
                <PeluqueroNoCliente><PeluqueroOpcionesList/></PeluqueroNoCliente>
                <ClienteYPeluquero>
                    {mostrarOpcCliente ? <ClienteOpcionesList/> : <PeluqueroOpcionesList/>}
                </ClienteYPeluquero>
            </Can>
        </List>
        <Divider/>
        <List>
            <ListItemIconText button onClick={() => logout()} icon={ExitToAppIcon} primary="Cerrar Sesion"/>
            <Can>
                <ClienteYPeluquero>
                    <ListItemIconText
                        icon={mostrarOpcCliente ? PersonOutlineIcon : TijeraIcon}
                        primary={mostrarOpcCliente ? "Cliente" : "Peluquero"}
                        button onClick={() => setMostrarOpcCliente(prevState => !prevState)}
                    />
                </ClienteYPeluquero>
            </Can>
        </List>
    </SidebarContent>;
};

ContenidoBarraLateral.propTypes = {
    collapsed: PropTypes.bool
};

export default ContenidoBarraLateral;