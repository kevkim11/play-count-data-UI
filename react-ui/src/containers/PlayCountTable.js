import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

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

  render() {
    const tableHead = (
      <thead>
      <tr>
        <th>index</th>
        <th>Name</th>
        <th>Artists</th>
        <th>Play Count</th>
      </tr>
      </thead>
    );

    const tableBody = this.props.data.map((item, i) => {
      let artistsName = createArtistsName(item);
      let songName = createSongName(item);
      let playCount = createPlayCount(item);

      return (
        <tr key={i}>
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

export default PlayCountTable;

