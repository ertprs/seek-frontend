import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './services/auth';

import Login from './pages/login/Login';
import Dash from './pages/dash/Dash';
import Relatorio from './pages/relatorio/Relatorio';
import RegisterProducts from './pages/register/products/Products.js'
import RegisterRestaurant from './pages/register/restaurant/Restaurant'
import RegisterUser from './pages/register/user/User'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated()
    ? (
      <Component {...props} />
    ) 
    : (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )
  )} />
)


export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRoute path="/dash" exact component={Dash} />
        <PrivateRoute path="/registrar/produtos" exact component={RegisterProducts} />
        <PrivateRoute path="/registrar/restaurante" exact component={RegisterRestaurant} />
        <PrivateRoute path="/registrar/usuario" exact component={RegisterUser} />
        <PrivateRoute path="/relatorio" exact component={Relatorio} />
      </Switch>
    </BrowserRouter>
  );
}