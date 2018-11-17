import List from 'pages/comment/list'
import Add from 'pages/comment/add'
import Update from 'pages/comment/update'

export default [
  {
    name: 'clist',
    path: '/clist',
    component: List    
  },
  {
    name: 'addc',
    path: '/addc',
    component: Add    
  },
  {
    name: 'updatec',
    path: '/updatec',
    component: Update    
  }    
]