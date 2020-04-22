import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import SignUp from "./conponements/Layouts/SignUp"
import SignIn from "./conponements/Layouts/SignIn"
import MainPage from './conponements/Layouts/MainPage'
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/SignIn" component={SignIn} />
            <Route path="/SignUp" component={SignUp} />
          </Switch>
        </Router>
      </div>
    );
  }

}

export default App;
