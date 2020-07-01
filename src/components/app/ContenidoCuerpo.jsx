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
import PaginaTurnos from "../../views/PaginaTurnos";
import PaginaBusquedaPeluqueros from "../../views/PaginaBusquedaPeluqueros";
import PaginaContratacionPeluquero from "../../views/PaginaContratacionPeluquero";
import { PaginaError404 } from "../../views/PaginaError";
import NotificacionProvider from "../../contexts/NotificacionProvider";
import PaginaCrearServicio from "../../views/PaginaCrearServicio";
import PaginaVerServicios from "../../views/PaginaVerServicios";
import PaginaEdicionCliente from "../../views/PaginaEdicionCliente";
import PaginaEdicionPeluquero from "../../views/PaginaEdicionPeluquero";
import {
  useGetTurnosPeluquero,
  useGetTurnosCliente,
} from "../../service/ServicioDeTurno";

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
          <ClienteRoute path="/turnos" render={() => <PaginaTurnos isPeluquero={false} useGetTurnos={useGetTurnosCliente} />} />
          <ClienteRoute path="/perfil" component={PaginaEdicionCliente} />
          <PeluqueroRoute
            path="/peluquero/perfil"
            component={PaginaEdicionPeluquero}
          />
          <PeluqueroRoute
            path="/peluquero/turnos"
            render={() => <PaginaTurnos isPeluquero={true} useGetTurnos={useGetTurnosPeluquero}/>}
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
