import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import reducers from './Redux/Reducers'; // default going to index.js
import { register } from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const options = {
  // you can also just use 'bottom center'
  position: positions.MIDDLE,
  // timeout: 5000,
  // offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
};
const store = createStore(reducers, composeEnhancers());
ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <Provider store={store}>
      <App />
    </Provider>
  </AlertProvider>,
  document.getElementById('root')
);
register();
