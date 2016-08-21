import React, {PropTypes} from 'react';

class UserFilter extends React.Component {
  render(){
    return (
      <div style={ this.props.styles }>
        <input
          value={ this.props.filterText }
          onChange={ this.props.onFilterChange }
          placeholder="Filter prefix" />
      </div>
    );
  }
}

export default UserFilter;
