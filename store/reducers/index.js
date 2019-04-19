import {
  RECEIVE_ENTRIES,
  ADD_ENTRY,
} from '../actions';

export const INIT_STATE_ENTRIES = [];

const entriesReducer = (state = INIT_STATE_ENTRIES, action) => {
  switch (action.type) {
    case RECEIVE_ENTRIES:
      return {
        ...state,
        ...action.entries,
      };
    case ADD_ENTRY:
      return {
        ...state,
        ...action.entry,
      };
    default:
      return state;
  }
};

export default entriesReducer;
