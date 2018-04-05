import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

import CustomTableToolbar from 'components/CustomTable/CustomTableToolbar';
import CustomTableHead from 'components/CustomTable/CustomTableHead';
import CustomTableCell from 'components/CustomTable/CustomTableCell';

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
  },
  tableWrapper: {
    flex: 15,
    overflowX: 'auto',
    overflowY: 'auto',
  },
  tablePaginationWrapper: {
    flex: 1,
  },
});

const sortData = (data, order, orderBy) => (
  order === 'desc'
    ? data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
    : data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1))
);

class CustomTable extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (JSON.stringify(nextProps.data) !== JSON.stringify(prevState.data)) {
      const data = [...nextProps.data];
      const sortedData = sortData(data, prevState.order, prevState.orderBy);
      return ({ ...prevState, data, sortedData });
    }
  }

  state = {
    order: 'asc',
    orderBy: 'desc',
    selected: [],
    sortedData: [],
    data: [],
    page: 0,
    rowsPerPage: 20,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const sortedData = sortData(this.state.data, order, orderBy);

    this.setState({ sortedData, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.sortedData.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleRowClick = (event, id) => {
    this.props.handleRowClick(id);
  };

  handleSelectClick = (event, id) => {
    event.stopPropagation();

    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => (
    this.state.selected.indexOf(id) !== -1
  );

  render() {
    const { classes } = this.props;
    const {
      sortedData,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
    } = this.state;

    return (
      <div className={classes.root}>
        <CustomTableToolbar
          numSelected={selected.length}
        />
        <div
          className={classes.tableWrapper}
        >
          <Table
            className={classes.table}
          >
            <CustomTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={sortedData.length}
              columnData={this.props.columnData}
            />
            <TableBody>
              {sortedData.slice(
                page * rowsPerPage,
                (page * rowsPerPage) + rowsPerPage,
              ).map((n, index) => {
                const isSelected = this.isSelected(n.id);
                return (
                  <TableRow
                    hover
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    onClick={(event) => this.handleRowClick(event, n.id)}
                    style={{ cursor: 'pointer' }}
                    // style={index % 2 === 0 ? { background: '#F5F5F5' } : { background: 'white' }}
                  >
                    <CustomTableCell
                      padding="checkbox"
                      onClick={event => this.handleSelectClick(event, n.id)}
                    >
                      <Checkbox checked={isSelected} />
                    </CustomTableCell>
                    <CustomTableCell padding="none">
                      {n.desc}
                    </CustomTableCell>
                    <CustomTableCell numeric>
                      {n.status}
                    </CustomTableCell>
                    <CustomTableCell numeric>{n.ddorpm}</CustomTableCell>
                    <CustomTableCell numeric>{n.category}</CustomTableCell>
                    <CustomTableCell numeric>{n.associations}</CustomTableCell>
                    <CustomTableCell numeric>{n.dateCreated}</CustomTableCell>
                    <CustomTableCell numeric>{n.dateDue}</CustomTableCell>
                    <CustomTableCell numeric>{n.tasksTotal}</CustomTableCell>
                    <CustomTableCell numeric>{n.tasksCompleted}</CustomTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          className={classes.tablePaginationWrapper}
          component="div"
          count={sortedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          rowsPerPageOptions={[20, 25, 30]}
        />
      </div>
    );
  }
}

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columnData: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleRowClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(CustomTable);
