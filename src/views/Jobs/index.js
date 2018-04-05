import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import JobsMain from 'views/Jobs/Main';
import JobsDetails from 'views/Jobs/Details';

const Jobs = ({ location, mainPath }) => {
  return (
    <Switch>
      <Route exact path={mainPath} component={JobsMain} />
      <Route path={`${mainPath}/details/:jobId`} render={({ match, history }) => <JobsDetails history={history} match={match} mainPath={mainPath} location={location} />} />
      <Redirect from={location.pathname} to={mainPath} />
    </Switch>
  );
};

Jobs.propTypes = {
  location: PropTypes.object.isRequired,
  mainPath: PropTypes.string.isRequired,
};

export default Jobs;
