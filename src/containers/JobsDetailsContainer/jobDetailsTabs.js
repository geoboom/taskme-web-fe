import TabTasks from 'views/Jobs/components/TabTasks';
import TabQualityOfWork from 'views/Jobs/components/TabQualityOfWork';
import TabLog from 'views/Jobs/components/TabLog';

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
