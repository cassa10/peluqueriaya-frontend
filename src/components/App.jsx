import React from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import Container from "@material-ui/core/Container";
import Bar from "./Bar";
import LoggedOutHomePage from "../views/LoggedOutHomePage";
import SearchResults from "../views/SearchResults";

const App = () => {

    return (
        <BrowserRouter>
            <Bar/>
            <Container maxWidth="lg" >
                <Switch>
                  <Route exact path="/" component={ (props) => LoggedOutHomePage({...props})}/>
                  <Route path="/search" component={ (props) => SearchResults({...props})} />
                </Switch>
            </Container>
        </BrowserRouter>
    );
};

export default App;