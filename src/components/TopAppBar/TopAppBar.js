import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
});

const TopAppBar = ({ classes }) => (
  <AppBar className={classes.appBar}>
    <Toolbar style={{ minHeight: '50px' }}>
      <Typography variant="title" color="inherit" noWrap>
        TaskMe Dashboard
      </Typography>
    </Toolbar>
  </AppBar>
);

TopAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopAppBar);
