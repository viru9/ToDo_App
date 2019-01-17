import './../node_modules/bootstrap/dist/css/bootstrap.css';
import './../node_modules/sweetalert/dist/sweetalert.css';
import './css/css/main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Home from './components/home';
import LoginPage from './components/login_page';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
   applyMiddleware(promise,thunk)
));

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/home" component={Home}/>
      <PublicRoute path="/" component={LoginPage}/>
    </Switch>
  </BrowserRouter>
</Provider>
  , document.getElementById('root'));
registerServiceWorker();

function PublicRoute({
  component: Component,
  authed,
  ...rest
}) {
  return (
    <Route {...rest} render={(props) => !localStorage.getItem('user_token')
      ? <Component {...props}/>
      : <Redirect to={'/home'}/>}/>
  )
}

function PrivateRoute({
  component: Component,
  authed,
  ...rest
}) {
  return (
    <Route {...rest} render={(props) => localStorage.getItem('user_token')
      ? <Component {...props}/>
      : <Redirect to={'/'}/>}/>
  )
}
