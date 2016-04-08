import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { crudApp } from './reducers/reducers';
import Crud from './Crud';

const logger = store => next => action => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

const createStoreWithMiddleWare = applyMiddleware(
  logger
)(createStore);

const store = createStoreWithMiddleWare(crudApp);
const rootElement = document.getElementById('app');

render(
  <Provider store={ store }>
    <Crud />
  </Provider>,
  rootElement
);
