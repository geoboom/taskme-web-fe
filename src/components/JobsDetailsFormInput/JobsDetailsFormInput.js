import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  heading: {
    flex: 0.1,
    margin: theme.spacing.unit,
  },
  formSpacer: {
    flex: 9,
  },
  formRoot: {
    flex: 4,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  formRow: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  formRowSpacer: {
    flex: 3,
    display: 'flex',
  },
  formControlInput: {
    flex: 1,
    margin: theme.spacing.unit,
    minWidth: '120px',
  },
  formControlSelect: {
    flex: 1,
    margin: theme.spacing.unit,
    minWidth: '120px',
    maxWidth: '240px',
  },
});

const JobsDetailsFormInput = ({ classes, handleInputChange, jobToAdd }) => (
  <div className={classes.root}>
    <form className={classes.formRoot} autoComplete="off">
      <FormControl className={classes.formControlInput}>
        <InputLabel htmlFor="job-description">
            Description
        </InputLabel>
        <Input
          value={jobToAdd.desc}
          onChange={handleInputChange}
          name="desc"
        />
      </FormControl>
      <div className={classes.formRow}>
        <FormControl className={classes.formControlSelect}>
          <InputLabel htmlFor="job-status">
              Status
          </InputLabel>
          <Select
            value={jobToAdd.status}
            onChange={handleInputChange}
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
            value={jobToAdd.ddorpm}
            onChange={handleInputChange}
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
            value={jobToAdd.category}
            onChange={handleInputChange}
            input={<Input name="category" />}
            autoWidth
          >
            <MenuItem value="Not Started">Not Started</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControlSelect}>
          <InputLabel htmlFor="job-associations">
              Associations
          </InputLabel>
          <Select
            value={jobToAdd.associations}
            onChange={handleInputChange}
            input={<Input name="associations" />}
            autoWidth
          >
            <MenuItem value="Demand">Demand</MenuItem>
            <MenuItem value="PM">Preventive Maintenance</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.formRow}>
        <FormControl className={classes.formControlSelect}>
          <InputLabel htmlFor="job-datedue">
              Due Date
          </InputLabel>
          <Select
            value={jobToAdd.dateDue}
            onChange={handleInputChange}
            input={<Input name="dateDue" />}
            autoWidth
          >
            <MenuItem value="Not Started">Not Started</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>
        </FormControl>
        <div className={classes.formControlSelect} />
      </div>
      <div className={classes.formRowSpacer} />
    </form>
    <div className={classes.formSpacer} />
  </div>
);

JobsDetailsFormInput.propTypes = {
  classes: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  jobToAdd: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobsDetailsFormInput);
