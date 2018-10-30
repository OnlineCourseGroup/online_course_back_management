import List from 'pages/manager/list';
import Add from 'pages/manager/add';
import Update from 'pages/manager/update';

export default [
  {
    path: '/mlist',
    name: 'mlist',
    component: List,
  },
  {
    path: '/addm',
    name: 'addm',
    component: Add,
  },
  {
    path: '/updatem',
    name: 'updatem',
    component: Update,
  },
];
