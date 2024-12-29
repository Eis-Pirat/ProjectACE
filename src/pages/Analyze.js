import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { detectAlgorithmsFromFile, detectAlgorithmsFromGitHub } from '../api/algorithmService';
import '../styles/Analyze.css'; // Add CSS for styling

const Analyze = () => {
  const { projectId } = useParams(); // Get projectId from URL
  const [githubUrl, setGithubUrl] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async () => {
    if (!file) {
      alert('Veuillez sélectionner un fichier avant de lancer l\'analyse.');
      return;
    }
  
    try {
      const response = await detectAlgorithmsFromFile(file, projectId);
      console.log('API Response:', response); // Log to check structure
  
      // Check if the response contains a data field with an array
      if (response && Array.isArray(response.data)) {
        // Display the algorithms as an alert
        alert('Algorithmes détectés : \n\n' + response.data.join('\n\n'));
      } else {
        alert('Unexpected response format: ' + JSON.stringify(response));
      }
    } catch (error) {
      console.error('Erreur lors de l\'analyse du fichier :', error);
      alert('Erreur lors de l\'analyse du fichier. Veuillez réessayer.');
    }
  };
  
  

  const handleGitHubAnalyze = async () => {
    if (!githubUrl) {
      alert('Veuillez saisir une URL GitHub valide.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await detectAlgorithmsFromGitHub(githubUrl, projectId);
      alert('Algorithmes détectés : ' + response.join(', '));
    } catch (error) {
      console.error('Erreur lors de l\'analyse GitHub :', error);
      alert('Erreur lors de l\'analyse GitHub. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="analyze-container">
      <h2 className="analyze-title">Analyser le projet {projectId}</h2>
      
      <div className="analyze-section">
        <h3>Analyse depuis un fichier</h3>
        <input
          className="file-input"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept=".zip"
        />
        <button
          className="analyze-button"
          onClick={handleFileUpload}
          disabled={isLoading}
        >
          {isLoading ? 'Analyse en cours...' : 'Analyser'}
        </button>
      </div>

      <div className="analyze-section">
        <h3>Analyse depuis GitHub</h3>
        <input
          className="github-input"
          type="text"
          placeholder="URL GitHub"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
        />
        <button
          className="analyze-button"
          onClick={handleGitHubAnalyze}
          disabled={isLoading}
        >
          {isLoading ? 'Analyse en cours...' : 'Analyser'}
        </button>
      </div>
    </div>
  );
};

export default Analyze;
