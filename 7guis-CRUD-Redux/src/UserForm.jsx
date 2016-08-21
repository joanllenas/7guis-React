import React, { PropTypes } from 'react';
import { userFormStyles } from './styles';

export default function UserForm(props) {
  const { editUser } = props;
  return (
    <div style={ userFormStyles }>
      <input
        type="text"
        placeholder="Name"
        value={ editUser.name }
        onChange={ props.onUserNameChanged }
      />
      <input
        type="text"
        placeholder="Surname"
        value={ props.editUser.surname }
        onChange={ props.onUserSurnameChanged }
        style={ { marginTop: '5px' } }
      />
    </div>
  );
}

UserForm.propTypes = {
  editUser: PropTypes.object.isRequired,
  onUserNameChanged: PropTypes.func.isRequired,
  onUserSurnameChanged: PropTypes.func.isRequired,
};
