import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';

import CustomTable from 'components/CustomTable/CustomTable';
import { jobColumnData } from 'helpers/jobsData';
import { JobsContext } from 'containers/App/App';

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  contentAreaWrapper: {
    margin: '0px 10px 10px 10px',
    padding: '20px 10px 10px 10px',
    flex: 1,
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

const Main = ({ classes, history, location }) => {
  const loadJobDetails = (id) => {
    history.push(`${location.pathname}/details/${id}`);
  };

  const content = (contextProps) => (
    <div className={classes.root}>
      <Toolbar style={{ minHeight: '55px', padding: '0px 10px 0px 10px' }}>
        <Button variant="raised" color="secondary" disabled>
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
          onClick={
            () => {
              history.push(`${location.pathname}/new`);
            }
          }
        >
          New
        </Button>
      </Toolbar>
      <Paper elevation={1} className={classes.contentAreaWrapper}>
        <Paper className={classes.contentArea}>
           <CustomTable
             tableTitle="Jobs"
             handleRowClick={loadJobDetails}
             data={contextProps.jobsData}
             columnData={jobColumnData}
           />
        </Paper>
      </Paper>
    </div>
  );

  return (
    <JobsContext.Consumer>
      {content}
    </JobsContext.Consumer>
  );
};

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);
