import axios from 'axios';

// Create axios instance pointing to your backend
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend URL
  timeout: 10000 // 10 second timeout
});

// Add automatic JWT token attachment to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;