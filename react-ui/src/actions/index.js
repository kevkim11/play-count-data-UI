
/**our constants*/
//SORT
export const SET_SORT_FILTER = 'SET_SORT_FILTER';
// API
export const REQUEST_PLAYEDSONGS = 'REQUEST_PLAYEDSONGS';
export const RECEIVED_PLAYEDSONGS = 'RECEIVED_PLAYEDSONGS';

export const SortFilters = {
  ASC: 'ASC',
  DESC: 'DESC',
  UNSORTED: 'UNSORTED'
};

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
function receivedPlayedSongs(playedSongs){
  return {
    type: REQUEST_PLAYEDSONGS,
    playedSongs,
    receivedAt: Date.now()
  }
}
// 3) An action informing the reducers that the request failed.
