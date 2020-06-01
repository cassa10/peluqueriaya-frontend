import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Container from "@material-ui/core/Container";
import Barra from "./Barra";
import PaginaPrincipal from "../views/PaginaPrincipal";
import PaginaBusquedaPeluqueros from "../views/PaginaBusquedaPeluqueros";
import ManejadorDeErrores from "../contexts/errors/ManejadorDeErrores";
import PaginaContratacionPeluquero from "../views/PaginaContratacionPeluquero";
import PaginaError404 from "../views/PaginaError404";
import {useUser} from "../contexts/UserProvider";
import PaginaRegistroCliente from "../views/PaginaRegistroCliente";
import Perfil from "./Perfil";
import {ClienteRoute, PeluqueroRoute} from "../wrappers/PrivateRoute";
import PaginaRegistroPeluquero from "../views/PaginaRegistroPeluquero";
import LinearProgress from "@material-ui/core/LinearProgress";
import SignUp from "../views/SignUp";


const App = () => {
    const {loading} = useUser();

    if (loading) {
        return <LinearProgress color="secondary" />;
    }

    return (
        <div>
            <Barra/>
            <Container maxWidth="lg">
                <ManejadorDeErrores>
                    <Switch>
                        <Route exact path="/" component={PaginaPrincipal}/>
                        <Route path="/registro" component={PaginaRegistroCliente}/>
                        <Route path="/pelquero/registro" component={PaginaRegistroPeluquero}/>
                        <Route path="/reg" component={SignUp}/>
                        <ClienteRoute path="/perfil" component={Perfil}/>
                        <PeluqueroRoute path="/peluquero/perfil" component={Perfil}/>
                        <Route path="/search" component={PaginaBusquedaPeluqueros}/>
                        <Route path="/contratar" component={PaginaContratacionPeluquero}/>
                        <Route path="*" component={PaginaError404}/>
                    </Switch>
                </ManejadorDeErrores>
            </Container>
        </div>);
};

export default App;