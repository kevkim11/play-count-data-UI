import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Footer extends Component{

  get_total_items(){
    const { data } = this.props;
    return data.length;
  }

  get_total_play_count(){
    const { data } = this.props;
    let total_play_count = 0;
    data.forEach(function(item){
      total_play_count += item["timestamps"].length
    });
    return total_play_count
  }

  render(){
    //1) total items
    let total_items = this.get_total_items();

    //2) total play count
    let total_play_count = this.get_total_play_count();

    //3 and 4) TODO total time and last updated

    const footerStyle = {
      position: "fixed",
      left: 0,
      bottom: 0,
      width: "100%",
      backgroundColor: "#F6F6F6",
      color: "black",
      textAlign: "center"
    };

    return (
      <div className={"footer"} style={footerStyle}>
        <p> {total_items} items, {total_play_count} total play count </p>
      </div>
    )
  }
};

function mapStateToProps(state){
  const { recentlyPlayedSongs } = state;
  const {data} = recentlyPlayedSongs;
  return({data})
}

export default connect(mapStateToProps)(Footer)