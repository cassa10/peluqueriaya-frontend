import React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <div> HELLO WORLD! </div>} />
          </Switch>
        </BrowserRouter>
    );
  }
}
