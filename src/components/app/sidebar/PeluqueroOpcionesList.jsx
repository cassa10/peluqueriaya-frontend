import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotesIcon from "@material-ui/icons/Notes";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ListItemLink from "../../ListItemLink";
import { useLocation } from "react-router-dom";

const PeluqueroOpcionesList = () => {
  const { pathname } = useLocation();
  const listItems = [
    {
      primary: "Perfil y Turnos",
      to: "/peluquero/turnos",
      icon: AccountCircleIcon,
    },
    {
      primary: "Mis servicios",
      to: "/peluquero/servicios",
      icon: NotesIcon,
    },
    {
      primary: "Crear servicio",
      to: "/peluquero/servicio",
      icon: PlaylistAddIcon,
    },
  ];

  return listItems.map((listItem, index) => (
    <ListItemLink key={index} {...listItem} location={pathname} />
  ));
};

export default PeluqueroOpcionesList;
