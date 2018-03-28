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

// function sortTable(state=initialState, action) {
//   console.log('in sortTable, the state is', state);
//   switch(action.type) {
//     case SET_SORT_FILTER:
//       let newSortedList;
//       if(state.sortFilter===SortFilters.UNSORTED){
//         // If state = UNSORTED, then you want to ASC
//         // UNSORTED -> ASC
//         console.log('Currently UNSORTED', state);
//         newSortedList = state.data.sort( (a, b)=>{
//           return a.name - b.name
//         });
//         console.log('newSortedList IS ',newSortedList);
//       } else if(state.sortFilter===SortFilters.ASC){
//         // If state = ASC, then you want to DESC
//         // ASC -> DESC
//         console.log('in ASC', state);
//         newSortedList = state.data.sort( (a, b)=>{
//           return b.name - a.name
//         });
//
//       } else if(state.sortFilter===SortFilters.DESC){
//         console.log('Currently DESC', state);
//         // If state = DESC, then you want to DESC
//         // DESC -> UNSORTED
//       }
//
//       console.log('SET_SORT_FILTER is', SET_SORT_FILTER)
//       return Object.assign({}, state, {
//         sortFilter: action.filter,
//         data: newSortedList
//       });
//     default:
//       // Return the previous state as the default for any unknown action
//       return state
//   }
// }
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