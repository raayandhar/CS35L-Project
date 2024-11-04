import React from 'react';
import { Link } from 'react-router-dom';
import Login from './login.jsx';
const Navbar = () => {
  const links = [
    { path: "/", label: "Home", image: "homeImage.png", fontFamily: "Rubik, sans-serif" },
    { path: "/gallery", label: "Gallery", image: "galleryimage.png", fontFamily: "Rubik, sans-serif" },
    { path: "/profile", label: "Profile", image: "profileImage.png", fontFamily: "Rubik, sans-serif" },
    { path: "/generator", label: "Generator", image: "generateImage.png", fontFamily: "Rubik, sans-serif" },
  ];
  
  return (
    <div id="nav-links">
      {links.map((link) => (
        <Link key={link.path} to={link.path} className="nav-link" style={{fontFamily: link.fontFamily }}>
          <h2 className="nav-link-label rubik-font">{link.label}</h2>
          <img className="nav-link-image" src={link.image}/>
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
