import React, { Component } from 'react';
import { Column, Table, AutoSizer, SortDirection } from 'react-virtualized';
import 'react-virtualized/styles.css';
import './css/App.css';
import styles from './css/table.css';

// import ReactTable from "react-table";

class App extends Component {
  constructor(props) {
    super(props);

    const sortBy = 'index';
    const sortDirection = SortDirection.ASC;
    // const sortedList = this._sortList({sortBy, sortDirection});

    this.state = {
      data: null,
      fetching: true,
      sortBy: sortBy,
      sortDirection: sortDirection,
      // sortedList: sortedList,
    };

    this._rowClassName = this._rowClassName.bind(this);
    // this._sort = this._sort.bind(this);
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
      <AutoSizer disableHeight>
        {({width}) => (
          <Table
            width={width}
            // height={height}
            // width={500}
            height={500}
            rowClassName={this._rowClassName}
            headerHeight={20}
            rowHeight={30}
            rowCount={data.length}
            rowGetter={({ index }) => data[index]}
            sort={this._sort}
            sortBy={this.state.sortBy}
            sortDirection={this.state.sortDirection}
            {...this.props}
          >
            <Column
              label="Index"
              cellRenderer={({rowIndex})=>rowIndex+1}
              dataKey="index"
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
            <Column
              label={'Play Count'}
              dataKey='timestamps'
              cellDataGetter={function({rowData}){
                return rowData.timestamps.length
              }}
              width={100}/>
          </Table>
        )}
      </AutoSizer>
    );
  }

  _rowClassName({index}) {
    if (index < 0) {
      return styles.headerRow;
    } else {
      return index % 2 === 0 ? styles.evenRow : styles.oddRow;
    }
  }

  // _sort({sortBy, sortDirection}) {
  //   const sortedList = this._sortList({sortBy, sortDirection});
  //
  //   this.setState({sortBy, sortDirection, sortedList});
  // }
  //
  // _sortList({sortBy, sortDirection}) {
  //   const {list} = this.context;
  //
  //   return list
  //     .sortBy(item => item[sortBy])
  //     .update(
  //       list => (sortDirection === SortDirection.DESC ? list.reverse() : list),
  //     );
  // }
}

export default App;
