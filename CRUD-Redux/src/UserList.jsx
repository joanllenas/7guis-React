import React, { PropTypes } from 'react';
import { userListStyles } from './styles';
import { filterUsersByPrefix, fullNameFromUser } from './utils';

const selectStyles = {
  width: '100%',
  height: '100%',
};

function createOption(user) {
  return (
    <option
      key={ user.id }
      value={ user.id }
    >
      { fullNameFromUser(user) }
    </option>
  );
}

export default function UserList(props) {
  return (
    <div style={ userListStyles }>
      <select
        style={ selectStyles }
        multiple={ true }
        value={ props.selectedUser ? props.selectedUser : null }
        onChange={ props.onSelectedUserChanged }
      >
      {
        filterUsersByPrefix(props.users, props.filterText)
          .map(createOption)
      }
      </select>
    </div>
  );
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  filterText: PropTypes.string.isRequired,
  selectedUser: PropTypes.string,
  onSelectedUserChanged: PropTypes.func.isRequired,
};
