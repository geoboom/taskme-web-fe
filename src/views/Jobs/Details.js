import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Redirect } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import moment from 'moment';

import JobsDetailsContainer from 'containers/JobsDetailsContainer';
import { JobsContext } from 'containers/App/App';
import { taskColumnData, createData } from 'helpers/jobsData';

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

class Details extends Component {
  state = {
    isLoading: true,
    response: '',
    saveEnabled: false,
  };

  async componentWillMount() {
    const { contextProps, match } = this.props;
    const { jobId } = match.params;

    if (jobId) {
      const response = await contextProps.getJobById(jobId);
      this.setState({
        response,
        isLoading: false,
        saveEnabled: response.status === 'JOB_FOUND',
      });
    } else {
      await contextProps.resetJob();
      this.setState({
        isLoading: false,
        saveEnabled: true,
      })
    }
  }

  handleTaskDelete = (taskList) => {
    console.log('handleTaskDelete clicked');
  };

  handleTaskAdd = (taskList) => {
    let taskListToAdd = [];
    for (let i = 0; i < taskList.length; i += 1) {
      const {
        name, type, status, hrsEst, dateDue,
      } = taskList[i];

      if (!(name && type && status && hrsEst && dateDue)) {
        alert('Please fill in all required fields!');
        return;
      }

      taskListToAdd = [...taskListToAdd, taskList[i]];
    }

    this.setState(prevState => ({
      jobToAdd: {
        ...prevState.jobToAdd,
        taskList: [
          ...prevState.jobToAdd.taskList,
          ...taskListToAdd,
        ],
      }
    }));
  };

  handleJobSave = async (event) => {
    const { contextProps, history, mainPath } = this.props;
    const { updateJobsData } = contextProps;

    const { status, payload } = await updateJobsData();

    switch (status) {
      case 'JOB_CREATE_SUCCESS':
        history.replace(`${mainPath}/details/${payload.id}`);
        break;
      case 'JOB_SAVE_ERROR':
        alert(payload);
        break;
      case 'JOB_SAVE_SUCCESS':
        break;
      default:
        break;
    }
  };

  render() {
    const {
      response, isLoading,
    } = this.state;
    const {
      contextProps, classes, location, mainPath, history,
    } = this.props;
    const {
      currentJob,
    } = contextProps;

    const renderOutput = () => {
      if (isLoading) {
        return <div>Loading...</div>;
      } else {
        switch (response.status) {
          case 'JOB_NOT_FOUND':
            return (
              <h1>Job not found</h1>
            );
          default:
            return <JobsDetailsContainer />
        }
      }
    };

    return (
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
          <Button
            variant="raised"
            color="primary"
            onClick={this.handleJobSave}
            disabled={!this.state.saveEnabled}
          >
            {
              currentJob.id ? 'Save' : 'Create'
            }
          </Button>
        </Toolbar>
        <Paper elevation={1} className={classes.contentAreaWrapper}>
          {renderOutput()}
        </Paper>
      </div>
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
