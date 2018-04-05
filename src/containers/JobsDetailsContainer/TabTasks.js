import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
  },
});

const TabTasks = ({ classes }) => (
  <div className={classes.root}>
    Tasks
  </div>
);

TabTasks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TabTasks);
