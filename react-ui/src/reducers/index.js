import { combineReducers } from 'redux'
import {
  SET_SORT_FILTER,
  SortFilters,
  REQUEST_PLAYEDSONGS,
  RECEIVED_PLAYEDSONGS,
  INVALIDATE_PLAYEDSONGS
} from '../actions'
// const { UNSORTED } = SET_SORT_FILTER;

const initialState = {
  sortFilter: SortFilters.UNSORTED,
  isFetching: false, //bool
  didInvalidate: false,
  data: [], // items
  lastUpdated: null
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

function recentlyPlayedSongs(state=initialState, action) {
  switch (action.type){
    case REQUEST_PLAYEDSONGS:
      return Object.assign({}, state, {isFetching: true, didInvalidate: false});
    case RECEIVED_PLAYEDSONGS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.playedSongs,
        lastUpdated: action.receivedAt
      });
    case INVALIDATE_PLAYEDSONGS:
      return Object.assign({}, state, {didInvalidate: true});
    default:
      return state
  }
}

let rootReducer = combineReducers({
  recentlyPlayedSongs
})

export default  rootReducer