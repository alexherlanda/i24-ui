import axios from 'axios';
const baseURL = import.meta.env.VITE_BACKEND_URL;

console.log('baseURL', baseURL);

export const httpClient = axios.create({
  baseURL: baseURL,
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
