import React from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import Container from "@material-ui/core/Container";
import Barra from "./Barra";
import PaginaPrincipal from "../views/PaginaPrincipal";
import PaginaBusquedaPeluqueros from "../views/PaginaBusquedaPeluqueros";
import PaginaError from "../views/PaginaError";
import ManejadorDeErrores from "../service/ManejadorDeErrores";

const App = () => (
    <BrowserRouter>
        <Barra/>
        <Container maxWidth="lg">
            <ManejadorDeErrores>
            <Switch>
                <Route exact path="/" component={PaginaPrincipal}/>
                <Route path="/search" component={PaginaBusquedaPeluqueros}/>
                <Route component={PaginaError}/>
            </Switch>
            </ManejadorDeErrores>
        </Container>
    </BrowserRouter>
);

export default App;