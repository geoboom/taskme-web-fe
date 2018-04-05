import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
  },
});

const TabLog = ({ classes }) => (
  <div className={classes.root}>
    Log
  </div>
);

TabLog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TabLog);