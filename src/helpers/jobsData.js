import moment from 'moment';

let counter = 0;
export function createData(
  desc,
  status,
  ddorpm,
  category,
  associations,
  dateDue,
  taskListToAdd,
) {

  const taskList = taskListToAdd.map((task, index) => {
    return (
      {
        ...task,
        id: index + 1,
      }
    );
  });

  const dateCreated = moment().format('DD/MM/YYYY').toString();
  const tasksTotal = taskList.length;
  const tasksCompleted = taskList.filter(task => task.status === 'Completed').length;

  counter += 1;

  return {
    id: counter,
    desc,
    status,
    ddorpm,
    category,
    associations,
    dateCreated,
    dateDue,
    taskList,
    tasksTotal,
    tasksCompleted,
  };
}

export function createTask(
  name,
  type,
  status,
  assignedTo,
  estHours,
  dateDue
) {

  const dateCreated = moment().format('DD/MM/YYYY').toString();

  return ({
    name,
    type,
    status,
    assignedTo,
    estHours,
    dateCreated,
    dateDue,
  });
}

export const data = [
  createData(
    'Quarterly Maintenance (Tower Masts & Poles)',
    'Not Started',
    'PM',
    'Building & Civil',
    'Tower Masts & Poles',
    '08/05/2018',
    [
      createTask(
        'Quarterly Maintenance (Tower Masts & Poles)',
        'ESCORT',
        'Completed',
        [],
        2.5,
        '20/05/2018',
      ),
      createTask(
        'Quarterly Maintenance (Tower Masts & Poles)',
        'ESCORT',
        'Active',
        [],
        2.5,
        '20/05/2018',
      ),
      createTask(
        'Quarterly Maintenance (Tower Masts & Poles)',
        'ESCORT',
        'Not Started, Unassigned',
        [],
        2.5,
        '20/05/2018',
      ),
    ],
  ),
  createData(
    'Monthly Pruning (Trees/Hedges/Shrubs/Groundcovers) (Horticultural (Landscaping))',
    'Active',
    'PM',
    'Building & Civil',
    'Horticultural (Landscaping)',
    '18/05/2018',
    [
      createTask(
        'Quarterly Maintenance (Tower Masts & Poles)',
        'ESCORT',
        'Paused',
        [],
        2.5,
        '20/05/2018',
      ),
    ],
  ),
];

export const jobColumnData = [
  {
    id: 'id', numeric: false, disablePadding: true, label: 'Job ID',
  },
  {
    id: 'desc', numeric: false, disablePadding: true, label: 'Description',
  },
  {
    id: 'status', numeric: true, disablePadding: false, label: 'Status',
  },
  {
    id: 'ddorpm', numeric: true, disablePadding: false, label: 'Demand/PM',
  },
  {
    id: 'category', numeric: true, disablePadding: false, label: 'Category',
  },
  {
    id: 'associations', numeric: true, disablePadding: false, label: 'Associations',
  },
  {
    id: 'dateCreated', numeric: true, disablePadding: false, label: 'Created Date',
  },
  {
    id: 'dateDue', numeric: true, disablePadding: false, label: 'Due Date',
  },
  {
    id: 'tasksTotal', numeric: true, disablePadding: false, label: 'Total Tasks',
  },
  {
    id: 'tasksCompleted', numeric: true, disablePadding: false, label: 'Completed Tasks',
  },
];

export const taskColumnData = [
  {
    id: 'id', numeric: false, disablePadding: true, label: 'Task ID',
  },
  {
    id: 'name', numeric: false, disablePadding: true, label: 'Name',
  },
  {
    id: 'type', numeric: true, disablePadding: false, label: 'Type',
  },
  {
    id: 'assignedTo', numeric: true, disablePadding: false, label: 'Assigned To',
  },
  {
    id: 'status', numeric: true, disablePadding: false, label: 'Status',
  },
  {
    id: 'estHours', numeric: true, disablePadding: false, label: 'Est. Hrs',
  },
  {
    id: 'dateCreated', numeric: true, disablePadding: false, label: 'Created Date',
  },
  {
    id: 'dateDue', numeric: true, disablePadding: false, label: 'Due Date',
  },
];
