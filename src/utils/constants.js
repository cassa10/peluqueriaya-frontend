import AssignmentIcon from "@material-ui/icons/Assignment";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import NotesIcon from "@material-ui/icons/Notes";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ListItemLink from "../components/ListItemLink";
import ListItemEditarPerfil from "../components/app/sidebar/ListItemEditarPerfil";
import SwitchEstadoPeluquero from "../components/SwitchEstadoPeluquero";
import ListItemCambiarDisponibilidad from "../components/app/sidebar/ListItemCambiarDisponibilidad";

export const URI_LOGIN_CLIENTE = "/registro";
export const URI_LOGIN_PELUQUERO = "/peluquero/registro";
export const URI_CASA = "http://localhost:3000/";

export const CLIENTE = "cliente";
export const PELUQUERO = "peluquero";
export const VISITANTE = "VISITANTE";
export const PENDIENTE = "PENDIENTE";
export const REGISTRADO = "REGISTRADO";

export const listItemsCliente = [
  {
    primary: "Mis turnos",
    to: "/turnos",
    icon: AssignmentIcon,
    listItemWrapper: ListItemLink,
  },
  {
    primary: "Editar perfil",
    to: "/perfil",
    icon: EditIcon,
    listItemWrapper: ListItemLink,
  },
  {
    primary: "Buscar peluqueros",
    to: "/",
    icon: SearchIcon,
    listItemWrapper: ListItemLink,
  },
];

export const listItemsPeluquero = [
  {
    primary: "Mis turnos",
    to: "/peluquero/turnos",
    icon: AssignmentIcon,
    listItemWrapper: ListItemLink,
  },
  {
    primary: "Editar perfil",
    to: "/peluquero/perfil",
    icon: EditIcon,
    listItemWrapper: ListItemEditarPerfil,
  },
  {
    primary: "Mis servicios",
    to: "/peluquero/servicios",
    icon: NotesIcon,
    listItemWrapper: ListItemLink,
  },
  {
    primary: "Crear servicio",
    to: "/peluquero/servicio",
    icon: PlaylistAddIcon,
    listItemWrapper: ListItemLink,
  },
  {
    icon: SwitchEstadoPeluquero,
    listItemWrapper: ListItemCambiarDisponibilidad,
  },
];
