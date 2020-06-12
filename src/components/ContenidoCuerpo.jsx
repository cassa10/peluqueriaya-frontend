import React from 'react';
import ErrorAPIProvider from "../contexts/ErrorAPIProvider";
import {Route, Switch} from "react-router-dom";
import PaginaPrincipal from "../views/PaginaPrincipal";
import {PendienteClienteRoute, PendientePeluqueroRoute} from "../wrappers/PendienteRoute";
import PaginaRegistroCliente from "../views/PaginaRegistroCliente";
import PaginaRegistroPeluquero from "../views/PaginaRegistroPeluquero";
import {ClienteRoute, PeluqueroRoute} from "../wrappers/RegistradoRoute";
import PaginaPerfil from "../views/PaginaPerfil";
import PaginaGestionPeluquero from "../views/PaginaGestionPeluquero";
import PaginaBusquedaPeluqueros from "../views/PaginaBusquedaPeluqueros";
import PaginaContratacionPeluquero from "../views/PaginaContratacionPeluquero";
import {PaginaError404} from "../views/PaginaError";
import NotificacionProvider from "../contexts/NotificacionProvider";

const ContenidoCuerpo = () => {

    return <NotificacionProvider>
        <ErrorAPIProvider>
            <Switch>
                <Route exact path="/" component={PaginaPrincipal}/>
                <PendienteClienteRoute path="/registro" component={PaginaRegistroCliente}/>
                <PendientePeluqueroRoute path="/peluquero/registro" component={PaginaRegistroPeluquero}/>
                <ClienteRoute path="/perfil" component={PaginaPerfil}/>
                <PeluqueroRoute path="/peluquero/turnos" component={PaginaGestionPeluquero}/>
                <Route path="/search" component={PaginaBusquedaPeluqueros}/>
                <Route path="/contratar" component={PaginaContratacionPeluquero}/>
                <Route path="*" component={PaginaError404}/>
            </Switch>
        </ErrorAPIProvider>
    </NotificacionProvider>;

};

export default ContenidoCuerpo;