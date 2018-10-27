

// 集中管理路由，所有的接口地址：
// 1.整个应用用到了哪些接口一目了然
// 2.接口地址可能变化，方便管理

const prefix = '';
export default(config => Object.keys(config).reduce((copy, name) => {
  // eslint-disable-next-line
  copy[name] = `${prefix}${config[name]}`;
  return copy;
}, {}))({

  // admin block
  onLogin: '/api/admin/login',
  getAllAdmins: '/api/admin/list',
  deleteAdminById: '/api/admin/delete',
  addAdmin: '/api/admin/insert',
  singleAdmin: '/api/admin/single',
  updateAdmin: '/api/admin/update',

  // user block
  getAllUsers: '/api/user/list',
  deleteUserById: '/api/user/delete',
  addUser: '/api/user/insert',
  singleUser: '/api/user/single',
  updateUser: '/api/user/update',

  // manager block
  getAllManagers: '/api/manager/list',
  deleteManagerById: '/api/manager/delete',
  addManager: '/api/manager/insert',
  singleManager: '/api/manager/single',
  updateManager: '/api/manager/update',

  // order block
  getAllOrders: '/api/order/list',
  deleteOrderById: '/api/order/delete',
  addOrder: '/api/order/insert',
  singleOrder: '/api/order/single',
  updateOrder: '/api/order/update',

  // rsa block
  getPublicKey: '/api/rsa/get',
  RSALogin: '/api/rsa/login',
});
