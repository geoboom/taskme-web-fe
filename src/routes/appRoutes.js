import JobsRouter from 'views/Jobs';
import DashboardPage from 'views/Dashboard/Dashboard';

import {
  Dashboard,
  ViewList,
} from 'material-ui-icons';

const appRoutes = [
  {
    path: '/dashboard',
    sidebarName: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage,
  },
  {
    path: '/jobs',
    sidebarName: 'Jobs',
    icon: ViewList,
    component: JobsRouter,
  },
  {
    redirect: true,
    path: '/',
    to: '/jobs',
  },
];

export default appRoutes;

