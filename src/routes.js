import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from './pages/login/Login';
import Dash from './pages/dash/Dash';
import Panel from './pages/Index';
import RegisterProducts from './pages/register/products/Products.js'

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     isAuthenticated() 
//     ? (
//       <Component {...props} />
//     ) 
//     : (
//       <Redirect to={{ pathname: '/', state: { from: props.location } }} />
//     )
//   )} />
// )


export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dash" exact component={Dash} />
        <Route path="/panel" exact component={Panel} />
        <Route path="/register/products" exact component={RegisterProducts} />
        {/* <Route path="/panel" component={Panel} /> */}
      </Switch>
    </BrowserRouter>
  );
}