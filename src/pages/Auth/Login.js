import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { signIn } from '../../api/authService';
import '../../styles/Login.css';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending login request:', { email, password });

      // API call to login
      const response = await signIn({ email, password });
      const token = response.data;

      // Decode the token to extract userId
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      console.log('Decoded Token:', decodedToken);

      // Store the token and userId in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      // Update the login state
      setIsLoggedIn(true);

      alert('Connexion réussie');
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setError(error.response?.data || 'Erreur de connexion. Veuillez réessayer.');
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Se connecter</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
