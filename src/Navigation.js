import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {user && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/new-location">New Location</Link>
            </li>
            <li className="nav-item">
              <button className="nav-button" onClick={logout}>Logout</button>
            </li>
          </>
        )}
        {!user && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;