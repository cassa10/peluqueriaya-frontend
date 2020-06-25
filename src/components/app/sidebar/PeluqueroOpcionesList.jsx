import React from "react";
import NotesIcon from "@material-ui/icons/Notes";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ListItemLink from "../../ListItemLink";
import { useLocation } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import AssignmentIcon from "@material-ui/icons/Assignment";

const PeluqueroOpcionesList = () => {
  const { pathname } = useLocation();
  const listItems = [
    {
      primary: "Mis turnos",
      to: "/peluquero/turnos",
      icon: AssignmentIcon,
    },
    {
      primary: "Editar perfil",
      to: "/peluquero/perfil",
      icon: EditIcon,
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
