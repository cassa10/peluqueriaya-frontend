import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Container from "@material-ui/core/Container";
import Barra from "./Barra";
import PaginaPrincipal from "../views/PaginaPrincipal";
import PaginaBusquedaPeluqueros from "../views/PaginaBusquedaPeluqueros";
import ManejadorDeErrores from "../service/errores/ManejadorDeErrores";
import PaginaContratacionPeluquero from "../views/PaginaContratacionPeluquero";
import PaginaError404 from "../views/PaginaError404";
import {useAuth0} from "../service/Auth0Provider";
import Perfil from "./Perfil";


const App = () => {
    const {loading} = useAuth0();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Barra/>
            <Container maxWidth="lg">
                <ManejadorDeErrores>
                    <Switch>
                        <Route exact path="/" component={PaginaPrincipal}/>
                        <Route path="/peluquero/login" component={Perfil}/>
                        <Route path="/login" component={Perfil}/>
                        <Route path="/search" component={PaginaBusquedaPeluqueros}/>
                        <Route path="/contratar" component={PaginaContratacionPeluquero}/>
                        <Route path="*" component={PaginaError404}/>
                    </Switch>
                </ManejadorDeErrores>
            </Container>
        </div>);
};

export default App;