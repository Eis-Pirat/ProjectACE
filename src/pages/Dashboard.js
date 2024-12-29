import React, { useEffect, useState } from 'react';
import { getProjectsByUserId } from '../api/projectService';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Fetch userId from localStorage

  useEffect(() => {
    const fetchProjects = async () => {
      if (!userId) {
        console.error('User ID is null or undefined. Cannot fetch projects.');
        return;
      }
      try {
        const response = await getProjectsByUserId(userId);
        setProjects(response.data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        alert('Erreur lors du chargement des projets.');
      }
    };

    fetchProjects();
  }, [userId]);

  return (
    <div className="dashboard-container">
      <h2>Mes Projets</h2>
      <button onClick={() => navigate('/project/create')}>Créer un projet</button>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h3>{project.name}</h3>
            <button onClick={() => navigate(`/analyze/${project.id}`)}>Analyser</button>
            <button onClick={() => navigate(`/results/${project.id}`)}>Voir Résultats</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
