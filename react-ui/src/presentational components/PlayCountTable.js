import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Table, Glyphicon, Image } from 'react-bootstrap';
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

function createLastPlayedString(item) {
  return item.timestamps[item.timestamps.length-1]
}

function createImgUrl(item) {
  return item.album.images[1].url
}

function createLastPlayedDateObj(item){
  return new Date(createLastPlayedString(item))
}

function reformatDateStr(item){
  const dt = createLastPlayedDateObj(item);
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
        <th id={'albumImage'}> Album </th>
        <th id={'index'}>Index</th>
        <th onClick={(e)=>dispatch(setSortFilter(this.changeSortDirection(e.target.id)))} id={'name'}>Name {this.props.sortBy===SortBys.name ? this.showSortDirection() : null}</th>
        <th onClick={(e)=>dispatch(setSortFilter(this.changeSortDirection(e.target.id)))} id={'artists'}>Artist{this.props.sortBy===SortBys.artists ? this.showSortDirection() : null}</th>
        <th onClick={(e)=>dispatch(setSortFilter(this.changeSortDirection(e.target.id)))} id={'playCount'}>Play Count{this.props.sortBy===SortBys.playCount ? this.showSortDirection() : null}</th>
        <th onClick={(e)=>dispatch(setSortFilter(this.changeSortDirection(e.target.id)))} id={'lastPlayed'}>Last Played{this.props.sortBy===SortBys.lastPlayed ? this.showSortDirection() : null}</th>
      </tr>
      </thead>
    );

    const tableBody = this.sortData().map((item, i) => {
      let artistsName = createArtistsName(item);
      let songName = createSongName(item);
      let playCount = createPlayCount(item);
      let lastPlayed = reformatDateStr(item);
      let albumImgUrl = createImgUrl(item);

      return (
        <tr key={i} id={i}>
          {/*<td className={"col-md-1"}><img className="track-img" src={albumImgUrl} alt="" style={{height:50}}/></td>*/}
          <td className={"col-md-1"}><Image className="track-img" src={albumImgUrl} alt="" style={{height:50}}/></td>
          <td className={"col-md-1"} style={{textAlign: "center"}}>{i+1}</td>
          <td className={"col-md-3"}>{songName}</td>
          <td className={"col-md-3"}>{artistsName}</td>
          <td className={"col-md-1"} style={{textAlign: "center"}}>{playCount}</td>
          <td className={"col-md-3"}>{lastPlayed}</td>
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
