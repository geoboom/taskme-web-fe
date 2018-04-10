import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

import CustomTable2 from 'components/CustomTable2/CustomTable2';
import { JobFieldsContext } from 'views/Jobs/Details';
import { taskColumnData } from "../../../helpers/jobsData";

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

const createControl = (controlName, controlOnClick) => (
  {
    name: controlName,
    onClick: controlOnClick,
  }
);

const modalAddTaskSingle = () => {
 return (
  <div>
    testing
  </div>
 );
};

class TabTasks extends Component {
  state = {
    modalOpen: 'none',
    selectedTasks: [],
  };

  handleOpenModalClick = (modalName) => {
    if (this.state.modalOpen === 'none') {
      this.setState({
        modalOpen: modalName,
      });
    }
  };

  render () {
    const { classes } = this.props;

    return (
      <JobFieldsContext.Consumer>
        {
          contextProps => {
            const {
              jobToAdd,
              handleTaskAdd,
              handleTaskDelete,
            } = contextProps;

            const {
              taskList
            } = jobToAdd;

            const controlList =
              [
                createControl(
                  'Add new task',
                  () => this.handleOpenModalClick('addNewTaskSingle'),
                ),
                createControl(
                  'Add task group',
                  () => this.handleOpenModalClick('addNewTaskGroup'),
                ),
                createControl(
                  'Delete task',
                  () => handleTaskDelete(this.state.selectedTasks),
                ),
              ];

            return (
              <div className={classes.root}>
                <Paper className={classes.contentArea}>
                  <CustomTable2
                    tableTitle="Tasks"
                    data={taskList}
                    columnData={taskColumnData}
                    controlList={controlList}
                  />
                </Paper>
              </div>
            );
          }
        }
      </JobFieldsContext.Consumer>
    );
  };
}

TabTasks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TabTasks);
