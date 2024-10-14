import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/history", label: "History" },
  ];

  return (
    <nav className="bg-emerald-200 text-stone-600 p-2 border-2 border-stone-600">
      <ul className="flex justify-between items-center">
        <div className="flex space-x-4">
          {links.map((link) => (
            <li key={link.path}>
              <Link to={link.path}>
                <button className=" bg-transparent  text-stone-600 h-full w-auto py-2 px-4 rounded-xl hover:bg-white hover:border-2 hover:border-stone-600">
                  {link.label}
                </button>
              </Link>
            </li>
          ))}
        </div>
        
        <li>
          <Link to="/login">
            <button className="bg-white text-stone-600 border-2 border-stone-600 h-full w-auto py-2 px-4 rounded-xl hover:bg-stone-600 hover:text-white transition duration-200 mr-4">
              Login
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
