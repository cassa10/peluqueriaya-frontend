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
import Perfil from "./Perfil";
import PaginaRegistroCliente from "../views/PaginaRegistroCliente";


const App = () => {
    const {loading} = useUser();

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
                        <Route path="/registro" component={PaginaRegistroCliente}/>
                        <Route path="/perfil" component={Perfil}/>
                        <Route path="/search" component={PaginaBusquedaPeluqueros}/>
                        <Route path="/contratar" component={PaginaContratacionPeluquero}/>
                        <Route path="*" component={PaginaError404}/>
                    </Switch>
                </ManejadorDeErrores>
            </Container>
        </div>);
};

export default App;