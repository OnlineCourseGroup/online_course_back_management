import apis from '../api';
import http from '../http';

export const getAllManagers = (params = {}) => http.get(apis.getAllManagers, params);

export const deleteManagerById = (params = {}) => http.post(apis.deleteManagerById, params);

export const addManager = (params = {}) => http.post(apis.addManager, params);

export const singleManager = (params = {}) => http.post(apis.singleManager, params);

export const updateManager = (params = {}) => http.post(apis.updateManager, params);
