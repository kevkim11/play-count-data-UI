import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap';
import {connect} from "react-redux";
import {setSortFilter, SortFilters} from '../actions'

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
     * Sort's Data based on the filter props
     * */
    const {data, sortFilter} = this.props;
    let newSortedList = Object.assign({}, data);
    if(sortFilter==='ASC'){
      newSortedList = data.slice().sort(function(a, b){
        if(a.name < b.name) return 1;
        if(a.name > b.name) return -1;
        return 0
      });
    } else if(sortFilter==='DESC'){
      newSortedList = data.slice().sort(function(a, b){
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0
      });
    } else if(sortFilter==='UNSORTED') {
      return data
    }
    return newSortedList
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
        <th onClick={null}>index</th>
        <th onClick={()=>dispatch(setSortFilter(SortFilters.ASC))}>Name</th>
        <th onClick={null}>Artists</th>
        <th onClick={null}>Play Count</th>
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
  sortFilter: PropTypes.string.isRequired
};

function mapStateToProps(state){
  // Get the reducer from the state
  const { recentlyPlayedSongs } = state;
  const {data, sortFilter, dispatch} = recentlyPlayedSongs;
  return({data, sortFilter, dispatch})
}
// export default PlayCountTable
export default connect(mapStateToProps)(PlayCountTable)
