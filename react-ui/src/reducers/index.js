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
  data: [], // items
  isFetching: false, //bool
  didInvalidate: false,
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

/** API Reducers*/
function recentlyPlayedSongs(state=initialState, action) {
  // console.log('recentlyPlayedSongs reducer:', state, action);
  switch (action.type){
    case REQUEST_PLAYEDSONGS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVED_PLAYEDSONGS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.playedSongs,
        lastUpdated: action.receivedAt
      });
    case INVALIDATE_PLAYEDSONGS:
      return Object.assign({}, state, {didInvalidate: true});
    case SET_SORT_FILTER:
      return Object.assign({}, state, {
        sortFilter: action.filter,
        data: state.data
      });
    default:
      return state
  }
}

let rootReducer = combineReducers({
  recentlyPlayedSongs,
  // sortTable
});
/**
 reducers
 (previousState, action) => newState

 Things never to do inside a reducer
 1) Mutate its arguments;

 2) Perform side effects like API calls and routing transitions;

 3) Call non-pure functions, e.g. Date.now() or Math.random().
 * */

export default  rootReducer