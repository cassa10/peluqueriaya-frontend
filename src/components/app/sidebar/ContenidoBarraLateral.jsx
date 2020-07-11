import React from "react";
import { useLocation } from "react-router-dom";
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
import {
  withSegunUser1,
  withSegunUserN,
} from "../../../wrappers/withSegunUser";
import { listItemsCliente, listItemsPeluquero } from "../../../utils/constants";
import ListItemIconText from "../../ListItemIconText";
import PerfilInfo from "./PerfilInfo";
import OpcionesList from "./OpcionesList";
import StyledRating from "../../PuntajePeluquero";
import startsWith from "lodash/startsWith";
import ListItemLink from "../../ListItemLink";

const SidebarContent = getSidebarContent(styled);
const CanClienteYPeluquero = withSegunUser1(
  ({ esCliente, esPeluquero }) => esCliente && esPeluquero
);

const ContenidoBarraLateral = ({ collapsed }) => {
  const { pathname } = useLocation();
  const { peluquero, cliente } = useUser();
  const { logout, email } = useAuth0();

  const isPeluqueroRoute = () => {
    //TODO
    //  Agregar paths del peluquero que no empiecen con '/peluquero'
    const extraPeluqueroRoutes = [];

    return (
      startsWith(pathname, "/peluquero") ||
      extraPeluqueroRoutes.includes(pathname)
    );
  };

  const CanClienteXorPeluqueroXorClienteYPeluquero = withSegunUserN([
    {
      f: ({ esCliente, esPeluquero }) =>
        (esCliente && !esPeluquero) ||
        (esCliente && esPeluquero && !isPeluqueroRoute()),
      fProps: {
        listItems: listItemsCliente,
        estaDesconectado: () => false,
        fperfilInfo: ({
          cliente: {
            ubicacion: { direccion: textoSecundario2 },
            fullName: titulo,
            imgPerfil: imagenSrc,
          },
        }) => ({ textoSecundario2, titulo, imagenSrc }),
      },
    },
    {
      f: ({ esCliente, esPeluquero }) =>
        (!esCliente && esPeluquero) ||
        (esCliente && esPeluquero && isPeluqueroRoute()),
      fProps: {
        listItems: listItemsPeluquero,
        estaDesconectado: ({ estaDesconectado }) => estaDesconectado,
        fperfilInfo: ({
          peluquero: { puntuacion, nombre: titulo, logo: imagenSrc },
        }) => ({
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
        {({ listItems, fperfilInfo, estaDesconectado, index }) => (
          <div key={index}>
            <PerfilInfo
              textoSecundario1={email}
              {...{ collapsed, ...fperfilInfo({ cliente, peluquero }) }}
            />
            <List>
              <OpcionesList
                listItems={listItems}
                estaDesconectado={estaDesconectado(peluquero)}
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
          <ListItemLink
            icon={isPeluqueroRoute() ? PersonOutlineIcon : TijeraIcon}
            primary={isPeluqueroRoute() ? "Cliente" : "Peluquero"}
            to={isPeluqueroRoute() ? "/" : "/peluquero/turnos"}
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
