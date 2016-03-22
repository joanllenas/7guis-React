import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { crudContainerStyles, crudButtonBarStyles } from './styles';
import {
  editUser, selectUser, applyFilter,
  createUser, updateUser, deleteUser,
} from './actions/actionCreators';
import { findUserById } from './utils.jsx';
import UserFilter from './UserFilter';
import UserList from './UserList';
import UserForm from './UserForm';


class Crud extends React.Component {

  constructor(props) {
    super(props);
    this.handleUserNameChanged = this.handleUserNameChanged.bind(this);
    this.handleUserSurnameChanged = this.handleUserSurnameChanged.bind(this);
    this.handleSelectedUserChanged = this.handleSelectedUserChanged.bind(this);
    this.handleFilterChanged = this.handleFilterChanged.bind(this);
    this.addCurrentUser = this.addCurrentUser.bind(this);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
    this.deleteCurrentUser = this.deleteCurrentUser.bind(this);
  }

  handleFilterChanged(evt) {
    const newFilterText = evt.target.value;
    this.props.dispatch(
      applyFilter(newFilterText)
    );
  }

  handleUserNameChanged(evt) {
    const newName = evt.target.value;
    this.props.dispatch(
      editUser(newName, this.props.editUser.surname)
    );
  }

  handleUserSurnameChanged(evt) {
    const newSurname = evt.target.value;
    this.props.dispatch(
      editUser(this.props.editUser.name, newSurname)
    );
  }

  handleSelectedUserChanged(evt) {
    const userId = evt.target.value;
    const { dispatch, users } = this.props;
    const filteredUser = findUserById(users, userId);
    dispatch(selectUser(userId));
    dispatch(editUser(filteredUser.name, filteredUser.surname));
  }

  addCurrentUser() {
    this.props.dispatch(
      createUser(this.props.editUser.name, this.props.editUser.surname)
    );
  }

  updateCurrentUser() {
    const { dispatch, selectedUser } = this.props;
    const { name, surname } = this.props.editUser;
    if (!selectedUser) {
      return;
    }
    dispatch(
      updateUser(selectedUser, name, surname)
    );
  }

  deleteCurrentUser() {
    const { dispatch, selectedUser } = this.props;
    if (!selectedUser) {
      return;
    }
    dispatch(
      deleteUser(selectedUser)
    );
    dispatch(
      selectUser(null)
    );
  }

  render() {
    return (
      <div style={ crudContainerStyles }>
        <UserFilter
          onFilterChange={ this.handleFilterChanged }
          filterText={ this.props.filterText }
        />
        <UserList
          users={ this.props.users }
          filterText={ this.props.filterText }
          onSelectedUserChanged={ this.handleSelectedUserChanged }
        />
        <UserForm
          editUser={ this.props.editUser }
          onUserNameChanged={ this.handleUserNameChanged }
          onUserSurnameChanged={ this.handleUserSurnameChanged }
        />
        <div style={ crudButtonBarStyles }>
          <button
            onClick={ this.addCurrentUser }
          >
            Create
          </button>
          <button
            onClick={ this.updateCurrentUser }
            disabled={ this.props.selectedUser === null }
          >
            Update
          </button>
          <button
            onClick={ this.deleteCurrentUser }
            disabled={ this.props.selectedUser === null }
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

Crud.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editUser: PropTypes.object.isRequired,
  selectedUser: PropTypes.string,
  filterText: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
};


export default connect(state => state)(Crud);
