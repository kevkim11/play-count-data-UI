import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Table, Glyphicon } from 'react-bootstrap';
import {connect} from "react-redux";
import {setSortFilter, SortBys, SortFilters} from '../actions'

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

class PlayCountTable extends Component {
  constructor(props){
    super(props)
  }

  sortData(){
    /**
     * Sort's Data based on this props
     * TODO: REFACTOR THIS SORT FUNCTION. LOOKS HORENDOUS
     * */
    const {data, sortFilter, sortBy} = this.props;
    console.log('data is', data);
    console.log('this.props.sortFilter is', sortFilter);
    let newSortedList = Object.assign({}, data);

    if(sortFilter===SortFilters.ASC){
      if(sortBy===SortBys.playCount){
          newSortedList = data.slice().sort(function(a, b){
            if(a.timestamps.length < b.timestamps.length) return -1;
            if(a.timestamps.length > b.timestamps.length) return 1;
            return 0
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
    console.log('sortBy is', sortBy);
    console.log('this.props.sortFilter is', sortFilter);
    console.log('newSortBy is', newSortBy);

    if(newSortBy!==sortBy) {
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

  render() {
    console.log('playCountTable Props are', this.props);
    /* TODO Going to need to make the tableHead it's own component for sorting functionality
     * i.e. Component Picker https://github.com/reactjs/redux/blob/master/docs/advanced/ExampleRedditAPI.md
     * Will Need to move tableHead/sort to Components instead of container
    */
    const {dispatch} = this.props;
    const tableHead = (
      <thead>
      <tr>
        <th id={'index'}>index</th>
        <th onClick={(e)=>dispatch(setSortFilter(this.changeSortDirection(e.target.id)))} id={'name'}>Name {this.props.sortBy==='name' ? this.showSortDirection() : null}</th>
        <th onClick={(e)=>dispatch(setSortFilter(this.changeSortDirection(e.target.id)))} id={'artists'}>Artist{this.props.sortBy==='artists' ? this.showSortDirection() : null}</th>
        <th onClick={(e)=>dispatch(setSortFilter(this.changeSortDirection(e.target.id)))} id={'playCount'}>Play_Count{this.props.sortBy==='playCount' ? this.showSortDirection() : null}</th>
        <th onClick={(e)=>dispatch(setSortFilter(this.changeSortDirection(e.target.id)))} id={'recentlyPlayed'}>Recently Played{this.props.sortBy==='recentlyPlayed' ? this.showSortDirection() : null}</th>
      </tr>
      </thead>
    );

    const tableBody = this.sortData().map((item, i) => {
      let artistsName = createArtistsName(item);
      let songName = createSongName(item);
      let playCount = createPlayCount(item);

      return (
        <tr key={i} id={i}>
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

PlayCountTable.propTypes = {
  data: PropTypes.array.isRequired,
  sortFilter: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired
};

function mapStateToProps(state){
  // Get the reducer from the state
  const { recentlyPlayedSongs } = state;
  const {data, sortFilter, sortBy, dispatch} = recentlyPlayedSongs;
  return({data, sortFilter,sortBy, dispatch})
}
// export default PlayCountTable
export default connect(mapStateToProps)(PlayCountTable)
