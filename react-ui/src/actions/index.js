import fetch from "cross-fetch";

/**our constants*/
//SORT
export const SET_SORT_FILTER = 'SET_SORT_FILTER';
export const SortFilters = {
  ASC: 'ASC',
  DESC: 'DESC',
  UNSORTED: 'UNSORTED'
};

// API
export const REQUEST_PLAYEDSONGS = 'REQUEST_PLAYEDSONGS';
export const RECEIVED_PLAYEDSONGS = 'RECEIVED_PLAYEDSONGS';
export const INVALIDATE_PLAYEDSONGS = 'INVALIDATE_PLAYEDSONGS'

//Sort Table Action Creators
export function setSortFilter(filter) {
  return { type: SET_SORT_FILTER, filter }
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
    playedSongs: json.data.children.map(child => child.data),
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

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))
export function fetchPlayedSongs(){
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  return function (dispatch) {
    dispatch(requestPlayedSongs())
    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    let fetchURL = '/api/playedsong';
    return fetch(fetchURL)
      .then(response => response.json(),
            error => console.log('an error has occured', error)
      ).then(json=> dispatch(receivedPlayedSongs(json)))
  }
}
// getPlayedSong(){
//   /**
//    * Ajax call to get playedsong
//    * */
//   let fetchURL = '/api/playedsong';
//   fetch(fetchURL)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`status ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(json => {
//       console.log(json);
//       this.setState({
//         data: json,
//         fetching: false
//       });
//     }).catch(e => {
//     console.log(`Timestamp API call failed: ${e}`);
//     this.setState({
//       fetching: false
//     });
//   })
// }
