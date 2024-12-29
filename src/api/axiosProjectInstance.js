import axios from 'axios';

const axiosProjectInstance = axios.create({
  baseURL: process.env.REACT_APP_PROJECT_SERVICE_URL, // Project service URL
});

export default axiosProjectInstance;
