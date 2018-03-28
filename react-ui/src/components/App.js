import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchPlayedSongIfNeeded} from '../actions'
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

  render() {
    console.log('INSIDE RENDER OF APP',this.props);
    const {data, isFetching, sortFilter, sortBy} = this.props;
    console.log('isFetching',isFetching);
    console.log('data',data);
    if(isFetching && !data){return <p> {'LOADING'} </p>}
    if(!isFetching && !data){return <p> {'EMPTY'} </p>}
    return (
      <div className={'container'}>
        <PlayCountTable data={data} sortFilter={sortFilter} sortBy={sortBy}/>
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
  const { recentlyPlayedSongs } = state;
  const {data, isFetching, dispatch, sortFilter, sortBy} = recentlyPlayedSongs;
  return({data, isFetching, dispatch, sortFilter, sortBy})
}

export default connect(mapStateToProps)(App)

