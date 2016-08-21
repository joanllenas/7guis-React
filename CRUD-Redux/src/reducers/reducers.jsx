import { combineReducers } from 'redux';
import { filterText } from './filters';
import { selectedUser, editUser, users } from './users';

export const crudApp = combineReducers(
  {
    filterText,
    selectedUser,
    editUser,
    users,
  }
);
