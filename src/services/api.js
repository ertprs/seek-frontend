import axios from 'axios';
import { getToken } from './auth';
import hostConfig from '../constants/host';

export const api = axios.create({ baseURL: `http://${hostConfig.HOST}:${hostConfig.PORT}` });

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;