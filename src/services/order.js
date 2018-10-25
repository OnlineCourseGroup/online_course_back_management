import apis from '../api';
import http from '../http';

export const getAllOrders = (params = {}) => http.get(apis.getAllOrders, params);

export const deleteOrderById = (params = {}) => http.post(apis.deleteOrderById, params);

export const addOrder = (params = {}) => http.post(apis.addOrder, params);

export const singleOrder = (params = {}) => http.post(apis.singleOrder, params);
export const updateOrder = (params = {}) => http.post(apis.updateOrder, params);
