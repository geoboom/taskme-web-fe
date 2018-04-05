import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import lightBlue from 'material-ui/colors/lightBlue';

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  headerBar: {
    display: 'flex',
    backgroundColor: lightBlue[100],
    minHeight: theme.mixins.toolbar.minHeight * 0.85,
  },
  contentArea: {
    flex: 20,
  },
});

const Dashboard = ({ classes }) => (
  <Paper className={classes.root}>
    <Toolbar className={classes.headerBar}>
      <Typography variant="title">
        Dashboard
      </Typography>
    </Toolbar>
    <div className={classes.contentArea}>
      <h1>Content Area: table</h1>
    </div>
  </Paper>
);

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
