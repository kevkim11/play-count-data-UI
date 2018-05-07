import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchPlayedSongIfNeeded, SortBys, SortFilters, ViewBys, setViewFilter} from '../actions'
import PlayCountTable from '../presentational components/PlayCountTable2.js' // Container Component
import Footer from '../presentational components/Footer.js' // Container Component
import '../css/App.css';

// Bootstrap Components
// import {Nav, Navbar, NavItem, MenuItem, NavDropdown} from 'react-bootstrap'


class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // Initial fetch call when component did mount
    dispatch(fetchPlayedSongIfNeeded());
  }

  changeView(newViewBy){
    const {sortFilter, sortBy, viewBy} = this.props;

    if(newViewBy!==viewBy) { // Defaults to ASC
      // return {sortFilter: SortFilters.ASC, sortBy: newSortBy}
      return {viewBy, sortBy, sortFilter}
    }
    switch (newViewBy) {
      case ViewBys.songs:
        return {sortFilter: SortFilters.UNSORTED, sortBy: SortBys.name, viewBy: newViewBy};
      case ViewBys.artists:
        return {sortFilter: SortFilters.DESC, sortBy: SortBys.lastPlayed, viewBy: newViewBy};
      default:
        return {viewBy, sortBy, sortFilter}
    }
  }

  render() {
    const {data, isFetching, viewBy, dispatch} = this.props;
    console.log('isFetching is', isFetching);
    if(isFetching && data.length===0){return <p> {'LOADING'} </p>}
    if(!isFetching && data.length===0){return <p> {'EMPTY'} </p>}
    return (

      <div className={'container'}>
        {/*<Navbar inverse collapseOnSelect>*/}
          {/*<Navbar.Header>*/}
            {/*<Navbar.Brand>*/}
              {/*<a href="#">React-Bootstrap</a>*/}
            {/*</Navbar.Brand>*/}
            {/*<Navbar.Toggle />*/}
          {/*</Navbar.Header>*/}
          {/*<Navbar.Collapse>*/}
            {/*<Nav>*/}
              {/*<NavItem id='songs' eventKey={1} onClick={(e)=>{dispatch(setViewFilter(e.target.id))}}>*/}
                {/*Songs*/}
              {/*</NavItem>*/}
              {/*<NavItem id='artists' eventKey={2} onClick={(e)=>{dispatch(setViewFilter(e.target.id))}} href="#">*/}
                {/*Album*/}
              {/*</NavItem>*/}
              {/*<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">*/}
                {/*<MenuItem eventKey={3.1}>Action</MenuItem>*/}
                {/*<MenuItem eventKey={3.2}>Another action</MenuItem>*/}
                {/*<MenuItem eventKey={3.3}>Something else here</MenuItem>*/}
                {/*<MenuItem divider />*/}
                {/*<MenuItem eventKey={3.3}>Separated link</MenuItem>*/}
              {/*</NavDropdown>*/}
            {/*</Nav>*/}
          {/*</Navbar.Collapse>*/}
        {/*</Navbar>*/}
        {/*{viewBy===ViewBys.songs ? <PlayCountTable/> : <Grid/>}*/}
        <PlayCountTable/>
        <Footer/>
      </div>

    );
  }
}

App.propTypes = {
  data: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  viewBy: PropTypes.string.isRequired
};

/**
 * state = redux state
 * const mapStateToProps = (state) => ({})
 */
function mapStateToProps(state){
  const { recentlyPlayedSongs } = state;
  const {data, isFetching, dispatch, viewBy} = recentlyPlayedSongs;
  return({data, isFetching, dispatch, viewBy})
}

export default connect(mapStateToProps)(App)

