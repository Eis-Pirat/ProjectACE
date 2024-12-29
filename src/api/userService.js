import axiosUserInstance from './axiosUserInstance';

// Récupérer tous les utilisateurs
export const getAllUsers = () => {
  return axiosUserInstance.get('/api/users');
};

// Récupérer un utilisateur par ID
export const getUserById = (userId) => {
  return axiosUserInstance.get(`/api/users/${userId}`);
};

// Supprimer un utilisateur
export const deleteUser = (userId) => {
  return axiosUserInstance.delete(`/api/users/${userId}`);
};
