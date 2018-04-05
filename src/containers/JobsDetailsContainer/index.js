import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import TabbedContainerComponent from 'components/TabbedContainerComponent/TabbedContainerComponent';
import JobsDetailsFormInput from 'components/JobsDetailsFormInput/JobsDetailsFormInput';
import tabbedContent from 'containers/JobsDetailsContainer/jobDetailsTabs';

import { JobFieldsContext } from 'views/Jobs/Details';

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

class JobsDetailsContainer extends React.Component {
  state = {
    categoryFilter: '',
    associationsFilter: '',
    categorySelected: null,
    associationsSelected: null,
    newTasks: [],
    tempTask: {
      id: null,
      name: '',
      type: '',
      assignedTo: [],
      estHours: 0,
    },
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <JobFieldsContext.Consumer>
          {
            contextProps => (
              <JobsDetailsFormInput
                handleInputChange={contextProps.handleInputChange}
                jobToAdd={contextProps.jobToAdd}
              />
            )
          }
        </JobFieldsContext.Consumer>
        <TabbedContainerComponent
          tabbedContent={tabbedContent}
        />
      </div>
    );
  }
}

JobsDetailsContainer.propTypes = {
  job: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobsDetailsContainer);
