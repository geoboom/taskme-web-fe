import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  navBar: {
    display: 'flex',
    height: theme.mixins.toolbar.minHeight,
  },
});

const ContentNavBar = ({ classes, children }) => (
  <div className={classes.navBar}>
    {children}
  </div>
);

ContentNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContentNavBar);
