/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Switch, Redirect, Route } from 'react-router-dom';
import lightBlue from 'material-ui/colors/lightBlue';

import TopAppBar from 'components/TopAppBar/TopAppBar';
import NavDrawer from 'components/NavDrawer/NavDrawer';
import appRoutes from 'routes/appRoutes';
import { data as jobsData } from 'helpers/jobsData';

export const JobsContext = React.createContext();

const styles = theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: lightBlue[50],
  },
  toolbar: {
    minHeight: '50px',
  },
  contentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
});

const switchRoutes = (
  <Switch>
    {appRoutes.map((prop, key) => {
      if (prop.redirect) {
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      }
      const PropComponent = prop.component;
      return (
        <Route
          path={prop.path}
          render={({ history, location }) =>
            (<PropComponent
              history={history}
              location={location}
              mainPath={prop.path}
            />)}
          key={key}
        />
      );
    })}
  </Switch>
);


class App extends React.Component {
  state = {
    jobsData,
  };

  /*
    Updates or adds a new job to this.state.jobsData without mutating it by
    searching for job with job.id in this.state.jobsData.
    If such a job exists, new array with this job replaced is created and
    this.state.jobsData is set to that new array. Otherwise, this.state.jobsData
    is set to a new array [...this.state.jobsData, job].
   */
  updateJobsData = (job) => {
    const oldJob = this.state.jobsData.find(jobObject => jobObject.id === job.id);
    if (oldJob) {
      const oldJobIndex = this.state.jobsData.indexOf(oldJob);
      this.setState(prevState => ({
        jobsData: [
          ...prevState.jobsData.slice(0, oldJobIndex),
          job,
          ...prevState.jobsData.slice(oldJobIndex + 1),
        ],
      }));
    } else {
      this.setState(prevState => ({
        jobsData: [...prevState.jobsData, job],
      }));
    }
  };

  render() {
    const { classes, location } = this.props;

    return (
      <div className={classes.root}>
        <TopAppBar />
        <NavDrawer
          routes={appRoutes}
          route={location.pathname}
        />
        <div className={classes.contentContainer}>
          <div className={classes.toolbar} />
          <JobsContext.Provider
            value={
              {
                jobsData: this.state.jobsData,
                updateJobsData: this.updateJobsData,
              }
            }
          >
            {switchRoutes}
          </JobsContext.Provider>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
