import React, {PropTypes} from 'react';
import {findUserById, generateUserId} from './utils.jsx';
import UserFilter from './UserFilter';
import UserList from './UserList';
import UserForm from './UserForm';

const propTypes = {
  initialUsers: PropTypes.array
};

const defaultProps = {
  initialUsers: []
}

export const EMPTY_EDIT_USER = {
  name: '',
  surname: ''
};

class Crud extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: this.props.initialUsers,
      selectedUser: null,
      editUser: EMPTY_EDIT_USER,
      filterText: ''
    };
    this.handleFilterChanged = this.handleFilterChanged.bind(this);
    this.handleSelectedUserChanged = this.handleSelectedUserChanged.bind(this);
    this.handleUserNameChanged = this.handleUserNameChanged.bind(this);
    this.handleUserSurnameChanged = this.handleUserSurnameChanged.bind(this);
  }

  handleFilterChanged(evt) {
    const filterText = evt.target.value;
    this.setState({
      filterText: filterText
    });
  }

  handleSelectedUserChanged(evt) {
    const userId = evt.target.value;
    const filteredUser = findUserById(this.state.users, userId);
    this.setState({
      selectedUser: filteredUser,
      editUser: {
        name: filteredUser.name,
        surname: filteredUser.surname
      }
    });
  }

  handleUserNameChanged(evt) {
    const newName = evt.target.value;
    this.setState({
      editUser: {
        name: newName,
        surname: this.state.editUser.surname
      }
    });
  }

  handleUserSurnameChanged(evt) {
    const newSurname = evt.target.value;
    this.setState({
      editUser: {
        name: this.state.editUser.name,
        surname: newSurname
      }
    });
  }

  deleteCurrentUser() {
    if(this.state.selectedUser!==null) {
      const userIndex = this.state.users.indexOf(this.state.selectedUser);
      this.state.users.splice(userIndex, 1);
      this.setState({
        users: this.state.users.slice(),
        selectedUser: null
      });
    }
  }

  updateCurrentUser() {
    if(this.state.selectedUser!==null) {
      const updatedUser = {
        id: this.state.selectedUser.id,
        name: this.state.editUser.name,
        surname: this.state.editUser.surname
      };
      const userIndex = this.state.users.indexOf(this.state.selectedUser);
      this.state.users.splice(userIndex, 1, updatedUser);
      this.setState({
        users: this.state.users.slice()
      });
    }
  }

  addCurrentUser() {
    const newUser = {
      id: generateUserId(),
      name: this.state.editUser.name,
      surname: this.state.editUser.surname
    };
    this.state.users.push(newUser);
    this.setState({
      users: this.state.users.slice()
    });
  }

  render() {
    return (
      <div style={ crudContainerStyles }>
        <UserFilter
          styles={ userFilterStyles }
          onFilterChange={ this.handleFilterChanged }
          filterText={ this.state.filterText } />
        <UserList
          styles={ userListStyles }
          users={ this.state.users }
          filterText={ this.state.filterText }
          onSelectedUserChanged={ this.handleSelectedUserChanged } />
        <UserForm
          styles={ userFormStyles }
          editUser={ this.state.editUser }
          onUserNameChanged={ this.handleUserNameChanged }
          onUserSurnameChanged={ this.handleUserSurnameChanged } />
        <div style={ buttonBarStyles }>
          <button
            onClick={ (e)=>{this.addCurrentUser()} }>
            Create
          </button>
          <button
            onClick={ (e)=>{this.updateCurrentUser()} }
            disabled={ this.state.selectedUser===null }>
            Update
          </button>
          <button
            onClick={ (e)=>{this.deleteCurrentUser()} }
            disabled={ this.state.selectedUser===null }>
            Delete
          </button>
        </div>
      </div>
    );
  }
}

Crud.propTypes = propTypes;
Crud.defaultProps = defaultProps;

const crudContainerStyles = {
  position:'absolute',
  left:'calc(50% - 200px)',
  top:'calc(50% - 150px)',
  width:'400px', height:'300px',
  backgroundColor:'#DDD',
  padding:'5px'
};

const userFilterStyles = {
  position:'absolute',
  left:0, right:0,
  height:'50px', top:0,
  backgroundColor:'#DDD',
  padding:'5px'
};

const userListStyles = {
  position: 'absolute',
  left:0, width:'50%',
  top:'50px', bottom:'50px',
  backgroundColor: '#AAA',
  padding: '5px'
};

const userFormStyles = {
  position: 'absolute',
  right:0, width:'50%',
  top:'50px', bottom:'50px',
  backgroundColor: '#CCC',
  padding: '5px'
};

const buttonBarStyles = {
  position: 'absolute',
  left:0, right:0,
  height:'50px', bottom:0,
  backgroundColor: '#BBB',
  padding: '5px'
};

export default Crud;
