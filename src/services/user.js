import apis from '../api';
import http from '../http';

export const getAllUsers = (params = {}) => http.get(apis.getAllUsers, params);

export const deleteUserById = (params = {}) => http.post(apis.deleteUserById, params);

export const addUser = (params = {}) => http.post(apis.addUser, params);

export const singleUser = (params = {}) => http.post(apis.singleUser, params);
export const updateUser = (params = {}) => http.post(apis.updateUser, params);
