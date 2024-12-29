import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const navigate = useNavigate();

  // Check if the user is logged in by verifying the presence of a token
  const isLoggedIn = !!localStorage.getItem('token'); // Returns true if token exists

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    localStorage.removeItem('userId'); // Optional: clear userId if stored
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="header">
      <h1 className="header-title" onClick={() => navigate('/')}>Algorithm Analyzer</h1>
      <nav className="header-nav">
        {isLoggedIn ? (
          <>
            <button onClick={handleLogout} className="header-button">Se déconnecter</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')} className="header-button">Connexion</button>
            <button onClick={() => navigate('/signup')} className="header-button">S'inscrire</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
