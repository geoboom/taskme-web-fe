/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';

const drawerWidth = '220px';

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  toolbar: {
    height: '50px',
  },
  profileAvatar: {
    backgroundColor: grey[900],
  },
  activeRoute: {
    backgroundColor: grey[700],
  },
});

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const NavDrawer = ({ ...props }) => {
  const { classes, routes, route } = props;
  const links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        if (prop.redirect) return null;
        if (route === prop.path) {
          return (
            <ListItem key={key} button className={classes.activeRoute}>
              <ListItemIcon>
                <prop.icon />
              </ListItemIcon>
              <ListItemText
                primary={prop.sidebarName}
              />
            </ListItem>
          );
        }
        return (
          <NavLink
            to={prop.path}
            key={key}
          >
            <ListItem
              button
              className={route.startsWith(`${prop.path}/`) ? classes.activeRoute : ''}
            >
              <ListItemIcon>
                <prop.icon />
              </ListItemIcon>
              <ListItemText
                primary={prop.sidebarName}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  return (
    <MuiThemeProvider theme={theme}>
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <Toolbar className={classes.profileAvatar}>
          <div style={{ width: '100%' }}>
            <Typography noWrap>
              <b>Admin</b>
            </Typography>
            <Typography noWrap>
              <em>Georgie Lee</em>
            </Typography>
          </div>
        </Toolbar>
        <Divider />
        {links}
      </Drawer>
    </MuiThemeProvider>
  );
};

NavDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  route: PropTypes.string.isRequired,
};

export default withStyles(styles)(NavDrawer);
