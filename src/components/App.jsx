import React from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import Container from "@material-ui/core/Container";
import Barra from "./Barra";
import PaginaPrincipal from "../views/PaginaPrincipal";
import PaginaBusquedaPeluqueros from "../views/PaginaBusquedaPeluqueros";
import APIProvider from "../service/APIProvider";

const App = () => (
    <BrowserRouter>
        <APIProvider>
            <Barra/>
            <Container maxWidth="lg">
                <Switch>
                    <Route exact path="/" component={PaginaPrincipal}/>
                    <Route path="/search" component={PaginaBusquedaPeluqueros}/>
                </Switch>
            </Container>
        </APIProvider>
    </BrowserRouter>
);

export default App;