import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable'
import 'react-virtualized/styles.css';
import './css/App.css';
import MyTable from './components/spotifyTable.js'

class App extends Component {
  static childContextTypes = {
    list: PropTypes.instanceOf(Immutable.list)
  };

  getChildContext(){
    return {list: this.state.data};
  }

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      fetching: true,
    };
  }



  componentDidMount() {
    this.getPlayedSong()
  }

  getPlayedSong(){
    /**
    * Ajax call to get playedsong
    * */
    let fetchURL = '/api/playedsong';
    fetch(fetchURL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        console.log(json);
        this.setState({
          data: json,
          fetching: false
        });
      }).catch(e => {
      console.log(`Timestamp API call failed: ${e}`);
      this.setState({
        fetching: false
      });
    })
  }

  getTimestamp(){
    /**
     * Ajax call to get timestamps
     * */
    let fetchURL = '/api/timestamp';
    fetch(fetchURL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        // console.log(json);
        this.setState({
          data: json,
          fetching: false
        });
      }).catch(e => {
        console.log(`Timestamp API call failed: ${e}`);
        this.setState({
          fetching: false
        });
    })
  }

  render() {
    if(!this.state.data){return <p> {'LOADING'} </p>}
    const {data} = this.state;

    return (
      <MyTable list={data}/>
    );
  }
}

App.childContextTypes = {
  list: PropTypes.instanceOf(Immutable.list)
};

export default App;
