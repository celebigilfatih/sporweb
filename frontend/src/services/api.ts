import axios from 'axios';
import { API_URL } from '@/config';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Reduced timeout to 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Check if we're in browser environment before accessing localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Success:', response.config.url, response.status);
    return response;
  },
  (error) => {
    // Handle different types of errors more gracefully
    if (axios.isCancel(error)) {
      console.log('Request cancelled:', error.message);
      return Promise.reject(new Error('Request was cancelled'));
    }
    
    if (error.code === 'ERR_NETWORK') {
      console.error('Network error - backend server may be down');
      return Promise.reject(new Error('Network error - please check if the server is running'));
    }
    
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
      return Promise.reject(new Error('Request timeout - server is taking too long to respond'));
    }
    
    console.error('API Error Details:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
      code: error.code
    });
    
    return Promise.reject(error);
  }
);

export default api;