import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';

const modalAddTaskSingleStyles = theme => ({
  formRoot: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  formControl: {
    flex: 1,
    minWidth: '120px',
    margin: theme.spacing.unit,
  },
  formRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  formRowSpacer: {
    flex: 3,
    display: 'flex',
  },
});

const ModalAddTaskSingle = props => {
  const {
    isOpen,
    handleTaskAdd,
    handleClose,
    onChange,
    currentTask,
    classes
  } = props;

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
    >
      <DialogTitle id="form-dialog-title">Add Task Single</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <form
            className={classes.formRoot}
            autoComplete="off"
          >
            <div className={classes.formRow}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="task-name">
                  Task Name
                </InputLabel>
                <Input
                  value={currentTask.name}
                  onChange={onChange}
                  name="name"
                />
              </FormControl>
            </div>
            <div className={classes.formRow}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="task-type">
                  Type
                </InputLabel>
                <Select
                  value={currentTask.type}
                  onChange={onChange}
                  input={<Input name="type" />}
                  autoWidth
                >
                  <MenuItem value="Escort">Escort</MenuItem>
                  <MenuItem value="Inspection">Inspection</MenuItem>
                  <MenuItem value="Checklist">Checklist</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="task-hours-est">
                  Est. Hours
                </InputLabel>
                <Input
                  value={currentTask.estHours}
                  onChange={onChange}
                  name="estHours"
                />
              </FormControl>
            </div>
            <div className={classes.formRow}>
              <FormControl className={classes.formControl}>
                <TextField
                  label="Due Date"
                  type="date"
                  value={currentTask.dateDue}
                  onChange={onChange}
                  name="dateDue"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </div>
          </form>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleTaskAdd} color="primary">
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ModalAddTaskSingle.propTypes = {
  isOpen: PropTypes.string.isRequired,
  handleTaskAdd: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  currentTask: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export const StyledModalAddTaskSingle = withStyles(modalAddTaskSingleStyles)(ModalAddTaskSingle);
