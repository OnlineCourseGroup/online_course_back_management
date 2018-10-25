import apis from '../api';
import http from '../http';

export const getAllGuiders = (params = {}) => http.get(apis.getAllGuiders, params);

export const deleteGuiderById = (params = {}) => http.post(apis.deleteGuiderById, params);

export const addGuider = (params = {}) => http.post(apis.addGuider, params);

export const singleGuider = (params = {}) => http.post(apis.singleGuider, params);
export const updateGuider = (params = {}) => http.post(apis.updateGuider, params);
