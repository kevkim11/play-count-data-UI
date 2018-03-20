import { Column, Table, AutoSizer } from 'react-virtualized';


export default class NaturalSortTable extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      list: props.list // Naturally sorted list
    }
  }

  componentWillUpdate (nextProps, nextState) {
    const {
      sortBy: prevSortBy,
      sortDirection: prevSortDirection
    } = this.state

    if (
      nextState.sortBy !== prevSortBy ||
      nextState.sortDirection !== prevSortDirection
    ) {
      const { sortBy, sortDirection } = nextState

      let { list } = this.props

      if (sortBy) {
        list = list.sortBy(item => item[sortBy])
        if (sortDirection === SortDirection.DESC) {
          list = list.reverse()
        }
      }
    }
  }

  render () {
    const { list, sortBy, sortDirection } = this.state

    return (
      <Table
        {...this.props}
        sort={this._sort}
        sortBy={sortBy}
        sortDirection={sortDirection}
      >
        {/* <Column>s go here */}
      </Table>
    )
  }

  _sort ({ sortBy, sortDirection }) {
    const {
      sortBy: prevSortBy,
      sortDirection: prevSortDirection
    } = this.state

    // If list was sorted DESC by this column.
    // Rather than switch to ASC, return to "natural" order.
    if (prevSortDirection === SortDirection.DESC) {
      sortBy = null
      sortDirection = null
    }

    this.setState({ sortBy, sortDirection })
  }
}