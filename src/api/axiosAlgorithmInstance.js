import axios from 'axios';

const axiosAlgorithmInstance = axios.create({
  baseURL: process.env.REACT_APP_ALGORITHM_SERVICE_URL, // Algorithm service URL
});

export default axiosAlgorithmInstance;
