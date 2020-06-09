import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Container from "@material-ui/core/Container";
import Barra from "./Barra";
import PaginaPrincipal from "../views/PaginaPrincipal";
import PaginaBusquedaPeluqueros from "../views/PaginaBusquedaPeluqueros";
import ErrorAPIProvider from "../contexts/ErrorAPIProvider";
import PaginaContratacionPeluquero from "../views/PaginaContratacionPeluquero";
import PaginaGestionPeluquero from "../views/PaginaGestionPeluquero";
import {useUser} from "../contexts/UserProvider";
import PaginaRegistroCliente from "../views/PaginaRegistroCliente";
import {ClienteRoute, PeluqueroRoute} from "../wrappers/RegistradoRoute";
import PaginaRegistroPeluquero from "../views/PaginaRegistroPeluquero";
import LinearProgress from "@material-ui/core/LinearProgress";
import NotificacionProvider from "../contexts/NotificacionProvider";
import PaginaPerfil from "../views/PaginaPerfil";
import {PaginaError404} from "../views/PaginaError";
import {PendienteClienteRoute, PendientePeluqueroRoute} from "../wrappers/PendienteRoute";


const App = () => {
    const {loading, roles} = useUser();

    console.log("en app");
    console.log(JSON.stringify(roles));

    if (loading) {
        return <LinearProgress color="secondary"/>;
    }

    return <div>
        <Barra/>
        <Container maxWidth="lg">
            <NotificacionProvider>
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
            </NotificacionProvider>
        </Container>
    </div>;
};

export default App;