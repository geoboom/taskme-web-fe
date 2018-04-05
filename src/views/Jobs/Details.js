import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Redirect } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';

import JobsDetailsContainer from 'containers/JobsDetailsContainer';
import { JobsContext } from 'containers/App/App';
import { createData } from 'helpers/jobsData';

export const JobFieldsContext = React.createContext();

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  contentAreaWrapper: {
    margin: '0px 10px 10px 10px',
    padding: '20px 10px 10px 10px',
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  },
});

class Details extends React.Component {
  state = {
    jobToAdd: {
      id: null,
      desc: '',
      status: '',
      ddorpm: '',
      category: '',
      associations: '',
      dateDue: '',
      taskList: [],
    },
    changesUnsaved: false,
  };

  handleInputChange = (event) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;

    this.setState(prevState => ({
      jobToAdd: {
        ...prevState.jobToAdd,
        [targetName]: targetValue,
      },
    }), () => {
      if (!this.state.changesUnsaved) {
        this.setState({
          changesUnsaved: true,
        });
      }
    });
  };

  handleJobSave = (event) => {
    const { updateJobsData } = this.props.contextProps;
    const {
      desc, status, ddorpm, category, associations, dateDue,
    } = this.state.jobToAdd;
    if (!(desc && status && ddorpm && category && associations && dateDue)) {
      console.log('Not all fields are filled');
    } else {
      updateJobsData(this.state.jobToAdd);
    }
  };

  render() {
    const {
      classes, match, location, mainPath, contextProps, history,
    } = this.props;

    const { jobId } = match.params;
    const job = contextProps.jobsData.find(jobObject => (jobObject.id.toString() === jobId));

    return (
      job
        ?
          <div className={classes.root}>
            <Toolbar style={{ minHeight: '55px', padding: '0px 10px 0px 10px' }}>
              <Button variant="raised" color="secondary" onClick={() => history.push(mainPath)}>
                Back
              </Button>
              <hr
                style={{
                padding: 0,
                margin: 0,
                marginLeft: '7px',
                marginRight: '7px',
                height: '35px',
                width: '0',
                border: '0.5px solid darkgrey',
              }}
              />
              <Button variant="raised" color="primary" onClick={this.handleJobSave}>
                Save
              </Button>
            </Toolbar>
            <Paper elevation={1} className={classes.contentAreaWrapper}>
              <JobFieldsContext.Provider
                value={
                  {
                    handleInputChange: this.handleInputChange,
                    jobToAdd: this.state.jobToAdd,
                  }
                }
              >
                <JobsDetailsContainer
                  job={job}
                />
              </JobFieldsContext.Provider>
            </Paper>
          </div>
        :
          <Redirect from={location.pathname} to={mainPath} />
    );
  }
}


Details.propTypes = {
  contextProps: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  mainPath: PropTypes.string.isRequired,
};

const DetailsWithContext = props => (
  <JobsContext.Consumer>
    {contextProps => <Details {...props} contextProps={contextProps} />}
  </JobsContext.Consumer>
);

export default withStyles(styles)(DetailsWithContext);
