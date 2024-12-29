import axiosAlgorithmInstance from './axiosAlgorithmInstance';

// Detect algorithms from a file
export const detectAlgorithmsFromFile = async (file, projectId) => {
    const formData = new FormData();
    formData.append('projectFile', file); // Match @RequestParam MultipartFile
    formData.append('projectId', projectId); // Match @RequestParam Long
  
    return await axiosAlgorithmInstance.post('/api/algorithms/detect', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure correct content type
      },
    });
  };

// Detect algorithms from a GitHub URL
export const detectAlgorithmsFromGitHub = async (githubUrl, projectId) => {
    try {
      const formData = new FormData();
      formData.append('githubUrl', githubUrl);
      formData.append('projectId', projectId);
  
      console.log('Sending GitHub analyze request:', { githubUrl, projectId }); // Log request data
  
      const response = await axiosAlgorithmInstance.post('/api/algorithms/detectFromGitHub', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('GitHub analyze response:', response.data); // Log response data
      return response.data;
    } catch (error) {
      console.error('Error analyzing from GitHub:', error.response?.data || error.message);
      throw error;
    }
  };
  

// Fetch algorithms by project ID
export const fetchAlgorithmsByProject = async (projectId) => {
  try {
    const response = await axiosAlgorithmInstance.get(`/api/algorithms/project/${projectId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching algorithms for project ID ${projectId}:`, error);
    throw error;
  }
};



export const getAlgorithmsByProjectId = async (projectId) => {
    try {
      const response = await axiosAlgorithmInstance.get(`/api/algorithms/project/${projectId}`);
      console.log('Fetched Algorithms:', response.data); // Log for debugging
      return response.data; // Should be an array of algorithms
    } catch (error) {
      console.error('Error fetching algorithms by project ID:', error);
      throw error; // Propagate error for handling
    }
  };