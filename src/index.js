import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { crudApp } from './reducers/reducers';
import Crud from './Crud';

const store = createStore(crudApp);
const rootElement = document.getElementById('app');

render(
  <Provider store={ store }>
    <Crud />
  </Provider>,
  rootElement
);
