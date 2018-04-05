import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

const styles = theme => ({
  root: {
    flex: 1,
  },
});

class TabbedContainerComponent extends React.Component{
  state = {
    currentTab: 0,
  };

  handleTabChange = (event, value) => {
    this.setState({
      currentTab: value,
    });
  };

  render() {
    const { classes, tabbedContent } = this.props;
    const { currentTab } = this.state;

    return (
      <Paper className={classes.root}>
        <AppBar position="static">
          <Tabs value={currentTab} onChange={this.handleTabChange}>
            {tabbedContent.map((tab, index) => (
              <Tab key={index} label={tab.label} />
            ))}
          </Tabs>
        </AppBar>
        {tabbedContent.map((tab, index) => (
          currentTab === index && React.createElement(tab.component, { key: index })
        ))}
      </Paper>
    );
  }
}

TabbedContainerComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  tabbedContent: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(TabbedContainerComponent);
