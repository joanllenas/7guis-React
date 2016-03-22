import { APPLY_FILTER } from '../actions/actionTypes';

export function filterText(state = '', action) {
  switch (action.type) {
    case APPLY_FILTER:
      return action.payload.text;
    default:
      return state;
  }
}
