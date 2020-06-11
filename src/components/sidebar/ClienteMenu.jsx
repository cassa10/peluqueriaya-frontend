import React, {useState} from 'react';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import TijeraIcon from "../icons/TijeraIcon";
import ListItemLink from "./ListItemLink";

const itemsClienteMenu = [
    {
        primary: "Mis turnos",
        to: "/turnos",
        icon: AssignmentIcon
    },
    {
        primary: "Mi  perfil",
        to: "/perfil",
        icon: AccountCircleIcon
    },{
        primary: "Buscar peluqueros",
        to: "/buscar",
        icon: SearchIcon
    },{
        primary: "Cerrar sesión",
        to: "/cerrar-sesion",
        icon: ExitToAppIcon
    }
];

const useStyles = makeStyles((theme) => ({
    divider: {
        paddingTop: theme.spacing(3)
    }
}))


const ClienteMenu = () => {
    const classes = useStyles();
    const [mostrarOpcCliente, setMostrarOpcCliente] = useState(false);

    const crearLista = () => {
        return itemsClienteMenu.map(({primary, icon, to}, index) => (
            <ListItemLink key={index} primary={primary} to={to} icon={icon}/>
        ));
    };

    return <List>
        {crearLista()}
        <Divider/>
        <ListItem className={classes.divider} button
                  onClick={() => setMostrarOpcCliente(prevState => !prevState)}>
            <ListItemIcon>{mostrarOpcCliente? <PersonOutlineIcon/> : <TijeraIcon/>}</ListItemIcon>
            <ListItemText primary={mostrarOpcCliente?"Cliente":"Peluquero"}
                          primaryTypographyProps={{noWrap: true}}/>
        </ListItem>
    </List>;
};

export default ClienteMenu;