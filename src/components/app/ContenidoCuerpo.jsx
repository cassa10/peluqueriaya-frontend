import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import PaginaPrincipal from "../../views/PaginaPrincipal";
import {
  PendienteClienteRoute,
  PendientePeluqueroRoute,
} from "../../wrappers/PendienteRoute";
import PaginaRegistroCliente from "../../views/PaginaRegistroCliente";
import PaginaRegistroPeluquero from "../../views/PaginaRegistroPeluquero";
import { ClienteRoute, PeluqueroRoute } from "../../wrappers/RegistradoRoute";
import PaginaTurnosPeluquero from "../../views/PaginaTurnosPeluquero";
import PaginaBusquedaPeluqueros from "../../views/PaginaBusquedaPeluqueros";
import PaginaContratacionPeluquero from "../../views/PaginaContratacionPeluquero";
import { PaginaError404 } from "../../views/PaginaError";
import NotificacionProvider from "../../contexts/NotificacionProvider";
import PaginaCrearServicio from "../../views/PaginaCrearServicio";
import PaginaVerServicios from "../../views/PaginaVerServicios";
import PaginaTurnosCliente from "../../views/PaginaTurnosCliente";
import PaginaEdicionCliente from "../../views/PaginaEdicionCliente";
import PaginaEdicionPeluquero from "../../views/PaginaEdicionPeluquero";
import { useAuth0 } from "../../contexts/Auth0Provider";
import { LinearProgress } from "@material-ui/core";
import { useGetPerfil } from "../../service/ServicioDeRoles";
import { usePostDisponibilidad } from "../../service/ServicioDePeluquero";

const ContenidoCuerpo = () => {
  const { isAuthenticated, loading } = useAuth0();
  const { cargando, fetchPerfil } = useGetPerfil();
  usePostDisponibilidad();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      fetchPerfil();
    }
  }, [fetchPerfil, isAuthenticated, loading]);

  if (cargando || loading) {
    return <LinearProgress color="secondary" />;
  }

  return (
    <NotificacionProvider>
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
        <ClienteRoute path="/turnos" component={PaginaTurnosCliente} />
        <ClienteRoute path="/perfil" component={PaginaEdicionCliente} />
        <PeluqueroRoute
          path="/peluquero/perfil"
          component={PaginaEdicionPeluquero}
        />
        <PeluqueroRoute
          path="/peluquero/turnos"
          component={PaginaTurnosPeluquero}
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
    </NotificacionProvider>
  );
};

export default ContenidoCuerpo;
