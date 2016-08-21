import React from 'react';
import expect from 'expect';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} from 'react-addons-test-utils';
import {createUsersList} from './users.stub';
import Crud, {EMPTY_EDIT_USER} from '../src/Crud';

describe('Crud', () => {

  describe('Initially', () => {
    it('Sets provided users', ()=>{
      const users = createUsersList();
      const component = renderIntoDocument(<Crud initialUsers={users} />);
      expect(component.state.users).toEqual(users);
    });
    it('Sets selected user to null', ()=>{
      const component = renderIntoDocument(<Crud />);
      expect(component.state.selectedUser).toBe(null);
    });
    it('Sets edit user to EMPTY_EDIT_USER', ()=>{
      const component = renderIntoDocument(<Crud />);
      expect(component.state.editUser).toBe(EMPTY_EDIT_USER);
    });
    it('Sets filter text to an empty string', ()=>{
      const component = renderIntoDocument(<Crud />);
      expect(component.state.filterText).toBe('');
    });
  });

  it('handles filter changes', ()=>{
    const component = renderIntoDocument(<Crud />);
    component.handleFilterChanged({
      target: {
        value: 'something'
      }
    });
    expect(component.state.filterText).toBe('something');
  });

  it('handles selected user changes', ()=>{
    const users = [
      {id:1, name:'Phillip', surname:'Glass'},
      {id:2, name:'David', surname:'Bowie'}
    ];
    const component = renderIntoDocument(<Crud initialUsers={ users } />);
    component.handleSelectedUserChanged({
      target: {
        value: 2
      }
    });
    expect(component.state.selectedUser).toEqual(
      {id:2, name:'David', surname:'Bowie'}
    );
  });

  it('sets editUser when selected user changes', ()=>{
    const users = [
      {id:1, name:'Phillip', surname:'Glass'},
      {id:2, name:'David', surname:'Bowie'}
    ];
    const component = renderIntoDocument(<Crud initialUsers={ users } />);
    component.handleSelectedUserChanged({
      target: {
        value: 2
      }
    });
    expect(component.state.editUser).toEqual(
      {name:'David', surname:'Bowie'}
    );
  });

  it('handles user name changes', ()=>{
    const component = renderIntoDocument(<Crud />);
    component.handleUserNameChanged({
      target: {
        value: 'John'
      }
    });
    expect(component.state.editUser).toEqual(
      {name:'John', surname:''}
    );
  });

  it('handles user surname changes', ()=>{
    const component = renderIntoDocument(<Crud />);
    component.handleUserSurnameChanged({
      target: {
        value: 'Doe'
      }
    });
    expect(component.state.editUser).toEqual(
      {name:'', surname:'Doe'}
    );
  });

  it('deletes the currently selected user', ()=>{
      const users = createUsersList();
      const component = renderIntoDocument(<Crud initialUsers={users} />);
      expect(component.state.users.length).toBe(5);
      component.state.selectedUser = users[1];
      component.deleteCurrentUser();
      expect(component.state.users.length).toBe(4);
      expect(component.state.selectedUser).toBe(null);
  });

  it('disables delete action when there is no user selected', ()=>{
    const component = renderIntoDocument(<Crud />);
    const spy = expect.spyOn(component, 'setState');
    component.deleteCurrentUser();
    expect(spy).toNotHaveBeenCalled();
  });

  it('updates the currently selected user with the entered name and surname', ()=>{
      const users = createUsersList();
      const component = renderIntoDocument(<Crud initialUsers={users} />);
      component.state.selectedUser = users[1];
      component.state.editUser = {
        name: 'SomeName',
        surname: 'SomeSurname'
      };
      component.updateCurrentUser();
      expect(component.state.users[1]).toEqual({
        id:'u2',
        name:'SomeName',
        surname:'SomeSurname'
      });
  });

  it('disables update action when there is no user selected', ()=>{
    const component = renderIntoDocument(<Crud />);
    const spy = expect.spyOn(component, 'setState');
    component.updateCurrentUser();
    expect(spy).toNotHaveBeenCalled();
  });

  it('adds a new user with the current editUser data', ()=>{
      const component = renderIntoDocument(<Crud />);
      component.state.editUser = {
        name: 'SomeAddName',
        surname: 'SomeAddSurname'
      };
      component.addCurrentUser();
      const newUser = component.state.users[component.state.users.length-1];
      expect(newUser.name).toEqual('SomeAddName');
      expect(newUser.surname).toEqual('SomeAddSurname');
  });

  it('disables update and delete buttons when there is no user selected', ()=>{
    const component = renderIntoDocument(<Crud />);
    let buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    let updateButton = buttons[1];
    let deleteButton = buttons[2];
    expect(updateButton.disabled).toBe(true);
    expect(deleteButton.disabled).toBe(true);
  });

  it('enables update and delete buttons when a user is selected', ()=>{
    const component = renderIntoDocument(<Crud initialUsers={createUsersList()} />);
    component.handleSelectedUserChanged({target:{value:'u1'}});
    let buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    let updateButton = buttons[1];
    let deleteButton = buttons[2];
    expect(updateButton.disabled).toBe(false);
    expect(deleteButton.disabled).toBe(false);
  });

  it('adds a new user when pressing the add user button', ()=>{
    const component = renderIntoDocument(<Crud />);
    let buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    let createButton = buttons[0];
    const spy = expect.spyOn(component, 'addCurrentUser');
    Simulate.click(createButton);
    expect(spy).toHaveBeenCalled();
  });

  it('updates the currently selected user when pressing the update user button', ()=>{
    const component = renderIntoDocument(<Crud initialUsers={createUsersList()} />);
    component.handleSelectedUserChanged({target:{value:'u1'}});
    let buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    let updateButton = buttons[1];
    const spy = expect.spyOn(component, 'updateCurrentUser');
    Simulate.click(updateButton);
    expect(spy).toHaveBeenCalled();
  });
});
