import React, {PropTypes} from 'react';
import {filterUsersByPrefix, fullNameFromUser} from './utils';

class UserList extends React.Component {
  render(){
    return (
      <div style={ this.props.styles }>
        <select
          style={ selectStyles }
          multiple={ true }
          value={ this.props.selectedUser ? this.props.selectedUser.id : null }
          onChange={ this.props.onSelectedUserChanged }>
          {
            filterUsersByPrefix(
              this.props.users,
              this.props.filterText
            ).map( function(user) {
                return (<option
                          key={ user.id }
                          value={ user.id }>
                          { fullNameFromUser(user) }
                        </option>);
            })
          }
        </select>
      </div>
    );
  }
}

const selectStyles = {
  width:'100%',
  height:'100%'
};

export default UserList;
