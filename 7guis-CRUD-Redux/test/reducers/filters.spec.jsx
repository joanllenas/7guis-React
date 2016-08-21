import expect from 'expect';
import {
  APPLY_FILTER,
 } from '../../src/actions/actionTypes';
import {
  filterText,
} from '../../src/reducers/filters';

describe('filterText reducer', () => {
  it('should return an empty string for the initial state', () => {
    expect(filterText(undefined, {})).toEqual('');
  });
  it('should handle APPLY_FILTER', () => {
    const action = {
      type: APPLY_FILTER,
      payload: {
        text: 'hello',
      },
    };
    expect(filterText('', action)).toEqual('hello');
  });
});
