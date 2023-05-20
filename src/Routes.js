import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={ Login } />
        <Route exact path="/carteira" component={ Wallet } />
      </div>
    );
  }
}

export default Routes;
