import React, {useState} from 'react';
import {ClientePerfilInfo, PeluqueroPerfilInfo} from "./PerfilInfo";
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
import {useGetPerfil} from "../../service/ServicioDeRol";
import CircularProgress from "@material-ui/core/CircularProgress";


const SidebarContent = getSidebarContent(styled);

const ContenidoBarraLateral = ({collapsed}) => {
    const [mostrarOpcCliente, setMostrarOpcCliente] = useState(true);
    const {logout, user:{email}} = useUser();
    const [{cliente, peluquero}, setPerfil] = useState({cliente: null, peluquero: null});
    const {cargando} = useGetPerfil(setPerfil);

    const perfilInfoProps = (rol) => ({collapsed, email, ...rol});

    return <SidebarContent>
        {cargando?
            <CircularProgress color="secondary"/>:
            <Can>
            <ClienteNoPeluquero><ClientePerfilInfo {...perfilInfoProps(cliente)}/></ClienteNoPeluquero>
            <PeluqueroNoCliente><PeluqueroPerfilInfo {...perfilInfoProps(peluquero)}/></PeluqueroNoCliente>
            <ClienteYPeluquero>
                {mostrarOpcCliente ?
                    <ClientePerfilInfo {...perfilInfoProps(cliente)}/> :
                    <PeluqueroPerfilInfo {...perfilInfoProps(peluquero)}/>}
            </ClienteYPeluquero>
        </Can>}
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
            <ListItemIconText button onClick={() => logout()} icon={ExitToAppIcon} primary="Cerrar Sesión"/>
            <Can>
                <ClienteYPeluquero>
                    <ListItemIconText
                        icon={mostrarOpcCliente ? TijeraIcon : PersonOutlineIcon}
                        primary={mostrarOpcCliente ? "Peluquero" : "Cliente"}
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