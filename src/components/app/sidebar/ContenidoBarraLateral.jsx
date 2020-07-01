import React, { useState } from "react";
import PropTypes from "prop-types";
import { getSidebarContent } from "@mui-treasury/layout";
import styled from "styled-components";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TijeraIcon from "../../icons/TijeraIcon";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { useUser } from "../../../contexts/UserProvider";
import { Divider, List } from "@material-ui/core";
import Swal from "sweetalert2";
import { useAuth0 } from "../../../contexts/Auth0Provider";
import { withSegunUser1, withSegunUserN } from "../../../wrappers/OtroCan";
import { listItemsCliente, listItemsPeluquero } from "../../../utils/constants";
import ListItemIconText from "../../ListItemIconText";
import PerfilInfo from "./PerfilInfo";
import OpcionesList from "./OpcionesList";
import StyledRating from "../../PuntajePeluquero";

const SidebarContent = getSidebarContent(styled);
const CanClienteYPeluquero = withSegunUser1(
  ({ esCliente, esPeluquero }) => esCliente && esPeluquero
);

const ContenidoBarraLateral = ({ collapsed }) => {
  const [mostrarOpcCliente, setMostrarOpcCliente] = useState(true);
  const { peluquero, cliente } = useUser();
  const { logout, email: textoSecundario1 } = useAuth0();

  const CanClienteXorPeluqueroXorClienteYPeluquero = withSegunUserN([
    {
      f: ({ esCliente, esPeluquero }) =>
        (esCliente && !esPeluquero) ||
        (esCliente && esPeluquero && mostrarOpcCliente),
      fProps: {
        listItems: listItemsCliente,
        usuario: cliente,
        estaDesconectado: () => false,
        perfilInfo: ({
          direccion: textoSecundario2,
          fullName: titulo,
          imgPerfil: imagenSrc,
        }) => ({ textoSecundario2, titulo, imagenSrc }),
      },
    },
    {
      f: ({ esCliente, esPeluquero }) =>
        (!esCliente && esPeluquero) ||
        (esCliente && esPeluquero && !mostrarOpcCliente),
      fProps: {
        listItems: listItemsPeluquero,
        usuario: peluquero,
        estaDesconectado: ({ estaDesconectado }) => estaDesconectado,
        perfilInfo: ({ puntuacion, nombre: titulo, logo: imagenSrc }) => ({
          infoExtra: puntuacion && <StyledRating defaultValue={puntuacion} />,
          titulo,
          imagenSrc,
        }),
      },
    },
  ]);

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
      <CanClienteXorPeluqueroXorClienteYPeluquero>
        {({ usuario, listItems, perfilInfo, estaDesconectado, index }) => (
          <div key={index}>
            <PerfilInfo
              {...{ collapsed, textoSecundario1, ...perfilInfo(usuario) }}
            />
            <List>
              <OpcionesList
                {...{
                  estaDesconectado: estaDesconectado(usuario),
                  listItems,
                }}
              />
            </List>
          </div>
        )}
      </CanClienteXorPeluqueroXorClienteYPeluquero>
      <Divider />
      <List>
        <ListItemIconText
          button
          onClick={handleDialogLogout}
          icon={ExitToAppIcon}
          primary="Cerrar Sesión"
        />
        <CanClienteYPeluquero>
          <ListItemIconText
            icon={mostrarOpcCliente ? TijeraIcon : PersonOutlineIcon}
            primary={mostrarOpcCliente ? "Peluquero" : "Cliente"}
            button
            onClick={() => setMostrarOpcCliente((prevState) => !prevState)}
          />
        </CanClienteYPeluquero>
      </List>
    </SidebarContent>
  );
};

ContenidoBarraLateral.propTypes = {
  collapsed: PropTypes.bool,
};

export default ContenidoBarraLateral;
