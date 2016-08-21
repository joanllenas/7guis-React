import expect from 'expect';
import {
  APPLY_FILTER, EDIT_USER, SELECT_USER,
  CREATE_USER, UPDATE_USER, DELETE_USER,
 } from '../../src/actions/actionTypes';
import {
  applyFilter, selectUser, editUser,
  createUser, updateUser, deleteUser,
} from '../../src/actions/actionCreators';

describe('applyFilter', () => {
  it('should create an action to apply a text filter', () => {
    const expected = {
      type: APPLY_FILTER,
      payload: { text: 'hello' },
    };
    expect(applyFilter('hello')).toEqual(expected);
  });
});

describe('selectUser', () => {
  it('should create an action to select a user', () => {
    const expected = {
      type: SELECT_USER,
      payload: { id: 'u1' },
    };
    expect(selectUser('u1')).toEqual(expected);
  });
});

describe('editUser', () => {
  it('should create an action to edit a user', () => {
    const expected = {
      type: EDIT_USER,
      payload: {
        name: 'John',
        surname: 'Snow',
      },
    };
    expect(editUser('John', 'Snow')).toEqual(expected);
  });
});

describe('createUser', () => {
  it('should create an action to create a user', () => {
    const expected = {
      type: CREATE_USER,
      payload: {
        name: 'John',
        surname: 'Snow',
      },
    };
    expect(createUser('John', 'Snow')).toEqual(expected);
  });
});

describe('updateUser', () => {
  it('should create an action to update a user', () => {
    const expected = {
      type: UPDATE_USER,
      payload: {
        id: 'u2',
        name: 'John',
        surname: 'Snow',
      },
    };
    expect(updateUser('u2', 'John', 'Snow')).toEqual(expected);
  });
});

describe('deleteUser', () => {
  it('should create an action to delete a user', () => {
    const expected = {
      type: DELETE_USER,
      payload: { id: 'u1' },
    };
    expect(deleteUser('u1')).toEqual(expected);
  });
});
