import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import Navbar from './navbar.jsx';
import Login from './login.jsx';
import './home.css'; // Import your CSS file

const NavButton = ({ setNavBarOpen, navBarOpen}) => {

    
  const toggleNavBar = () => {
    setNavBarOpen(!navBarOpen);
  };

  return (
    <body>
      <button id='nav-toggle' type='button' onClick={toggleNavBar}>
        <FontAwesomeIcon className="open" icon={faBars} />
        <FontAwesomeIcon className="close" icon={faXmark} />
      </button>
      <h2 className="navtoggle-tooltip">
            navigation
        </h2>
      <div className="login-wrapper">
        <Login className="login-wrapper" />
      </div>

      {navBarOpen && (
        <nav>
          <Navbar activated={navBarOpen} />
        </nav>
      )}
    </body>
  );
};

export default NavButton;
