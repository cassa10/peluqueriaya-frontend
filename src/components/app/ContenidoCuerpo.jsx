import React from "react";
import { Route, Switch } from "react-router-dom";
import PaginaPrincipal from "../../views/PaginaPrincipal";
import {
  PendienteClienteRoute,
  PendientePeluqueroRoute,
} from "../../wrappers/PendienteRoute";
import PaginaRegistroCliente from "../../views/PaginaRegistroCliente";
import PaginaRegistroPeluquero from "../../views/PaginaRegistroPeluquero";
import { ClienteRoute, PeluqueroRoute } from "../../wrappers/RegistradoRoute";
import PaginaBusquedaPeluqueros from "../../views/PaginaBusquedaPeluqueros";
import PaginaTurnos from "../../views/PaginaTurnos";
import PaginaContratacionPeluquero from "../../views/PaginaContratacionPeluquero";
import { PaginaError404 } from "../../views/PaginaError";
import PaginaCrearServicio from "../../views/PaginaCrearServicio";
import PaginaVerServicios from "../../views/PaginaVerServicios";
import PaginaEdicionCliente from "../../views/PaginaEdicionCliente";
import PaginaEdicionPeluquero from "../../views/PaginaEdicionPeluquero";
import {
  useGetTurnosPeluquero,
  useGetTurnosCliente,
} from "../../service/ServicioDeTurno";
import { useAuth0 } from "../../contexts/Auth0Provider";
import { useGetPerfil } from "../../service/ServicioDeRoles";
import { usePostDisponibilidad } from "../../service/ServicioDePeluquero";
import PaginaCargando from "../PaginaCargando";

const ContenidoCuerpo = () => {
  const { loading } = useAuth0();
  const { cargando } = useGetPerfil();
  usePostDisponibilidad();

  if (cargando || loading) {
    return <PaginaCargando />;
  }

  return (
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
      <ClienteRoute
        path="/turnos"
        render={() => (
          <PaginaTurnos
            isPeluquero={false}
            useGetTurnos={useGetTurnosCliente}
          />
        )}
      />
      <ClienteRoute path="/perfil" component={PaginaEdicionCliente} />
      <PeluqueroRoute
        path="/peluquero/perfil"
        component={PaginaEdicionPeluquero}
      />
      <PeluqueroRoute
        path="/peluquero/turnos"
        render={() => (
          <PaginaTurnos
            isPeluquero={true}
            useGetTurnos={useGetTurnosPeluquero}
          />
        )}
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
  );
};

export default ContenidoCuerpo;
