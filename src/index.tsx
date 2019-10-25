import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux-store';

import App from './components/App';

const root = document.getElementById('APP');

const defaultStore = configureStore();

ReactDOM.render(
  <Provider store={defaultStore}>
    <App />
  </Provider>,
  root
);
