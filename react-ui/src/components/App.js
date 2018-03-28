import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  SET_SORT_FILTER, SortFilters,
  fetchPlayedSongIfNeeded, setSortFilter,
} from '../actions'
import PlayCountTable from '../containers/PlayCountTable.js' // Container Component
import '../css/App.css';

class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // Initial fetch call when component did mount
    dispatch(fetchPlayedSongIfNeeded());
  }

  // sortData(){
  //   const {data, sortFilter} = this.props;
  //   let newSortedList = Object.assign({}, data);
  //   if(sortFilter==='ASC'){
  //     newSortedList = data.slice().sort(function(a, b){
  //       if(a.name < b.name) return 1;
  //       if(a.name > b.name) return -1;
  //       return 0
  //     });
  //   } else if(sortFilter==='DESC'){
  //     newSortedList = data.slice().sort(function(a, b){
  //       if(a.name < b.name) return -1;
  //       if(a.name > b.name) return 1;
  //       return 0
  //     });
  //   } else if(sortFilter==='UNSORTED') {
  //     return data
  //   }
  //   return newSortedList
  // }

  render() {
    console.log('INSIDE RENDER OF APP',this.props);
    const {data, isFetching, sortFilter, dispatch} = this.props;
    console.log('isFetching',isFetching);
    console.log('data',data);
    if(isFetching && !data){return <p> {'LOADING'} </p>}
    if(!isFetching && !data){return <p> {'EMPTY'} </p>}
    const nav = (
      <div>
        <button onClick={()=>dispatch(setSortFilter(SortFilters.ASC))}> ASC</button>
        <button onClick={()=>dispatch(setSortFilter(SortFilters.DESC))}>DESC</button>
        <button onClick={()=>dispatch(setSortFilter(SortFilters.UNSORTED))}>UNSORTED</button>
      </div>
    );
    return (
      <div className={'container'}>
        {nav}
        <PlayCountTable data={data} sortFilter={sortFilter}/>
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

/**
 * state = redux state
 * const mapStateToProps = (state) => ({})
 */
function mapStateToProps(state){
  // Get the reducer from the state
  console.log(state);
  const { recentlyPlayedSongs } = state;
  const {data, isFetching, dispatch, sortFilter} = recentlyPlayedSongs;
  return({data, isFetching, dispatch, sortFilter})
}

export default connect(mapStateToProps)(App)

