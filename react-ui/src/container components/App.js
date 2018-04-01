import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchPlayedSongIfNeeded} from '../actions'
import PlayCountTable from '../presentational components/PlayCountTable.js' // Container Component
import '../css/App.css';
// Bootstrap Components
import {Nav, Navbar, NavItem, MenuItem, NavDropdown} from 'react-bootstrap'


class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // Initial fetch call when component did mount
    dispatch(fetchPlayedSongIfNeeded());
  }

  render() {
    const {data, isFetching} = this.props;
    if(isFetching && !data){return <p> {'LOADING'} </p>}
    if(!isFetching && !data){return <p> {'EMPTY'} </p>}
    return (
      <div className={'container'}>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">React-Bootstrap</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#">
                Songs
              </NavItem>
              <NavItem eventKey={2} href="#">
                Album
              </NavItem>
              <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.3}>Separated link</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>;



        <PlayCountTable/>
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

/**
 * state = redux state
 * const mapStateToProps = (state) => ({})
 */
function mapStateToProps(state){
  const { recentlyPlayedSongs } = state;
  const {data, isFetching, dispatch} = recentlyPlayedSongs;
  return({data, isFetching, dispatch})
}

export default connect(mapStateToProps)(App)

