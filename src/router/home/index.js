import HomePage from 'pages/home';
import DashBoardRoutes from './dashboard';
import UserRoutes from './user';
import ManagerRoutes from './manager';
import AdminRoutes from './admin';
import OrderRoutes from './order';
import ComentRoutes from './comment'
import SubjectRoutes from './subject'

export default [
  {
    path: '/home',
    component: HomePage,
    name: 'home',
    children: [
      ...UserRoutes,
      ...DashBoardRoutes,
      ...ManagerRoutes,
      ...AdminRoutes,
      ...OrderRoutes,
      ...ComentRoutes,
      ...SubjectRoutes
    ],
  },
];
