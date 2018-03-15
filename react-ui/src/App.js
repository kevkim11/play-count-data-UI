import React, { Component } from 'react';
import { Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';
import './css/App.css';
import styles from './css/table.css';

// import ReactTable from "react-table";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      fetching: true
    };

    this._rowClassName = this._rowClassName.bind(this);
  }

  componentDidMount() {
    this.getPlayedSong()
  }

  getPlayedSong(){
    let fetchURL = '/api/playedsong';
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

  getTimestamp(){
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
    console.log(data);
    console.log(styles);

    // const {data} = this.state;
    // console.log(data);
    // const columns = [{
    //   Header: 'Name',
    //   accessor: 'name' // String-based value accessors!
    // }, {
    //   id: 'artistsName', // Required because our accessor is not a string
    //   Header: 'Artists',
    //   accessor: d => d.artists.name
    // }];
    //
    return (
      <Table
        width={500}
        height={1000}
        rowClassName={this._rowClassName}
        headerHeight={20}
        rowHeight={30}
        rowCount={data.length}
        rowGetter={({ index }) => data[index]}
      >
        <Column
          label='Name'
          dataKey='name'
          width={200}
        />

      </Table>
    );
  }

  _rowClassName({index}) {
    if (index < 0) {
      return styles.headerRow;
    } else {
      return index % 2 === 0 ? styles.evenRow : styles.oddRow;
    }
  }

}

export default App;
