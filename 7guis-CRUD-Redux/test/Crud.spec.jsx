import expect, { spyOn } from 'expect';
import { createUsersList } from './users.stub';
import { Crud } from '../src/Crud';
import { EMPTY_EDIT_USER } from '../src/reducers/users';
import {
  applyFilter, editUser, selectUser,
  createUser, updateUser, deleteUser,
} from '../src/actions/actionCreators';

function getInitialProps(users = [], selectedUser = null, _editUser = EMPTY_EDIT_USER) {
  const props = {
    dispatch: () => {},
    users,
    filterText: '',
    selectedUser,
    editUser: _editUser,
  };
  return props;
}

describe('Crud', () => {
  it('should handle text filter changes', () => {
    const component = new Crud(getInitialProps());
    const mockTextFilter = 'hello';
    const spy = spyOn(component.props, 'dispatch');
    component.handleFilterChanged({ target: { value: mockTextFilter } });
    expect(spy).toHaveBeenCalled();
    const action = spy.calls[0].arguments[0];
    expect(action).toEqual(applyFilter(mockTextFilter));
  });
  it('should handle user name changes', () => {
    const component = new Crud(getInitialProps());
    const spy = spyOn(component.props, 'dispatch');
    const mockName = 'John';
    component.handleUserNameChanged({ target: { value: mockName } });
    expect(spy).toHaveBeenCalled();
    const action = spy.calls[0].arguments[0];
    expect(action).toEqual(editUser(mockName, ''));
  });
  it('should handle user surname changes', () => {
    const component = new Crud(getInitialProps());
    const spy = spyOn(component.props, 'dispatch');
    const mockSurname = 'Doe';
    component.handleUserSurnameChanged({ target: { value: mockSurname } });
    expect(spy).toHaveBeenCalled();
    const action = spy.calls[0].arguments[0];
    expect(action).toEqual(editUser('', mockSurname));
  });
  describe('handleSelectedUserChanged', () => {
    it('should dispatch to select the user', () => {
      const component = new Crud(getInitialProps(createUsersList()));
      const spy = spyOn(component.props, 'dispatch');
      const mockUserId = 'u2';
      component.handleSelectedUserChanged({ target: { value: mockUserId } });
      expect(spy).toHaveBeenCalled();
      const action = spy.calls[0].arguments[0];
      expect(action).toEqual(selectUser(mockUserId));
    });
    it('should dispatch to set the in-edit user', () => {
      const users = createUsersList();
      const component = new Crud(getInitialProps(users));
      const spy = spyOn(component.props, 'dispatch');
      const userToSelect = users[2];
      component.handleSelectedUserChanged({ target: { value: userToSelect.id } });
      expect(spy).toHaveBeenCalled();
      const action = spy.calls[1].arguments[0];
      expect(action).toEqual(editUser(userToSelect.name, userToSelect.surname));
    });
  });
  it('should add current user', () => {
    const component = new Crud(getInitialProps());
    const spy = spyOn(component.props, 'dispatch');
    component.props.editUser.name = 'John';
    component.props.editUser.surname = 'Doe';
    component.addCurrentUser();
    expect(spy).toHaveBeenCalled();
    const action = spy.calls[0].arguments[0];
    expect(action).toEqual(createUser('John', 'Doe'));
  });
  describe('updateCurrentUser', () => {
    it('should not update if there isnt a selected user', () => {
      const component = new Crud(getInitialProps());
      const spy = spyOn(component.props, 'dispatch');
      component.updateCurrentUser();
      expect(spy).toNotHaveBeenCalled();
    });
    it('should update the selected user', () => {
      const component = new Crud(getInitialProps(
        createUsersList(),
        'u3',
        { name: 'John', surname: 'Doe' }
      ));
      const spy = spyOn(component.props, 'dispatch');
      component.updateCurrentUser();
      expect(spy).toHaveBeenCalled();
      const action = spy.calls[0].arguments[0];
      expect(action).toEqual(
        updateUser('u3', 'John', 'Doe')
      );
    });
  });
  describe('deleteCurrentUser', () => {
    it('should not try to delete if there isnt a selected user', () => {
      const component = new Crud(getInitialProps());
      const spy = spyOn(component.props, 'dispatch');
      component.deleteCurrentUser();
      expect(spy).toNotHaveBeenCalled();
    });
    it('should delete the selected user', () => {
      const component = new Crud(getInitialProps(
        createUsersList(),
        'u3'
      ));
      const spy = spyOn(component.props, 'dispatch');
      component.deleteCurrentUser();
      expect(spy).toHaveBeenCalled();
      const action = spy.calls[0].arguments[0];
      expect(action).toEqual(
        deleteUser('u3')
      );
    });
    it('should unset the selected user', () => {
      const component = new Crud(getInitialProps(
        createUsersList(),
        'u3'
      ));
      const spy = spyOn(component.props, 'dispatch');
      component.deleteCurrentUser();
      const action = spy.calls[1].arguments[0];
      expect(action).toEqual(
        selectUser(null)
      );
    });
  });
});
