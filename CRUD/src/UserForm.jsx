import React, {PropTypes} from 'react';

class UserForm extends React.Component {
  render(){
    return (
      <div style={ this.props.styles }>
        <input
          type="text"
          placeholder="Name"
          value={ this.props.editUser.name }
          onChange={ this.props.onUserNameChanged } />
        <input
          type="text"
          placeholder="Surname"
          value={ this.props.editUser.surname }
          onChange={ this.props.onUserSurnameChanged }
          style={ {marginTop:'5px'} } />
      </div>
    );
  }
}

export default UserForm;
