import 'cssrecipes-defaults/lib/document-remove-margin-padding.css';
import 'cssrecipes-defaults/lib/box-sizing.css';
import 'cssrecipes-defaults/lib/hidden.css';
import 'normalize.css/normalize.css';

import './assets/styles/main.scss';

import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';

import App from './components/app/App';
import store from './store';
//(/:id)(/:type)
render(
  <Provider store={ store }>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => (<Redirect to="/search"/>)}/>

        <Route exact path="/search" render={ (props) => {
          return <App {...props}/>
        } }/>

        <Route exact path="/search/:query" render={ (props) => {
          return <App {...props}/>
        } }/>
        <Route exact path="/search/:query/region/:region" render={ (props) => {
          return <App {...props}/>
        } }/>
        <Route exact path="/search/:query/region/:region/lang/:lang" render={ (props) => {
          return <App {...props}/>
        } }/>
        <Route exact path="/search/:query/lang/:lang" render={ (props) => {
          return <App {...props}/>
        } }/>
        <Route exact path="/search/:query/lang/:lang/region/:region" render={ (props) => {
          return <App {...props}/>
        } }/>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#app')
);

// Enables hot-reload without page refresh. Removed during `build`
if (module.hot) {
  module.hot.accept();
}


