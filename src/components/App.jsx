import React from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import Container from "@material-ui/core/Container";
import Barra from "./Barra";
import PaginaPrincipal from "../views/PaginaPrincipal";
import PaginaBusquedaPeluqueros from "../views/PaginaBusquedaPeluqueros";
import ManejadorDeErrores from "../service/ManejadorDeErrores";
import {PaginaError404} from "../views/PaginaError";
import PaginaContratacionPeluquero from "../views/PaginaContratacionPeluquero";


const App = () => (
    <BrowserRouter>
        <Barra/>
        <Container maxWidth="lg">
            <ManejadorDeErrores>
            <Switch>
                <Route exact path="/" component={PaginaPrincipal}/>
                <Route path="/search" component={PaginaBusquedaPeluqueros}/>
                <Route path="/contratar" component={PaginaContratacionPeluquero}/>
                <Route path="*" component={PaginaError404}/>
            </Switch>
            </ManejadorDeErrores>
        </Container>
    </BrowserRouter>
);

export default App;