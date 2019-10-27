import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './redux-store';

const root = document.getElementById('teams-app');

// create the app store
const defaultStore = configureStore();

ReactDOM.render(
  <Provider store={defaultStore}>
    <App store={defaultStore} />
  </Provider>,
  root
);
