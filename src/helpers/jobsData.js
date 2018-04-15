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

  const dateCreated = moment().format('YYYY-MM-DD').toString();
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
    dateDue: moment().add(7, 'days').format('YYYY-MM-DD').toString(),
    taskList,
    tasksTotal,
    tasksCompleted,
  };
}

export function createTask(
  name,
  type,
  assignedTo,
  estHours,
  dateDue
) {

  const dateCreated = moment().format('YYYY-MM-DD').toString();
  const status = assignedTo.length >= 1 ? 'Assigned, pending' : 'Unassigned';

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
    '2018-05-20',
    [
      createTask(
        'Quarterly Maintenance (Tower Masts & Poles)',
        'ESCORT',
        [],
        2.5,
        '2018-05-20',
      ),
      createTask(
        'Quarterly Maintenance (Tower Masts & Poles)',
        'ESCORT',
        [],
        2.5,
        '2018-05-20',
      ),
      createTask(
        'Quarterly Maintenance (Tower Masts & Poles)',
        'ESCORT',
        [],
        2.5,
        '2018-05-20',
      ),
    ],
  ),
  createData(
    'Monthly Pruning (Trees/Hedges/Shrubs/Groundcovers) (Horticultural (Landscaping))',
    'Active',
    'PM',
    'Building & Civil',
    'Horticultural (Landscaping)',
    '2018-05-20',
    [
      createTask(
        'Quarterly Maintenance (Tower Masts & Poles)',
        'ESCORT',
        [],
        2.5,
        '2018-05-20',
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
