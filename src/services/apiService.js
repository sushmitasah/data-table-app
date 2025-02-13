import axios from 'axios';

const API_URL = 'http://localhost:3001/ports';

export const fetchPorts = (params) => axios.get(API_URL, { params });
export const createPort = (data) => axios.post(API_URL, data);
export const updatePort = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deletePort = (id) => axios.delete(`${API_URL}/${id}`);
