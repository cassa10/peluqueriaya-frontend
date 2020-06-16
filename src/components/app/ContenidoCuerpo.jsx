import React from "react";
import ErrorAPIProvider from "../../contexts/ErrorAPIProvider";
import { Route, Switch } from "react-router-dom";
import PaginaPrincipal from "../../views/PaginaPrincipal";
import {
  PendienteClienteRoute,
  PendientePeluqueroRoute,
} from "../../wrappers/PendienteRoute";
import PaginaRegistroCliente from "../../views/PaginaRegistroCliente";
import PaginaRegistroPeluquero from "../../views/PaginaRegistroPeluquero";
import { ClienteRoute, PeluqueroRoute } from "../../wrappers/RegistradoRoute";
import PaginaPerfil from "../../views/PaginaPerfil";
import PaginaGestionPeluquero from "../../views/PaginaGestionPeluquero";
import PaginaBusquedaPeluqueros from "../../views/PaginaBusquedaPeluqueros";
import PaginaContratacionPeluquero from "../../views/PaginaContratacionPeluquero";
import { PaginaError404 } from "../../views/PaginaError";
import NotificacionProvider from "../../contexts/NotificacionProvider";
import PaginaCrearServicio from "../../views/PaginaCrearServicio";
import PaginaVerServicios from "../../views/PaginaVerServicios";
import PaginaGestionCliente from "../../views/PaginaGestionCliente";

const ContenidoCuerpo = () => {
  return (
    <NotificacionProvider>
      <ErrorAPIProvider>
        <Switch>
          <Route exact path="/" component={PaginaPrincipal} />
          <PendienteClienteRoute
            path="/registro"
            component={PaginaRegistroCliente}
          />
          <PendientePeluqueroRoute
            path="/peluquero/registro"
            component={PaginaRegistroPeluquero}
          />
          <ClienteRoute path="/perfil" component={PaginaPerfil} />
          <ClienteRoute path="/turnos" component={PaginaGestionCliente}/>
          <PeluqueroRoute
            path="/peluquero/turnos"
            component={PaginaGestionPeluquero}
          />
          <PeluqueroRoute
            path="/peluquero/servicio"
            component={PaginaCrearServicio}
          />
          <PeluqueroRoute
            path="/peluquero/servicios"
            component={PaginaVerServicios}
          />
          <Route path="/search" component={PaginaBusquedaPeluqueros} />
          <Route path="/contratar" component={PaginaContratacionPeluquero} />
          <Route path="*" component={PaginaError404} />
        </Switch>
      </ErrorAPIProvider>
    </NotificacionProvider>
  );
};

export default ContenidoCuerpo;
