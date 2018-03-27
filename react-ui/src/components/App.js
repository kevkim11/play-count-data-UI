import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  REQUEST_PLAYEDSONGS,
  RECEIVED_PLAYEDSONGS,
  INVALIDATE_PLAYEDSONGS, fetchPlayedSongIfNeeded, SortFilters,
} from '../actions'
import PlayCountTable from '../containers/PlayCountTable.js' // Post Component
import '../css/App.css';
import fetch from 'cross-fetch'

class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    console.log('dispatch is: ', this.props);
    // Initial fetch call when component did mount
    dispatch(fetchPlayedSongIfNeeded())
    console.log('dispatch is 2: ', this.props);
  }

  render() {
    // if(!this.state.data){return <p> {'LOADING'} </p>}
    // const {data} = this.state;
    console.log('INSIDE RENDER OF APP',this.props);
    const {data, isFetching} = this.props;
    console.log('isFetching',isFetching);
    console.log('data',data);
    if(isFetching && !data){return <p> {'LOADING'} </p>}
    if(!isFetching && !data){return <p> {'EMPTY'} </p>}
    return (
      <div className={'container'}>
      <PlayCountTable data={data}/>
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
  const { recentlyPlayedSongs } = state
  const {data, isFetching, dispatch} = recentlyPlayedSongs;
  return({data, isFetching, dispatch})
}

export default connect(mapStateToProps)(App)

