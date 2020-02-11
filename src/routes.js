import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/login/Login';
import Dash from './pages/dash/Dash';
import Relatorio from './pages/relatorio/Relatorio';
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
        <Route path="/inicio" exact component={Dash} />
        <Route path="/registrar" exact component={RegisterProducts} />
        <Route path="/relatorio" exact component={Relatorio} />
        {/* <Route path="/panel" component={Panel} /> */}
      </Switch>
    </BrowserRouter>
  );
}