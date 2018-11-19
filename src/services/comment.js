import apis from '../api'
import http from '../http'

export const getAllContent = (params = {}) => http.get(apis.getAllContent,params);

export const deleteContentById = (params ={}) => http.post(apis.deleteContentById);

export const singleContent = (params ={}) => http.post(apis.singleContent);

export const updateContent = (params ={}) => http.post(apis.updateContent);

export const addContent = (params ={}) => http.post(apis.addContent);

