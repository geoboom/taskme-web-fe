import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
  },
});

const TabQualityOfWork = ({ classes }) => (
  <div className={classes.root}>
    Quality of Work
  </div>
);

TabQualityOfWork.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TabQualityOfWork);