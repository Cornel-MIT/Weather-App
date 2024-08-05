import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="hamburger" onClick={toggleMenu}>
        <div />
        <div />
        <div />
      </div>
      <ul className={`nav-list ${isOpen ? 'active' : ''}`}>
        {user ? (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => setIsOpen(false)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/new-location" onClick={() => setIsOpen(false)}>New Location</Link>
            </li>
            <li className="logout">
              <button className="nav-button" onClick={() => { logout(); setIsOpen(false); }}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/login" onClick={() => setIsOpen(false)}>Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register" onClick={() => setIsOpen(false)}>Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
