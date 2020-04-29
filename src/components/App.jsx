import React from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import Container from "@material-ui/core/Container";
import Barra from "./Barra";
import PaginaPrincipal from "../views/PaginaPrincipal";
import PaginaBusquedaPeluqueros from "../views/PaginaBusquedaPeluqueros";
import ManejadorDeAPIErrores from "../service/ManejadorDeAPIErrores";
import {PaginaError404} from "../views/PaginaError";


const App = () => (
    <BrowserRouter>
        <Barra/>
        <Container maxWidth="lg">
            <ManejadorDeAPIErrores>
            <Switch>
                <Route exact path="/" component={PaginaPrincipal}/>
                <Route path="/search" component={PaginaBusquedaPeluqueros}/>
                <Route path="*" component={PaginaError404}/>
            </Switch>
            </ManejadorDeAPIErrores>
        </Container>
    </BrowserRouter>
);

export default App;