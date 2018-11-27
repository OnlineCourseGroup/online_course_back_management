import apis from '../api'
import http from '../http'

export const getAllComment = (params = {}) => http.get(apis.getAllComment,params);

export const deleteCommentById = (params ={}) => http.post(apis.deleteContentById);

export const singleComment = (params ={}) => http.post(apis.singleContent);

export const updateComment = (params ={}) => http.post(apis.updateContent);

export const addComment = (params ={}) => http.post(apis.addContent);

