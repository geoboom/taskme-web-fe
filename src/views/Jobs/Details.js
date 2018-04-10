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
    jobToAdd: {
      id: this.props.match.params.jobId ? this.props.match.params.jobId : null,
      desc: '',
      status: '',
      ddorpm: '',
      category: '',
      associations: '',
      dateDue: '',
      taskList: [],
    },
    newTask: {
      name: '',
      type: '',
      assignedTo: [],
      status: '',
      hrsEst: 0,
    },
    changesUnsaved: false,
    loadProgress: 'loading',
  };

  componentDidMount() {
    const { contextProps } = this.props;

    if (this.state.jobToAdd.id) {
      setTimeout(() => {
        const job = contextProps.jobsData.find(jobObject =>
          (jobObject.id === parseInt(this.state.jobToAdd.id, 10))
        );
        if (!job) {
          this.setState({
            loadProgress: 'job_not_found',
          });
        } else {
          this.setState(prevState => ({
            jobToAdd: {
              ...prevState.jobToAdd,
              desc: job.desc,
              status: job.status,
              ddorpm: job.ddorpm,
              category: job.category,
              associations: job.associations,
              dateDue: moment(job.dateDue, 'DD/MM/YYYY').format('YYYY-MM-DD').toString(),
              dateCreated: '',
              tasksTotal: '',
              tasksCompleted: '',
              taskList: job.taskList,
            },
            loadProgress: 'loaded',
          }));
        }
      }, 1500);
    } else {
      this.setState({
        loadProgress: 'loaded',
      });
    }
  }

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
    const {
      contextProps, history, mainPath
    } = this.props;
    const { updateJobsData } = contextProps;
    const {
      desc, status, ddorpm, category, associations, dateDue,
    } = this.state.jobToAdd;

    if (!(desc && status && ddorpm && category && associations && dateDue)) {
      alert('Please fill in all required fields!');
    } else {
      const res = await updateJobsData(this.state.jobToAdd);

      if (res.status === 'new_job_created') {
        history.replace(`${mainPath}/details/${res.payload.id}`);
        this.setState(prevState => ({
          jobToAdd: {
            ...prevState.jobToAdd,
            ...res.payload,
          },
        }));
      }
    }
  };

  render() {
    const {
      classes, location, mainPath, history,
    } = this.props;

    const renderOutput = () => {
      switch (this.state.loadProgress) {
        case 'loading':
          return <div>Loading...</div>;
        case 'loaded':
          return (
            <JobFieldsContext.Provider
              value={
                {
                  handleTaskAdd: this.handleTaskAdd,
                  handleTaskDelete: this.handleTaskDelete,
                  handleInputChange: this.handleInputChange,
                  jobToAdd: this.state.jobToAdd,
                }
              }
            >
              <JobsDetailsContainer />
            </JobFieldsContext.Provider>
          );
        case 'job_not_found':
          return <Redirect from={location.pathname} to={mainPath} />;
        default:
          return null;
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
            disabled={this.state.loadProgress !== 'loaded'}
          >
            Save
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
