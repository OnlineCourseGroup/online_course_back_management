import List from 'pages/subject/list';
import Add from 'pages/subject/add';
import Update from 'pages/subject/update';

export default [
  {
    path: '/slist',
    name: 'slist',
    component: List,
  },
  {
    path: '/adds',
    name: 'adds',
    component: Add,
  },
  {
    path: '/updates',
    name: 'updates',
    component: Update,
  },
];
