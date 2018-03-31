import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Table, Glyphicon } from 'react-bootstrap';
import {connect} from "react-redux";
import {setSortFilter, SortBys, SortFilters} from '../actions'

function createLastPlayedString(item) {
  return item.timestamps[item.timestamps.length-1]
}

function createImgUrl(item) {
  return item.album.images[1].url
}

function createLastPlayedDateObj(item){
  return new Date(createLastPlayedString(item))
}

class TableHeader extends Component {
  constructor(props){
    super(props)
  }

  sortData(){
    /**
     * Sort's Data based on this props
     * TODO: REFACTOR THIS SORT FUNCTION. LOOKS HORENDOUS
     * */
    const {data, sortFilter, sortBy} = this.props;
    let newSortedList = Object.assign({}, data);

    if(sortFilter===SortFilters.ASC){
      if(sortBy===SortBys.playCount){
        newSortedList = data.slice().sort(function(a, b){
          if(a.timestamps.length < b.timestamps.length) return -1;
          if(a.timestamps.length > b.timestamps.length) return 1;
          return 0
        });
      } else if(sortBy===SortBys.artists){
        newSortedList = data.slice().sort(function(a, b) {
          if (a[sortBy][0].name < b[sortBy][0].name) return -1;
          if (a[sortBy][0].name > b[sortBy][0].name) return 1;
          return 0
        });
      } else if(sortBy===SortBys.lastPlayed){
        newSortedList = data.slice().sort(function(a, b){
          a = createLastPlayedDateObj(a);
          b = createLastPlayedDateObj(b);
          return a - b
        });
      } else {
        newSortedList = data.slice().sort(function(a, b){
          if(a[sortBy] < b[sortBy]) return -1;
          if(a[sortBy] > b[sortBy]) return 1;
          return 0
        });
      }
    } else if(sortFilter===SortFilters.DESC){
      if(sortBy===SortBys.playCount){
        newSortedList = data.slice().sort(function(a, b){
          if(a.timestamps.length < b.timestamps.length) return 1;
          if(a.timestamps.length > b.timestamps.length) return -1;
          return 0
        });
      }
      else if(sortBy===SortBys.lastPlayed) {
        newSortedList = data.slice().sort(function (a, b) {
          a = createLastPlayedDateObj(a);
          b = createLastPlayedDateObj(b);
          return b - a
        });
      } else if(sortBy===SortBys.artists){
        newSortedList = data.slice().sort(function(a, b) {
          if (a[sortBy][0].name < b[sortBy][0].name) return 1;
          if (a[sortBy][0].name > b[sortBy][0].name) return -1;
          return 0
        });
      }
      else{
        newSortedList = data.slice().sort(function(a, b){
          if(a[sortBy] < b[sortBy]) return 1;
          if(a[sortBy] > b[sortBy]) return -1;
          return 0
        });
      }
    } else if(sortFilter===SortFilters.UNSORTED) {
      return data
    }
    return newSortedList
  }

  changeSortDirection(newSortBy){
    const {sortFilter, sortBy} = this.props;

    if(newSortBy!==sortBy) { // Defaults to ASC
      return {sortFilter: SortFilters.ASC, sortBy: newSortBy}
    }
    switch (sortFilter){
      case SortFilters.ASC:
        return {sortFilter: SortFilters.DESC, sortBy:newSortBy};
      case SortFilters.DESC:
        return {sortFilter: SortFilters.UNSORTED, sortBy:newSortBy};
      case SortFilters.UNSORTED:
        return {sortFilter: SortFilters.ASC, sortBy:newSortBy};
    }
  }

  showSortDirection(){
    const {sortFilter} = this.props;
    switch (sortFilter){
      case SortFilters.ASC:
        return <Glyphicon glyph="menu-down" style={{zIndex: -1}}/>;
      case SortFilters.DESC:
        return <Glyphicon glyph="menu-up" style={{zIndex: -1}} />;
      case SortFilters.UNSORTED:
        return null
    }
  }

  render(){

    const {dispatch} = this.props;
    return (
      <thead>
      <tr>
        <th id={'albumImage'}> Album </th>
        <th id={'index'}>Index</th>
        <th onClick={(e)=>dispatch(setSortFilter(this.changeSortDirection(e.target.id)))} id={'name'}>Name {this.props.sortBy===SortBys.name ? this.showSortDirection() : null}</th>
        <th onClick={(e)=>dispatch(setSortFilter(this.changeSortDirection(e.target.id)))} id={'artists'}>Artist{this.props.sortBy===SortBys.artists ? this.showSortDirection() : null}</th>
        <th onClick={(e)=>dispatch(setSortFilter(this.changeSortDirection(e.target.id)))} id={'playCount'}>Play Count{this.props.sortBy===SortBys.playCount ? this.showSortDirection() : null}</th>
        <th onClick={(e)=>dispatch(setSortFilter(this.changeSortDirection(e.target.id)))} id={'lastPlayed'}>Last Played{this.props.sortBy===SortBys.lastPlayed ? this.showSortDirection() : null}</th>
      </tr>
      </thead>
    );
  }
}

TableHeader.PropTypes = {
  sortFilter: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired
};

function mapStateToProps(state){
  // Get the reducer from the state
  const { recentlyPlayedSongs } = state;
  const {data, sortFilter, sortBy, dispatch} = recentlyPlayedSongs;
  return({data, sortFilter,sortBy, dispatch})
}

export default connect(mapStateToProps)(TableHeader)
