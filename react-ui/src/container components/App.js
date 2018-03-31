import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchPlayedSongIfNeeded} from '../actions'
import PlayCountTable from '../presentational components/PlayCountTable.js' // Container Component
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
    const {data, isFetching} = this.props;
    if(isFetching && !data){return <p> {'LOADING'} </p>}
    if(!isFetching && !data){return <p> {'EMPTY'} </p>}
    return (
      <div className={'container'}>
        <PlayCountTable/>
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
  const {data, isFetching, dispatch} = recentlyPlayedSongs;
  return({data, isFetching, dispatch})
}

export default connect(mapStateToProps)(App)

