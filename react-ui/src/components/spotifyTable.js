import React, { Component } from 'react';
import { Column, Table, AutoSizer, SortDirection, createTableMultiSort, SortIndicator } from 'react-virtualized';
import 'react-virtualized/styles.css';
import styles from '../css/table.css';

class MyTable extends Component {

  constructor(props){
    super(props);

    // const sortBy = null;
    // const sortDirection = null;

    const sortBy = null;
    const sortDirection = null;

    // const sortedList = this._sortList({sortBy, sortDirection});

    this.state = {
      sortBy: sortBy,
      sortDirection: sortDirection,
      list: this.props.data
      // sortedList:
    };

    this._rowClassName = this._rowClassName.bind(this);
    this._headerRenderer = this._headerRenderer.bind(this);
    this._sort = this._sort.bind(this);
  }

  render(){
    const { sortBy, sortDirection } = this.state;

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
            rowCount={this.state.list.length}
            rowGetter={({ index }) => this.state.list[index]}
            sort={this._sort}
            sortBy={sortBy}
            sortDirection={sortDirection}
          >
            <Column
              label="Index"
              // cellDataGetter={({rowData}) => rowData.index}
              cellRenderer={({rowIndex})=>rowIndex+1}
              dataKey="index"
              width={60}
            />
            <Column
              label='Name'
              dataKey='name'
              headerRenderer={this._headerRenderer}
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

  _sort({ sortBy, sortDirection }){
    // console.log(`inside _sort, state is:`);
    // console.log(this.state);
    const {
      sortBy: prevSortBy,
      sortDirection: prevSortDirection,
      list: prevList
    } = this.state;
    console.log(`prevSortDirection is`);
    console.log(prevSortDirection);
    let sortedList;
    if (prevSortDirection === SortDirection.DESC) {
      //
      sortDirection = null;
      sortBy = 'name';
      sortedList = this.props.data;
    } else if(prevSortDirection === SortDirection.ASC){
      sortDirection = SortDirection.DESC;
      sortBy = 'name';
      sortedList = prevList.sort(function(a, b){
        let nameA = a.name.toUpperCase(); // ignore upper and lowercase
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        // names must be equal
        return 0;
      });
    } else {
      // Null
      sortDirection = SortDirection.ASC;
      sortBy = 'name';
      sortedList = prevList.sort(function(a, b){
        let nameA = a.name.toUpperCase(); // ignore upper and lowercase
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });

    }
    console.log(sortedList);
    this.setState({ sortBy, sortDirection, list: sortedList })
  }

  _headerRenderer({dataKey, sortBy, sortDirection}) {
    return (
      <div>
        Name
        {sortBy === dataKey && <SortIndicator sortDirection={sortDirection} />}
      </div>
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

export default MyTable