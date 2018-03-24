import React, { Component } from 'react';
import { Column, Table, AutoSizer, SortDirection, createTableMultiSort, SortIndicator } from 'react-virtualized';
// import Immutable from 'immutable'
// import PropTypes from 'prop-types';
import 'react-virtualized/styles.css';
import styles from '../css/table.css';

class MyTable extends Component {

  // static contextTypes = {
  //   list: PropTypes.instanceOf(Immutable.list)
  // };

  constructor(props, context){
    super(props, context);

    // const sortBy = 'name';
    // const sortDirection = SortDirection.ASC;
    // const sortedList = this._sortList({sortBy, sortDirection});

    const sortBy = null;
    const sortDirection = null;
    const sortedList = [];

    this.state = {
      sortBy: sortBy,
      sortDirection: sortDirection,
      sortedList: sortedList
      // list: props.list
    };

    this._rowClassName = this._rowClassName.bind(this);
    this._headerRenderer = this._headerRenderer.bind(this);
    this._sort = this._sort.bind(this);
  }

  render(){
    const { sortBy, sortDirection, sortedList} = this.state;
    // console.log('sortBy IS::');
    // console.log(sortBy);
    console.log('sortDirection IS::');
    console.log(sortDirection);
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
            rowCount={this.props.list.length}
            rowGetter={({ index }) => this.props.list[index]}
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

  _sort ({ sortBy, sortDirection }) {
    const {
      sortBy: prevSortBy,
      sortDirection: prevSortDirection,
      // sortedList: prevSortedList
    } = this.state;

    let list = this.context.list;

    let sortedList;
    // If list was sorted DESC by this column.
    // Rather than switch to ASC, return to "natural" order.
    if (prevSortDirection === SortDirection.ASC){
      //ASC -> DESC
      // sortBy = sortBy;
      sortDirection = SortDirection.DESC;
      sortedList = list.sort(function(a, b){
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
      })
    }

    if (prevSortDirection === SortDirection.DESC) {
      //DESC -> null
      sortBy = null;
      sortDirection = null;
      sortedList = list
    }

    if (prevSortDirection === null) {
      // null -> ASC
      sortDirection = SortDirection.ASC;
      sortedList = list.sort(function(a, b){
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
      })
    }

    this.setState({ sortBy, sortDirection, sortedList})
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