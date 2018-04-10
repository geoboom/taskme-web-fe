import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import JobsMain from 'views/Jobs/Main';
import JobsDetails from 'views/Jobs/Details';

const Jobs = ({ location, mainPath }) => {
  const renderJobDetails = ({
    match, history
  }) => (
    <JobsDetails
      history={history}
      match={match}
      mainPath={mainPath}
      location={location}
    />
  );

  return (
    <Switch>
      <Route exact path={mainPath} component={JobsMain} />
      <Route
        exact path={`${mainPath}/new`}
        render={renderJobDetails}
      />
      <Route
        path={`${mainPath}/details/:jobId`}
        render={renderJobDetails}
      />
      <Redirect from={location.pathname} to={mainPath} />
    </Switch>
  );
};

Jobs.propTypes = {
  location: PropTypes.object.isRequired,
  mainPath: PropTypes.string.isRequired,
};

export default Jobs;
