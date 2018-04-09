import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import Tooltip from 'material-ui/Tooltip';
import cyan from 'material-ui/colors/cyan';

const customTableHeadCellStyle = theme => ({
  tableCell: {
    backgroundColor: cyan[100],
    color: cyan[900],
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
});

const CustomTableHeadCell = ({ classes, children, ...rest }) => (
  <TableCell
    className={classes.tableCell}
    {...rest}
  >
    {children}
  </TableCell>
);

const StyledCustomTableHeadCell = withStyles(customTableHeadCellStyle)(CustomTableHeadCell);

class CustomTableHead extends React.Component {
  createSortHandler = property => (event) => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick, order, orderBy, numSelected, rowCount, columnData,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <StyledCustomTableHeadCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </StyledCustomTableHeadCell>
          {
            columnData.map(column => (
              <StyledCustomTableHeadCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </StyledCustomTableHeadCell>
              ), this)
          }
        </TableRow>
      </TableHead>
    );
  }
}

CustomTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  columnData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CustomTableHead;
