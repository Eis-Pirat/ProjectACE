import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/dashboard">
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/project/create">
            <i className="fas fa-plus"></i> Create Project
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
