import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import Immutable from 'immutable'
import { Table } from 'react-bootstrap';
import './css/App.css';

/** Utility Functions*/
function createArtistsName(item){
  /** Helper Function for getUsersTopTracks */
  let artistsName = "";
  if(item['artists'].length > 1) {
    item['artists'].forEach((artist)=>{
      artistsName += (artist.name + ', ')
    });
    artistsName = artistsName.replace(/,\s*$/, "");
  } else {
    artistsName = item['artists'][0].name
  }
  return artistsName
}

function createSongName(item){
  /** Helper Function for getUsersTopTracks*/
  return item.name
}

function createPlayCount(item) {
  return item.timestamps.length
}

class App extends Component {
  // static childContextTypes = {
  //   list: PropTypes.instanceOf(Immutable.list)
  // };

  // getChildContext(){
  //   return {list: this.state.data};
  // }

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

    const tableHead = (
      <thead>
      <tr>
        <th>index</th>
        <th>Name</th>
        <th>Artists</th>
        <th>Play Count</th>
      </tr>
      </thead>
    );

    const tableBody = data.map((item, i) => {
      let artistsName = createArtistsName(item);
      let songName = createSongName(item);
      let playCount = createPlayCount(item);

      return (
        <tr id={i} key={i}>
          <td>{i+1}</td>
          <td>{songName}</td>
          <td>{artistsName}</td>
          <td>{playCount}</td>
        </tr>
      )
    });


    return (
    <Table striped bordered condensed hover>
      {tableHead}
      <tbody>
      {tableBody}
      </tbody>
    </Table>
    );
  }
}

export default App;
