import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

import CustomTable2 from 'components/CustomTable2/CustomTable2';
import { StyledModalAddTaskSingle } from 'views/Jobs/components/TaskModals';
import { JobsContext } from 'containers/App/App';
import { taskColumnData } from "helpers/jobsData";

const styles = theme => ({
  root: {
    flex: 1,
    height: '100%',
    padding: '10px 10px 10px 10px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  contentArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
});

const createControl = (controlName, controlOnClick, selectedAsParam) => (
  {
    name: controlName,
    onClick: controlOnClick,
    selectedAsParam,
  }
);

class TabTasks extends Component {
  state = {
    modalOpen: 'none',
  };

  handleOpenModalClick = (modalName) => {
    if (this.state.modalOpen === 'none') {
      this.setState({
        modalOpen: modalName,
      });
    }
  };

  handleModalClose = async () => {
    const { contextProps } = this.props;
    const { resetTask } = contextProps;

    await resetTask();
    this.setState({
      modalOpen: 'none',
    });
  };

  handleTaskAdd = async (event) => {
    const { contextProps } = this.props;
    const { handleTaskAdd } = contextProps;

    const { status, payload } = await handleTaskAdd(event);
    switch (status) {
      case 'TASK_CREATE_SUCCESS':
        await this.handleModalClose();
        break;
      case 'TASK_CREATE_ERROR':
        alert(payload);
        break;
      default:
        break;
    }
  };

  render () {
    const { classes, contextProps } = this.props;
    const {
      currentJob,
      handleTaskDelete,
      handleInputChange,
      currentTask,
    } = contextProps;
    const onChange = (event) => handleInputChange(event, 'currentTask');

    const controlList =
      [
        createControl(
          'Add new task',
          () => this.handleOpenModalClick('addTaskSingle'),
          false,
        ),
        createControl(
          'Add task group',
          () => this.handleOpenModalClick('addTaskGroup'),
          false,
        ),
        createControl(
          'Delete task',
          handleTaskDelete,
          true,
        ),
      ];

    return (
      <div className={classes.root}>
        <Paper className={classes.contentArea}>
          <StyledModalAddTaskSingle
            isOpen={this.state.modalOpen === 'addTaskSingle'}
            handleClose={this.handleModalClose}
            handleTaskAdd={this.handleTaskAdd}
            onChange={onChange}
            currentTask={currentTask}
          />
          <CustomTable2
            tableTitle="Tasks"
            data={currentJob.taskList}
            columnData={taskColumnData}
            controlList={controlList}
          />
        </Paper>
      </div>
    );
  }
}

TabTasks.propTypes = {
  contextProps: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)((props) =>
  <JobsContext.Consumer>
    {
      contextProps => <TabTasks contextProps={contextProps} {...props} />
    }
  </JobsContext.Consumer>
);
