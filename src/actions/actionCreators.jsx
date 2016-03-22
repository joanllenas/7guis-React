import {
  APPLY_FILTER, EDIT_USER, SELECT_USER,
  CREATE_USER, UPDATE_USER, DELETE_USER,
} from './actionTypes';

export function applyFilter(text) {
  return {
    type: APPLY_FILTER,
    payload: { text },
  };
}

export function selectUser(id) {
  return {
    type: SELECT_USER,
    payload: { id },
  };
}

export function editUser(name, surname) {
  return {
    type: EDIT_USER,
    payload: { name, surname },
  };
}

export function createUser(name, surname) {
  return {
    type: CREATE_USER,
    payload: { name, surname },
  };
}

export function updateUser(id, name, surname) {
  return {
    type: UPDATE_USER,
    payload: { id, name, surname },
  };
}

export function deleteUser(id) {
  return {
    type: DELETE_USER,
    payload: { id },
  };
}
