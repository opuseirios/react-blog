import React from 'react';
import ReactDOM from 'react-dom';
import './assets/less/global.less';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Register from './pages/register/register'
import Login from './pages/login/login'
import {Provider} from 'react-redux'
import store from './store'

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
      </Switch>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
