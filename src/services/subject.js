import apis from '../api'
import http from '../http'

export const getAllSubject = (params = {}) => http.get(apis.getAllSubject);

export const deleteSubjectById = (params = {}) => http.post(apis.deleteSubjectById);

export const singleCSubject = (params = {}) => http.post(apis.deleteSubjectById);

export const updateSubject = (params = {}) => http.post(apis.updateSubject);

export const addSubject = (params = {}) => http.post(apis.addSubject);