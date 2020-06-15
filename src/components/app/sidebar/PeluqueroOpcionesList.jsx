import React from "react";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotesIcon from "@material-ui/icons/Notes";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ListItemLink from "../../ListItemLink";

const PeluqueroOpcionesList = () => {
  const listItems = [
    {
      primary: "Mis turnos",
      to: "/peluquero/turnos",
      icon: AssignmentIcon,
    },
    {
      primary: "Mi  perfil",
      to: "/peluquero/perfil",
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
    <ListItemLink key={index} {...listItem} />
  ));
};

export default PeluqueroOpcionesList;
