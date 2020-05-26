import React from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import Container from "@material-ui/core/Container";
import Barra from "./Barra";
import PaginaPrincipal from "../views/PaginaPrincipal";
import PaginaBusquedaPeluqueros from "../views/PaginaBusquedaPeluqueros";
import ManejadorDeErrores from "../service/errores/ManejadorDeErrores";
import PaginaContratacionPeluquero from "../views/PaginaContratacionPeluquero";
import PaginaGestionPeluquero from "../views/PaginaGestionPeluquero";
import PaginaError404 from "../views/PaginaError404";


const App = () => (
    <BrowserRouter>
        <Barra/>
        <Container maxWidth="lg">
            <ManejadorDeErrores>
            <Switch>
                {
                //TODO BORRAR EL HARDCODEO DEL PELUQUERO LOGEADO
                localStorage.setItem('idPeluqueroLogeado',10)
                }
                <Route exact path="/" component={PaginaPrincipal}/>
                <Route path="/search" component={PaginaBusquedaPeluqueros}/>
                <Route path="/contratar" component={PaginaContratacionPeluquero}/>
                {
                //TODO 
                // hacer privado el /peluquero 
                }
                <Route path="/peluquero" component={PaginaGestionPeluquero} />
                <Route path="*" component={PaginaError404}/>
            </Switch>
            </ManejadorDeErrores>
        </Container>
    </BrowserRouter>
);

export default App;