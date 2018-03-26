import {
  SET_SORT_FILTER,
  SortFilters
} from '../actions'

const initialState = {
  sortFilter: SortFilters.UNSORTED,
  data: [] // null
};

const { UNSORTED } = SET_SORT_FILTER;

function sortFilter(state = UNSORTED, action) {
  switch (action.type) {
    case SET_SORT_FILTER:
      return action.filter;
    default:
      return state;
  }
}

function sortTable(state=initialState, action) {
  switch(action.type) {
    case SET_SORT_FILTER:
      return Object.assign({}, state, {
        sortFilter: action.filter
      });
    default:
      // Return the previous state as the default for any unknown action
      return state
  }
}

export default function reducer(state={}, action){
  /**
   * MAIN REDUCER
   Note that each of these reducers is managing its own part of the global state.
   The state parameter is different for every reducer, and corresponds to the part of the state it manages.
   */
  return {
    sortFilter: sortFilter(state.sortFilter, action)
  }
}