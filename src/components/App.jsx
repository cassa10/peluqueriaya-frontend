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
<<<<<<< HEAD
                  <Route exact path="/" render={ (props) => LoggedOutHomePage({...props})}/>
                  <Route path="/search" render={ (props) => SearchResults({...props})} />
=======
                  <Route exact path="/" component={LoggedOutHomePage}/>
>>>>>>> 8e47ab441dbb3cd323d1df0cfc681d9d7e98059d
                </Switch>
            </Container>
        </BrowserRouter>
    );
};

export default App;