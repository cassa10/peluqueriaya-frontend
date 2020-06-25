import React from "react";
import {
  Tooltip,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import NotesIcon from "@material-ui/icons/Notes";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import AssignmentIcon from "@material-ui/icons/Assignment";
import EditIcon from "@material-ui/icons/Edit";
import ListItemLink from "../../ListItemLink";
import { useLocation } from "react-router-dom";
import { useUser } from "../../../contexts/UserProvider";
import SwitchEstadoPeluquero from "../../SwitchEstadoPeluquero";

const PeluqueroOpcionesList = () => {
  const { pathname } = useLocation();
  const {
    user: {
      peluquero: { estaDesconectado },
    },
  } = useUser();
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

  return (
    <>
      {listItems.map((listItem, index) =>
        listItem.primary === "Editar perfil" && estaDesconectado ? (
          <Tooltip
            title="Debe estar desconectado para editar su perfil!"
            key={index}
            appendToBody
          >
            <span>
              <ListItemLink
                {...listItem}
                location={pathname}
                disabled={estaDesconectado}
              />
            </span>
          </Tooltip>
        ) : (
          <ListItemLink key={index} {...listItem} location={pathname} />
        )
      )}
      <ListItem>
        <ListItemIcon>
          <SwitchEstadoPeluquero />
        </ListItemIcon>
        <ListItemText
          id="switch-disponibilidad"
          primary={estaDesconectado ? "Desconectado" : "Conectado"}
          primaryTypographyProps={{ noWrap: true }}
        />
      </ListItem>
    </>
  );
};

export default PeluqueroOpcionesList;
