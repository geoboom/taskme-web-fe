/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Switch, Redirect, Route } from 'react-router-dom';
import lightBlue from 'material-ui/colors/lightBlue';
import moment from 'moment';
import { Provider } from 'react-redux';

import TopAppBar from 'components/TopAppBar/TopAppBar';
import NavDrawer from 'components/NavDrawer/NavDrawer';
import appRoutes from 'routes/appRoutes';
import { data as jobsData } from 'helpers/jobsData';
import { validateInput } from "helpers/utils"

export const JobsContext = React.createContext();

const styles = theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    zIndex: 1,
    overflow: 'hidden',
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

const initialJob = {
  id: null,
  desc: '',
  status: '',
  ddorpm: '',
  category: '',
  associations: '',
  taskList: [],
  createdDate: '',
  dateDue: '',
  totalTasks: '',
  completedTasks: '',
};

const initialTask = {
  name: '',
  type: '',
  estHours: 0,
  assignedTo: [],
  dateDue: '',
};

class App extends React.Component {
  state = {
    jobsData,
    currentJob: initialJob,
    currentTask: initialTask,
    isLoading: false,
  };

  resetJob = async () => {
    await this.setState({
      currentJob: initialJob,
    });
  };

  resetTask = async () => {
    await this.setState({
      currentTask: initialTask,
    });
  };

  /*
    Updates or adds a new job to this.state.jobsData without mutating it by
    searching for job with job.id in this.state.jobsData.
    If such a job exists, new array with this job replaced is created and
    this.state.jobsData is set to that new array. Otherwise, this.state.jobsData
    is set to a new array [...this.state.jobsData, job].
   */
  updateJobsData = async () => {
    let job = { ...this.state.currentJob };
    const jobsData = this.state.jobsData;

    if (!validateInput(job, ['id', 'taskList', 'createdDate', 'totalTasks', 'completedTasks', ])) {
      return ({
        status: 'JOB_SAVE_ERROR',
        payload: 'Input fields unfilled',
      });
    }

    if (job.id) {
      // Editing
      const oldJob = jobsData.find(jobObject => jobObject.id === parseInt(job.id, 10));
      if (!oldJob) {
        return ({
          status: 'JOB_SAVE_ERROR',
          payload: `Job ${job.id.toString()} not found`,
        });
      }
      const oldJobIndex = this.state.jobsData.indexOf(oldJob);
      job.tasksTotal = job.taskList.length;
      job.tasksCompleted = job.taskList.filter(task => task.status === 'Completed').length;

      await this.setState(prevState => ({
        jobsData: [
          ...prevState.jobsData.slice(0, oldJobIndex),
          { ...oldJob, ...job, },
          ...prevState.jobsData.slice(oldJobIndex + 1),
        ],
      }));

      return ({
        status: 'JOB_SAVE_SUCCESS',
        payload: '',
      });

    } else {
      // Adding
      const largestIdJob = jobsData.reduce((largest, curr) => {
        return curr.id > largest.id ? curr : largest;
      });

      job.id = largestIdJob.id + 1;
      job.dateCreated = moment().format('YYYY-MM-DD').toString();
      job.tasksTotal = job.taskList.length;
      job.tasksCompleted = job.taskList.filter(task => task.status === 'Completed').length;

      await this.setState(prevState => ({
        currentJob: job,
        jobsData: [...prevState.jobsData, job],
      }));

      return ({
        status: 'JOB_CREATE_SUCCESS',
        payload: job.id,
      });
    }
  };

  handleInputChange = (event, parentObject) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;

    if (parentObject) {
      this.setState(prevState => ({
        [parentObject]: {
          ...prevState[parentObject],
          [targetName]: targetValue,
        },
      }));
    } else {
      this.setState({
        [targetName]: targetValue,
      });
    }

  };

  handleTaskDelete = (event, selectedTasks) => {
    console.log(selectedTasks);
  };

  handleTaskAdd = async (event) => {
    let task = { ...this.state.currentTask };
    const job = { ...this.state.currentJob };

    if (!validateInput(task)) {
      return ({
        status: 'TASK_CREATE_ERROR',
        payload: 'Input fields unfilled',
      });
    }

    const largestIdTask = job.taskList.reduce((largest, curr) => {
      return curr.id > largest.id ? curr : largest;
    }, 0);

    console.log(job.taskList);

    task.id = largestIdTask ? largestIdTask.id + 1 : 1;
    task.dateCreated = moment().format('YYYY-MM-DD').toString();
    task.status = task.assignedTo.length >= 1 ? 'Assigned, pending' : 'Unassigned';

    await this.setState(prevState => ({
      currentJob: {
        ...prevState.currentJob,
        taskList: [...prevState.currentJob.taskList, task],
      },
    }));

    return ({
      status: 'TASK_CREATE_SUCCESS',
      payload: task.id,
    });
  };

  getJobById = async (jobId) => {
    let foundJob;
    let response;

    await this.setState({
      isLoading: true,
    }, () => {
      foundJob = this.state.jobsData.find((job) => {
        return (job.id === parseInt(jobId, 10));
      });

      if (foundJob) {
        this.setState({
          currentJob: { ...foundJob },
          isLoading: false,
        }, () => {
          response = {
            status: 'JOB_FOUND',
            payload: '',
          };
        });
      } else {
        this.setState({
          isLoading: false,
        }, () => {
          response = {
            status: 'JOB_NOT_FOUND',
            payload: '',
          };
        });
      }
    });

    return response;
  };

  render() {
    const { classes, location } = this.props;

    return (
      <Provider store={store}>
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
                  currentJob: this.state.currentJob,
                  currentTask: this.state.currentTask,
                  isLoading: this.state.isLoading,
                  resetJob: this.resetJob,
                  resetTask: this.resetTask,
                  updateJobsData: this.updateJobsData,
                  getJobById: this.getJobById,
                  handleInputChange: this.handleInputChange,
                  handleTaskDelete: this.handleTaskDelete,
                  handleTaskAdd: this.handleTaskAdd,
                }
              }
            >
              {switchRoutes}
            </JobsContext.Provider>
          </div>
        </div>
      </Provider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
