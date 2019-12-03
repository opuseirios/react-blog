import React from 'react';
import ReactDOM from 'react-dom';
import './assets/less/global.less';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Register from './pages/register/register'

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route path='/register' component={Register} />
    </Switch>
  </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
