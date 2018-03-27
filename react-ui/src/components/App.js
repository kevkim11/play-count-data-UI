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
    // Initial fetch call when component did mount
    dispatch(fetchPlayedSongIfNeeded())
  }

  render() {
    // if(!this.state.data){return <p> {'LOADING'} </p>}
    // const {data} = this.state;
    console.log(this.props);
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

function mapStateToProps(state) {
  /**
   * Takes in a state -> props
   * */
  console.log('mapStateToProps',state);
  const {
    // sortFilter,
    isFetching,
    didInvalidate,
    data, // items
    lastUpdated
  } = state;
  console.log('THIS STATE IS!!!!', state)
  return {
    didInvalidate: didInvalidate || false,
    data: data || [],
    isFetching: isFetching || false,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)

// export default App;
