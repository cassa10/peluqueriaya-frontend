import React from 'react';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import ListItemLink from "./ListItemLink";


const ClienteMenu = () => {
    const listItems = [
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
            to: "/",
            icon: SearchIcon
        }
    ];

    return listItems.map((listItem, index) => <ListItemLink key={index} {...listItem}/>);
};

export default ClienteMenu;