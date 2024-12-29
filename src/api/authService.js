import axios from './axiosUserInstance';

export const signIn = async (credentials) => {
  return axios.post('/api/auth/signin', credentials); // Ensure endpoint is correct
};

export const signUp = async (userDetails) => {
  return axios.post('/api/auth/signup', userDetails); // Ensure endpoint is correct
};
