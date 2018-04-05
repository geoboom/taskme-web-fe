import TabTasks from 'containers/JobsDetailsContainer/TabTasks';
import TabQualityOfWork from 'containers/JobsDetailsContainer/TabQualityOfWork';
import TabLog from 'containers/JobsDetailsContainer/TabLog';

const tabbedContent =
  [
    {
      label: 'Tasks',
      component: TabTasks,
    },
    {
      label: 'Quality of Work',
      component: TabQualityOfWork,
    },
    {
      label: 'Log',
      component: TabLog,
    },
  ];

export default tabbedContent;
