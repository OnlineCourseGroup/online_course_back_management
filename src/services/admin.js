import apis from '../api';
import http from '../http';

export const onLogin = (params = {}) => http.post(apis.onLogin, params);
export const getAllAdmins = (params = {}) => http.get(apis.getAllAdmins, params);

export const deleteAdminById = (params = {}) => http.post(apis.deleteAdminById, params);

export const addAdmin = (params = {}) => http.post(apis.addAdmin, params);

export const singleAdmin = (params = {}) => http.post(apis.singleAdmin, params);
export const updateAdmin = (params = {}) => http.post(apis.updateAdmin, params);
