import React, { Component } from 'react';
import PlayCountTable from './containers/PlayCountTable.js'
import './css/App.css';

class App extends Component {

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
      <PlayCountTable data={data}/>
    );
  }
}

export default App;
