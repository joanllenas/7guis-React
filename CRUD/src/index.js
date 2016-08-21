import React from 'react';
import ReactDOM from 'react-dom';

import Crud from './Crud';

const users = [
  {id:'u1', name:'Hans', surname:'Emil'},
  {id:'u2', name:'Max', surname:'Mustermann'},
  {id:'u3', name:'Roman', surname:'Tisch'},
  {id:'u4', name:'Iron', surname:'Maiden'},
  {id:'u5', name:'Albert', surname:'Einstein'}
];

ReactDOM.render(
  <Crud
    initialUsers={ users }
    initialSelectedUser={ users[1] } />,
  document.getElementById('app')
);
