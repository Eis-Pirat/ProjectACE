import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../api/projectService';
import '../styles/ProjectForm.css'; // Add CSS file for styling

const ProjectForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  // Fetch the user ID from localStorage or token (replace this with actual logic)
  const userId = localStorage.getItem('userId') || 1; // Replace `1` with dynamic logic if available

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await createProject({ name, description, userId });
      alert('Projet créé avec succès');
      navigate('/dashboard'); // Redirect to Dashboard
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Erreur lors de la création du projet.');
    }
  };

  return (
    <div className="project-form-container">
      <form className="project-form" onSubmit={handleCreateProject}>
        <h2 className="form-title">Créer un projet</h2>
        <input
          className="form-input"
          type="text"
          placeholder="Nom du projet"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          className="form-textarea"
          placeholder="Description du projet"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button className="form-button" type="submit">
          Créer
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
