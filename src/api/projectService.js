import axiosProjectInstance from './axiosProjectInstance';

// Récupérer tous les projets
export const getAllProjects = () => {
  return axiosProjectInstance.get('/api/projects');
};

// Récupérer les projets d'un utilisateur
export const getProjectsByUserId = (userId) => {
  return axiosProjectInstance.get(`/api/projects/user/${userId}`);
};

// Créer un projet
export const createProject = (projectData) => {
  return axiosProjectInstance.post('/api/projects', projectData);
};

// Supprimer un projet
export const deleteProject = (projectId) => {
  return axiosProjectInstance.delete(`/api/projects/${projectId}`);
};
