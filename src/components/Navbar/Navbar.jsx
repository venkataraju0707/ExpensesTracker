import React from 'react';
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <nav  className='navbar'>
      <div className='navbar-container'>
        <div className="navbar-brand">
          <strong>EXPENSE TRACKER</strong>
        </div>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          {currentUser ? (
            <div className="navbar-user-icon" >
              {currentUser.username.charAt(0).toUpperCase()}
            </div>
          ) : (
            <Link to="/login" className="navbar-link">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;