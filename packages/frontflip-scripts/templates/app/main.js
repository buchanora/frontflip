import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';

import {Provider} from 'react-redux';

import configureStore from './store/configureStore';

import App from './App';

const appNode = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>,
  appNode
)
