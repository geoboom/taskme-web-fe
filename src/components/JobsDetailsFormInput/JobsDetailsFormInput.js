import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

import { JobFieldsContext } from 'views/Jobs/Details';

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
    flex: 4,
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
  <JobFieldsContext.Consumer>
    {
      contextProps => {
        const { handleInputChange, jobToAdd } = contextProps;
        return (
          <div className={classes.root}>
            <div className={classes.formAreaRoot}>
              <Typography
                variant="title"
                className={classes.heading}
              >
                {
                  jobToAdd.id
                    ?
                    `Editing Job: ${jobToAdd.id}`
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
                      <MenuItem value="Building & Civil">Building & Civil</MenuItem>
                      <MenuItem value="Electrical">Electrical</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControlSelect}>
                    <InputLabel htmlFor="job-associations">
                      Associations
                    </InputLabel>
                    <Input
                      value={jobToAdd.associations}
                      onChange={handleInputChange}
                      name="associations"
                    />
                  </FormControl>
                </div>
                <div className={classes.formRow}>
                  <FormControl className={classes.formControlSelect}>
                    <TextField
                      label="Due Date"
                      type="date"
                      value={jobToAdd.dateDue}
                      onChange={handleInputChange}
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
            <div className={classes.formSpacer} />
          </div>
        );
      }
    }
  </JobFieldsContext.Consumer>
);

JobsDetailsFormInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobsDetailsFormInput);
