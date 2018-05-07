import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Glyphicon} from 'react-bootstrap';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
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

function createSongURL(item) {
  return item.external_urls.spotify
}

function createPlayCount(item) {
  return item.timestamps.length
}

function createAlbumImgUrl(item) {
  return item.album.images[1].url
}

function createAlbumName(item){
  return item.album.name
}

function sortTimestamps(item){
  /**
   Extra: Timestamps should already be sorted in db.
   * */
  let timestamps = item["timestamps"].map((str)=>{
    return new Date(str);
  });
  timestamps.sort((a,b)=>{
    return a - b
  });
  return timestamps;
}

function createLastPlayedDateObj(item){
  let timestamps = sortTimestamps(item);
  return timestamps[item.timestamps.length-1]
}

function createFirstPlayedDateObj(item){
  let timestamps = sortTimestamps(item);
  return timestamps[0]
}

function msToMS(ms){
  /**
   * formats to m:ss
   * */
    // 1- Convert to seconds:
  let seconds = ms / 1000;
  // 2- Extract hours:
  // let hours = parseInt(seconds/3600, 10 ); // 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours
  // 3- Extract minutes:
  let min = parseInt( seconds / 60, 10 ); // 60 seconds in 1 minute
  // 4- Keep only seconds not extracted to minutes:
  seconds = parseInt(seconds % 60, 10);
  seconds = seconds<10 ? '0'+seconds : seconds;
  return `${min}:${seconds}`
}


function reformatDateStr(dt){
  /**
   * dt - date obj
   * return: str - mm/dd/yyyy, hh:mm am/pm
   * */
  let min = dt.getMinutes(); min = min<10 ? '0'+min : min;
  let hr = dt.getHours();
  let ampm = hr>=12 ? "pm" : "am";

  if(hr>12){hr-=12;}
  else if(hr===0){hr=12;}

  return `${dt.getMonth( ) + 1}/${dt.getDate()}/${dt.getFullYear()}, ${hr}:${min} ${ampm}`
}

class PlayCountTable extends Component {
  constructor(props){
    super(props)
  }

  sortData(){
    /**
     * Sort's Data based on props being passed down from reducer
     * TODO: REFACTOR THIS SORT FUNCTION. LOOKS HORENDOUS
     * */
    const {data, sortFilter, sortBy} = this.props;
    let newSortedList = Object.assign({}, data);

    if(sortFilter===SortFilters.ASC){ // All ASC
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
      } else if(sortBy===SortBys.album){
        newSortedList = data.slice().sort(function(a, b) {
          if (a[sortBy].name < b[sortBy].name) return -1;
          if (a[sortBy].name > b[sortBy].name) return 1;
          return 0
        });
      } else if(sortBy===SortBys.lastPlayed){
        newSortedList = data.slice().sort(function(a, b){
          a = createLastPlayedDateObj(a);
          b = createLastPlayedDateObj(b);
          return a - b
        });
      } else if(sortBy===SortBys.dateAdded){
        newSortedList = data.slice().sort(function(a, b){
          a = createFirstPlayedDateObj(a);
          b = createFirstPlayedDateObj(b);
          return a - b
        });
      }else if(sortBy===SortBys.time){
        newSortedList = data.slice().sort(function(a, b){
          if (a.duration_ms < b.duration_ms) return -1;
          if (a.duration_ms > b.duration_ms) return 1;
          return 0
        });
      }else {
        newSortedList = data.slice().sort(function(a, b){
          if(a[sortBy] < b[sortBy]) return -1;
          if(a[sortBy] > b[sortBy]) return 1;
          return 0
        });
      }
    } else if(sortFilter===SortFilters.DESC){ // All DESC
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
      }
      else if(sortBy===SortBys.dateAdded) {
        newSortedList = data.slice().sort(function (a, b) {
          a = createFirstPlayedDateObj(a);
          b = createFirstPlayedDateObj(b);
          return b - a
        });
      }
      else if(sortBy===SortBys.artists){
        newSortedList = data.slice().sort(function(a, b) {
          if (a[sortBy][0].name < b[sortBy][0].name) return 1;
          if (a[sortBy][0].name > b[sortBy][0].name) return -1;
          return 0
        });
      }
      else if(sortBy===SortBys.album){
        newSortedList = data.slice().sort(function(a, b) {
          if (a[sortBy].name < b[sortBy].name) return 1;
          if (a[sortBy].name > b[sortBy].name) return -1;
          return 0
        });
      }
      else if(sortBy===SortBys.time) {
        newSortedList = data.slice().sort(function (a, b) {
          if (a.duration_ms < b.duration_ms) return 1;
          if (a.duration_ms > b.duration_ms) return -1;
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
    /**
     * Defaults ASC when a sortable column is first clicked.
     * */
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
    /** Handles changing the sort icon*/
    const {sortFilter} = this.props;
    switch (sortFilter){
      case SortFilters.ASC:
        return <Icon name="angle down" style={{zIndex: -1}}/>;
      case SortFilters.DESC:
        return <Icon name="angle up" style={{zIndex: -1}} />;
      case SortFilters.UNSORTED:
        return null
    }
  }

  render(){
    const {dispatch} = this.props;
    const tableHeader = (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell id={'index'}>Index</Table.HeaderCell>
          <Table.HeaderCell className="clickable-header-column" onClick={(e)=>dispatch(setSortFilter(this.changeSortDirection(e.target.id)))} id={'name'}> Name {this.props.sortBy===SortBys.name ? this.showSortDirection() : null}</Table.HeaderCell>
          <Table.HeaderCell className="clickable-header-column" onClick={(e)=>dispatch(setSortFilter(this.changeSortDirection(e.target.id)))} id={'artists'}> Artists {this.props.sortBy===SortBys.artists ? this.showSortDirection() : null}</Table.HeaderCell>
          <Table.HeaderCell className="clickable-header-column" onClick={(e)=>dispatch(setSortFilter(this.changeSortDirection(e.target.id)))} id={'album'}> Album {this.props.sortBy===SortBys.album ? this.showSortDirection() : null}</Table.HeaderCell>
          <Table.HeaderCell className="clickable-header-column" onClick={(e)=>dispatch(setSortFilter(this.changeSortDirection(e.target.id)))} id={'playCount'}> Plays {this.props.sortBy===SortBys.playCount ? this.showSortDirection() : null}</Table.HeaderCell>
          <Table.HeaderCell className="clickable-header-column" onClick={(e)=>dispatch(setSortFilter(this.changeSortDirection(e.target.id)))} id={'lastPlayed'}> Last Played {this.props.sortBy===SortBys.lastPlayed ? this.showSortDirection() : null}</Table.HeaderCell>
          <Table.HeaderCell className="clickable-header-column" onClick={(e)=>dispatch(setSortFilter(this.changeSortDirection(e.target.id)))} id={'dateAdded'}> Date Added {this.props.sortBy===SortBys.dateAdded ? this.showSortDirection() : null}</Table.HeaderCell>
          <Table.HeaderCell className="clickable-header-column" onClick={(e)=>dispatch(setSortFilter(this.changeSortDirection(e.target.id)))} id={'time'}> Time {this.props.sortBy===SortBys.time ? this.showSortDirection() : null}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );

    const tableBody = this.sortData().map((item, i) => {
      let artistsName = createArtistsName(item);
      let songName = createSongName(item);
      let albumName = createAlbumName(item);
      let playCount = createPlayCount(item);
      let lastPlayed = reformatDateStr(createLastPlayedDateObj(item));
      let firstPlayed = reformatDateStr(createFirstPlayedDateObj(item));
      let albumImgUrl = createAlbumImgUrl(item);
      let songUrl = createSongURL(item);
      let time = msToMS(item.duration_ms);

      return (
        <Table.Row className="clickable-row" key={i} id={i} onClick={()=>{window.open(songUrl, '_blank')}}>
          <Table.Cell>{i+1}</Table.Cell>
          <Table.Cell>{songName}</Table.Cell>
          <Table.Cell>{artistsName}</Table.Cell>
          <Table.Cell>{albumName}</Table.Cell>
          <Table.Cell>{playCount}</Table.Cell>
          <Table.Cell>{lastPlayed}</Table.Cell>
          <Table.Cell>{firstPlayed}</Table.Cell>
          <Table.Cell>{time}</Table.Cell>
        </Table.Row>
      )
    });
      return (
        <Table celled>
          {tableHeader}
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
  sortBy: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state){
  const { recentlyPlayedSongs } = state;
  const {data, sortFilter, sortBy, dispatch} = recentlyPlayedSongs;
  return({data, sortFilter,sortBy, dispatch})
}
// export default PlayCountTable
export default connect(mapStateToProps)(PlayCountTable)
