import expect from 'expect';
import {
  SELECT_USER,
  EDIT_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
 } from '../../src/actions/actionTypes';
import {
  selectedUser,
  editUser,
  users,
  EMPTY_EDIT_USER,
  __RewireAPI__ as usersRewireAPI,
} from '../../src/reducers/users';

function mockGenerateId() {
  let cont = 0;
  usersRewireAPI.__Rewire__('generateUserId', () => {
    const id = `id-${cont}`;
    cont++;
    return id;
  });
}

describe('User Reducers', () => {
  describe('selectedUser reducer', () => {
    it('should return null for the initial state', () => {
      expect(selectedUser(undefined, {})).toEqual(null);
    });
    it('should handle SELECT_USER', () => {
      const action = {
        type: SELECT_USER,
        payload: {
          id: 'u2',
        },
      };
      expect(selectedUser('u2', action)).toEqual('u2');
    });
  });

  describe('editUser reducer', () => {
    it('should return an empty user for the initial state', () => {
      expect(editUser(undefined, {})).toEqual(EMPTY_EDIT_USER);
    });
    it('should handle EDIT_USER', () => {
      const action = {
        type: EDIT_USER,
        payload: {
          name: 'John',
          surname: 'Snow',
        },
      };
      expect(editUser(EMPTY_EDIT_USER, action)).toEqual({
        name: 'John',
        surname: 'Snow',
      });
    });
  });

  describe('users reducer', () => {
    it('should return an empty array for the initial state', () => {
      expect(users(undefined, {})).toEqual([]);
    });
    describe('CREATE_USER', () => {
      it('should return an array with the new user', () => {
        const action = {
          type: CREATE_USER,
          payload: {
            name: 'John',
            surname: 'Snow',
          },
        };
        mockGenerateId();
        expect(users([], action)).toEqual([
          { id: 'id-0', name: 'John', surname: 'Snow' },
        ]);
      });
      describe('UPDATE_USER', () => {
        it('should return an array with the updated user', () => {
          const action = {
            type: UPDATE_USER,
            payload: {
              id: 'u2',
              name: 'John',
              surname: 'Snow',
            },
          };
          const oldUsers = [
            { id: 'u1', name: 'User', surname: 'One' },
            { id: 'u2', name: 'User', surname: 'Two' },
          ];
          expect(users(oldUsers, action)).toEqual([
            { id: 'u1', name: 'User', surname: 'One' },
            { id: 'u2', name: 'John', surname: 'Snow' },
          ]);
        });
      });
      describe('DELETE_USER', () => {
        it('should return an array without the deleted user', () => {
          const action = {
            type: DELETE_USER,
            payload: {
              id: 'u2',
            },
          };
          const oldUsers = [
            { id: 'u1', name: 'User', surname: 'One' },
            { id: 'u2', name: 'User', surname: 'Two' },
          ];
          expect(users(oldUsers, action)).toEqual([
            { id: 'u1', name: 'User', surname: 'One' },
          ]);
        });
      });
    });
  });
});
