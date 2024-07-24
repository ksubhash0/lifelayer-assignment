 

import axios from 'axios';


//https://bingenfiesta.com

const api = axios.create({
    baseURL: 'http://localhost:4003/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
})

export const signInUser = async (data) => api.post('/auth/sigin', data)
export const loginUser = async (data) => api.post('/auth/login', data);
export const verifyLogin = async () => api.get(`/auth/verify`);
export const logount = async () => api.get('/auth/logout');

export const createCandidate = async (data) => api.post('/candidates/create', data);
export const getCandidate = async (page) => api.get(`/candidates/get/${page}`);
export const getCandidateById = async (id) => api.get(`/candidate/getone/${id}`);
export const deleteCandidate = async (id) => api.delete(`/candidate/delete/${id}`);
export const updateCandidate = async (id, data) => api.post(`/candidate/update/${id}`, data)
