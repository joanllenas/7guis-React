import {
  SELECT_USER,
  EDIT_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from '../actions/actionTypes';
import { generateUserId, findUserIndexById } from '../utils';

export function selectedUser(state = null, action) {
  switch (action.type) {
    case SELECT_USER:
      return action.payload.id;
    default:
      return state;
  }
}

export const EMPTY_EDIT_USER = {
  name: '',
  surname: '',
};

export function editUser(state = EMPTY_EDIT_USER, action) {
  switch (action.type) {
    case EDIT_USER:
      return {
        name: action.payload.name,
        surname: action.payload.surname,
      };
    default:
      return state;
  }
}

export function users(state = [], action) {
  switch (action.type) {
    case CREATE_USER:
      return [
        ...state, {
          id: generateUserId(),
          name: action.payload.name,
          surname: action.payload.surname,
        },
      ];
    case UPDATE_USER: {
      const userIndex = findUserIndexById(state, action.payload.id);
      return [
        ...state.slice(0, userIndex),
        Object.assign({}, state[userIndex], action.payload),
        ...state.slice(userIndex + 1),
      ];
    }
    case DELETE_USER:
      return state.filter(user => user.id !== action.payload.id);
    default:
      return state;
  }
}
