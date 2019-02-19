import * as Count from '../constants';

export function loadingReducer(state = false, action) {
  switch (action.type) {
    case Count.incrementAsync:
      return true;
    case Count.increment:
    case Count.decrement:
      return false;
    default:
      return state;
  }
}
