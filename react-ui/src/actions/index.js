import fetch from "cross-fetch";

/**our constants*/
//SORT
export const SET_SORT_FILTER = 'SET_SORT_FILTER';
export const SortFilters = {
  ASC: 'ASC',
  DESC: 'DESC',
  UNSORTED: 'UNSORTED'
};
export const SortBys = {
  name: 'name',
  artists: 'artists',
  album: 'album',
  playCount: 'playCount',
  lastPlayed: 'lastPlayed',
  dateAdded: 'dateAdded',
};
// API
export const REQUEST_PLAYEDSONGS = 'REQUEST_PLAYEDSONGS';
export const RECEIVED_PLAYEDSONGS = 'RECEIVED_PLAYEDSONGS';
export const INVALIDATE_PLAYEDSONGS = 'INVALIDATE_PLAYEDSONGS';
// Views
export const SET_VIEW_FILTER = 'SET_VIEW';
export const ViewBys = {
  songs: 'songs',
  artists: 'artists'
};

/** Sort Table Action Creator*/
export function setSortFilter(filter) {
  // Start Here.
  return { type: SET_SORT_FILTER, filter }
}

/** Set View Filter Action Creator*/
export function setViewFilter(viewsBy, sortBy, sortFilter) {
  // Start Here.
  return { type: SET_VIEW_FILTER, viewsBy, sortBy, sortFilter }
}

/** API Call Action Creator*/
// 1) An action informing the reducers that the request began.
function requestPlayedSongs(){
  return {type: REQUEST_PLAYEDSONGS}
}
// 2) An action informing the reducers that the request finished successfully.
function receivedPlayedSongs(json){
  return {
    type: RECEIVED_PLAYEDSONGS,
    playedSongs: json,
    receivedAt: Date.now()
  }
}
// TODO 3) An action informing the reducers that the request failed.

// extra) invalidate
export function invalidatePlayedSongs() {
  return {
    type: INVALIDATE_PLAYEDSONGS
  }
}

/** THUNK action creator!*/
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))
export function fetchPlayedSongs(){
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  return  (dispatch) => {
    dispatch(requestPlayedSongs());
    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    let fetchURL = '/api/playedsong';
    return fetch(fetchURL)
      .then(response => response.json())
      // .catch(e =>{console.log(`Timestamp API call failed: ${e}`)}) // TODO Need to do proper error handling
      .then(json=> {
        console.log(json);
        dispatch(receivedPlayedSongs(json)
      )})
  }
}

function shouldFetchPlayedSongs(state){
  const items = state.data;
  if(!items) {
    return true
  } else if(state.isFetching){
    return false
  } else {
    return state.didInvalidate
  }
}

export function fetchPlayedSongIfNeeded(){
  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.
  return (dispatch, getState) => {
    console.log('getstate',getState());
    if(shouldFetchPlayedSongs(getState())){
      return dispatch(fetchPlayedSongs())
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    }
  }
}
