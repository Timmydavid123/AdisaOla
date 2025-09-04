import React from 'react';
import { Link } from 'react-router-dom';

import '../App.css';

const Navbar: React.FC = () => {


  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Art Gallery
        </Link>
        <div className="nav-menu">
          <Link to="/" className="nav-link">
            Shop
          </Link>
          <Link to="/checkout" className="nav-link cart-link">
    
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;