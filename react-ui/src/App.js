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
    // this._sort = this._sort.bind(this);
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

  // function createArtistsName(props){
  //   /*
  //     Helper Function for
  //     getUsersTopTracks
  //    */
  //   let artistsName = "";
  //   if(props['artists'].length > 1) {
  //     props['artists'].forEach((artist)=>{
  //       artistsName += (artist.name + ', ')
  //     });
  //     artistsName = artistsName.replace(/,\s*$/, "");
  //   } else {
  //     artistsName = props.artists[0].name
  //   }
  //   return artistsName
  // }

  render() {
    if(!this.state.data){return <p> {'LOADING'} </p>}
    const {data} = this.state;

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
          label="Index"
          // cellDataGetter={({rowData}) => rowData.index}
          cellRenderer={({rowIndex})=>rowIndex+1}
          dataKey="index"
          // disableSort={!this._isSortEnabled()}
          width={60}
        />
        <Column
          label='Name'
          dataKey='name'
          width={200}
        />
        <Column
          label='Artists'
          dataKey='artists'
          cellDataGetter={function({rowData}){
            let artistsName = "";
            if(rowData['artists'].length > 1) {
              rowData['artists'].forEach((artist)=>{
                artistsName += (artist.name + ', ')
              });
              artistsName = artistsName.replace(/,\s*$/, "");
            } else {
              artistsName = rowData.artists[0].name
            }
            return artistsName
          }}
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

  // _sort({})
}

export default App;
