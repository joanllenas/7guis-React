import React, { PropTypes } from 'react';
import { userFilterStyles } from './styles';

export default function UserFilter(props) {
  return (
    <div style={ userFilterStyles }>
      <input
        value={ props.filterText }
        onChange={ props.onFilterChange }
        placeholder="Filter prefix"
      />
    </div>
  );
}

UserFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filterText: PropTypes.string.isRequired,
};
