import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

import ContentNavBar from '../components/ContentNavBar/ContentNavBar';

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
    minHeight: `100vh - ${theme.mixins.toolbar.minHeight}`,
  },
  routeContent: {
    flex: 1,
  },
  toolbar: theme.mixins.toolbar,
  button: {
    marginBottom: '15px',
  },
});

const RouteHandler = ({ classes }) => (
  <main className={classes.root}>
    <div className={classes.toolbar} />
    <ContentNavBar>
      <Button variant="raised" className={classes.button}>
        Back
      </Button>
    </ContentNavBar>
    <Paper elevation={4} className={classes.routeContent}>
      <Typography noWrap variant="headline">
        RouteHandler
      </Typography>
    </Paper>
  </main>
);

RouteHandler.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RouteHandler);
