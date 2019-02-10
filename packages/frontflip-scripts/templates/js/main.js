import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {Provider} from 'react-redux';
import { AppContainer } from "react-hot-loader";

import configureStore from './config/store';
import App from './config/Routes';

// Third party Assets
import './main.scss';

const appNode = document.getElementById('app');

const store = configureStore();

if(appNode){
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <App/>
        </Router>
      </Provider>
    </AppContainer>
    , appNode
  );

  if (module.hot) {
    module.hot.accept('./config/Routes', () => {
      const NextApp = require('./config/Routes').default;
      render(<AppContainer><NextApp/></AppContainer>, appNode);
    });
  }
}
