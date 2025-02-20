import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true // This ensures cookies are sent with every request
});

// Request interceptor
axiosSecure.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosSecure.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {

      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosSecure;