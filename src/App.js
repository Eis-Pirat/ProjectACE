import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard';
import ProjectForm from './pages/ProjectForm';
import Analyze from './pages/Analyze';
import Results from './pages/Results';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="app">
      <Header />
      {isLoggedIn && <Sidebar />}
      <main className={isLoggedIn ? 'main-content with-sidebar' : 'main-content'}>
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Signup />} />
          <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />

          {isLoggedIn ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/project/create" element={<ProjectForm />} />
              <Route path="/analyze/:projectId" element={<Analyze />} />
              <Route path="/results/:projectId" element={<Results />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
