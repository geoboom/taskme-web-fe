import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

import { JobsContext } from 'containers/App/App';

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  formSpacer: {
    flex: 9,
  },
  formAreaRoot: {
    // flex: 4,
    minWidth: '520px',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  heading: {
    flex: 1,
  },
  formRoot: {
    flex: 10,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  formRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing.unit * 2,
  },
  formRowSpacer: {
    flex: 3,
    display: 'flex',
  },
  formControlInput: {
    minWidth: '120px',
  },
  formControlSelect: {
    flex: 1,
    minWidth: '120px',
    maxWidth: '240px',
  },
});

const JobsDetailsFormInput = ({ classes }) => (
  <JobsContext.Consumer>
    {
      contextProps => {
        const { handleInputChange, currentJob } = contextProps;
        const onChange = (event) => handleInputChange(event, 'currentJob');

        return (
          <div className={classes.root}>
            <div className={classes.formAreaRoot}>
              <Typography
                variant="title"
                className={classes.heading}
              >
                {
                  currentJob.id
                    ?
                    `Editing Job: ${currentJob.id}`
                    :
                    'Adding New Job'
                }
              </Typography>
              <form className={classes.formRoot} autoComplete="off">
                <FormControl className={classes.formControlInput}>
                  <InputLabel htmlFor="job-description">
                    Description
                  </InputLabel>
                  <Input
                    value={currentJob.desc}
                    onChange={onChange}
                    name="desc"
                  />
                </FormControl>
                <div className={classes.formRow}>
                  <FormControl className={classes.formControlSelect}>
                    <InputLabel htmlFor="job-status">
                      Status
                    </InputLabel>
                    <Select
                      value={currentJob.status}
                      onChange={onChange}
                      input={<Input name="status" />}
                      autoWidth
                    >
                      <MenuItem value="Not Started">Not Started</MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControlSelect}>
                    <InputLabel htmlFor="job-demandorpm">
                      Demand/PM
                    </InputLabel>
                    <Select
                      value={currentJob.ddorpm}
                      onChange={onChange}
                      input={<Input name="ddorpm" />}
                      autoWidth
                    >
                      <MenuItem value="Demand">Demand</MenuItem>
                      <MenuItem value="PM">Preventive Maintenance</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className={classes.formRow}>
                  <FormControl className={classes.formControlSelect}>
                    <InputLabel htmlFor="job-category">
                      Category
                    </InputLabel>
                    <Select
                      value={currentJob.category}
                      onChange={onChange}
                      input={<Input name="category" />}
                      autoWidth
                    >
                      <MenuItem value="Building & Civil">Building & Civil</MenuItem>
                      <MenuItem value="Electrical">Electrical</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControlSelect}>
                    <InputLabel htmlFor="job-associations">
                      Associations
                    </InputLabel>
                    <Input
                      value={currentJob.associations}
                      onChange={onChange}
                      name="associations"
                    />
                  </FormControl>
                </div>
                <div className={classes.formRow}>
                  <FormControl className={classes.formControlSelect}>
                    <TextField
                      label="Due Date"
                      type="date"
                      value={currentJob.dateDue}
                      onChange={onChange}
                      name="dateDue"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                  <div className={classes.formControlSelect} />
                </div>
                <div className={classes.formRowSpacer} />
              </form>
            </div>
            {/*<div className={classes.formSpacer} />*/}
          </div>
        );
      }
    }
  </JobsContext.Consumer>
);

JobsDetailsFormInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobsDetailsFormInput);
