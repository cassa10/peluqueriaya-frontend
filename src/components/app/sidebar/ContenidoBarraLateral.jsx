import React from "react";
import { useHistory } from "react-router-dom";
import { ClientePerfilInfo, PeluqueroPerfilInfo } from "../../PerfilInfo";
import { getSidebarContent } from "@mui-treasury/layout";
import styled from "styled-components";
import PropTypes from "prop-types";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListItemIconText from "../../ListItemIconText";
import Can, {
  ClienteNoPeluquero,
  ClienteYPeluquero,
  PeluqueroNoCliente,
} from "../../../wrappers/Can";
import TijeraIcon from "../../icons/TijeraIcon";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { useUser } from "../../../contexts/UserProvider";
import ClienteOpcionesList from "./ClienteOpcionesList";
import PeluqueroOpcionesList from "./PeluqueroOpcionesList";
import { Divider, List } from "@material-ui/core";
import Swal from "sweetalert2";

const SidebarContent = getSidebarContent(styled);

const ContenidoBarraLateral = ({ collapsed }) => {

  let { push } = useHistory();

  const { user, logout } = useUser();

  const esRutaPeluquero = (ruta) => {
    //TODO | Agregar aca paths de peluquero cuando se agreguen
    const rutasPeluquero = ["/peluquero/perfil",
      "/peluquero/turnos","/peluquero/servicio", "/peluquero/servicios"];
    return rutasPeluquero.includes(ruta);
  }

  const esNavPeluquero = () => {
    const rutaActual = window.location.pathname;
    return esRutaPeluquero(rutaActual);
  } 

  const perfilInfoProps = (rol) => {
    const { email, ...perfiles } = user;
    const perfil = perfiles[rol];
    return { collapsed, email, perfil };
  };

  const handleSwitchPath = () => {
    esNavPeluquero()?push("/"):push("/peluquero/turnos")
  }
  

  const handleDialogLogout = () => {
    Swal.fire({
      title: "¿Querés desconectarte?",
      showCancelButton: true,
      cancelButtonColor: "Red",
      confirmButtonColor: "Green",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, quiero irme!",
      reverseButtons: true,
    }).then(({ value: confirmado }) => {
      if (confirmado) logout();
    });
  };

  return (
    <SidebarContent>
      <Can>
        <ClienteNoPeluquero>
          <ClientePerfilInfo {...perfilInfoProps("cliente")} />
        </ClienteNoPeluquero>
        <PeluqueroNoCliente>
          <PeluqueroPerfilInfo {...perfilInfoProps("peluquero")} />
        </PeluqueroNoCliente>
        <ClienteYPeluquero>
          { !esNavPeluquero() ? (
            <ClientePerfilInfo {...perfilInfoProps("cliente")} />
          ) : (
            <PeluqueroPerfilInfo {...perfilInfoProps("peluquero")} />
          )}
        </ClienteYPeluquero>
      </Can>
      <List>
        <Can>
          <ClienteNoPeluquero>
            <ClienteOpcionesList />
          </ClienteNoPeluquero>
          <PeluqueroNoCliente>
            <PeluqueroOpcionesList />
          </PeluqueroNoCliente>
          <ClienteYPeluquero>
            { !esNavPeluquero() ? (
              <ClienteOpcionesList />
            ) : (
              <PeluqueroOpcionesList />
            )}
          </ClienteYPeluquero>
        </Can>
      </List>
      <Divider />
      <List>
        <ListItemIconText
          button
          onClick={handleDialogLogout}
          icon={ExitToAppIcon}
          primary="Cerrar Sesión"
        />
        <Can>
          <ClienteYPeluquero>
            <ListItemIconText
              icon={!esNavPeluquero() ? TijeraIcon : PersonOutlineIcon}
              primary={!esNavPeluquero() ? "Peluquero" : "Cliente"}
              button
              onClick={handleSwitchPath}
            />
          </ClienteYPeluquero>
        </Can>
      </List>
    </SidebarContent>
  );
};

ContenidoBarraLateral.propTypes = {
  collapsed: PropTypes.bool,
};

export default ContenidoBarraLateral;
