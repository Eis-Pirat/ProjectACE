import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../api/authService';
import '../../styles/Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending signup request:', { username, email, password });
      const response = await signUp({ username, email, password });
      console.log('Signup response:', response.data);
      alert('Inscription réussie');
      navigate('/login'); 
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      alert('Erreur d\'inscription : ' + (error.response?.data || 'Veuillez réessayer.'));
    }
  };
  

  return (
    <div className="signup-container">
      <h2>Inscription</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">S'inscrire</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Signup;
