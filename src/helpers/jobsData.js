let counter = 0;
export function createData(
  desc,
  status,
  ddorpm,
  category,
  associations,
  dateDue,
  taskList,
) {
  const dateCreated = '05/04/2018';
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
    tasksTotal,
    tasksCompleted,
  };
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
      {
        id: 1,
        name: 'Quarterly Maintenance (Tower Masts & Poles)',
        type: 'ESCORT',
        status: 'Completed',
        assignedTo: [],
        estHours: 2.5,
      },
      {
        id: 2,
        name: 'Quarterly Maintenance (Tower Masts & Poles)',
        type: 'ESCORT',
        status: 'Active',
        assignedTo: [],
        estHours: 2.5,
      },
      {
        id: 3,
        name: 'Quarterly Maintenance (Tower Masts & Poles)',
        type: 'ESCORT',
        status: 'Not Started, Unassigned',
        assignedTo: [],
        estHours: 2.5,
      },
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
      {
        id: 1,
        name: 'Quarterly Maintenance (Tower Masts & Poles)',
        type: 'ESCORT',
        status: 'Paused',
        assignedTo: [],
        estHours: 2.5,
      },
    ],
  ),
];

export const columnData = [
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
