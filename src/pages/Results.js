import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAlgorithmsByProjectId } from '../api/algorithmService';
import '../styles/Results.css';

const Results = () => {
  const { projectId } = useParams();
  const [algorithms, setAlgorithms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getAlgorithmsByProjectId(projectId);
        setAlgorithms(data || []);
      } catch (err) {
        console.error('Error fetching results:', err);
        setError('Erreur lors du chargement des résultats.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [projectId]);

  if (isLoading) {
    return <p>Chargement des résultats...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="results-container">
      <h2>Résultats pour le Projet {projectId}</h2>
      {algorithms.length > 0 ? (
        <ul className="results-list">
          {algorithms.map((algo, index) => (
            <li key={index} className="results-item">
              <h3>{algo.name}</h3>
              <pre className="code-block">{algo.code}</pre>
              <p className="recommendation"><strong>Recommendation:</strong> {algo.recommendation}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun algorithme détecté pour ce projet.</p>
      )}
    </div>
  );
};

export default Results;
