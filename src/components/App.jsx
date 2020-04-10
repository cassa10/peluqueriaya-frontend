import React from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import Container from "@material-ui/core/Container";
import Bar from "./Bar";
import HomePage from "./HomePage";

const App = () => {

    return (
        <BrowserRouter>
            <Bar/>
            <Container maxWidth="lg" >
                <Switch>
                    <Route exact path="/" render={HomePage}/>
                </Switch>
            </Container>
        </BrowserRouter>
    );
};

export default App;