import React, { Component } from 'react'
import Square from './Square.js'
import {setSortFilter, SortBys, SortFilters} from '../../actions'
import PropTypes from "prop-types";
import {connect} from "react-redux";

class Grid extends Component {

  defaultSortData(){
    const {dispatch} = this.props;
    const sortSetting = {sortFilter: SortFilters.DESC, sortBy: SortBys.lastPlayed};
    dispatch(setSortFilter(sortSetting))
  }

  render () {
    let table = this.props.data.map((item, i) => {
      return(<Square item={item} id={i} key={i}/>)
    });
    return({table});
  }
}

Grid.PropTypes = {
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

export default connect(mapStateToProps)(Grid)