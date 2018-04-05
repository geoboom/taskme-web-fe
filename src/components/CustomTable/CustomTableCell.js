import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {
  TableCell,
} from 'material-ui/Table';

const styles = {
  tableCell: {
    whiteSpace: 'nowrap',
  },
};

const CustomTableCell = ({ classes, children, ...rest }) => (
  <TableCell
    className={classes.tableCell}
    {...rest}
  >
    {children}
  </TableCell>
);

CustomTableCell.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomTableCell);
