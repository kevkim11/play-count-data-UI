import {
  SET_SORT_FILTER,
  SortFilters
} from '../actions'
// const { UNSORTED } = SET_SORT_FILTER;

const initialState = {
  sortFilter: SortFilters.UNSORTED,
  isFetching: true, //bool
  didInvalidate: false,
  data: [], // items
};
/** Sort Reducers*/
function sortFilter(state = SortFilters.UNSORTED, action) {
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
/** API Reducers*/

// function recentlyPlayedSongs

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