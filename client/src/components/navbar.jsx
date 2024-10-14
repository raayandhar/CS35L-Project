import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-emerald-200 text-stone-600 p-4 border-2 border-stone-600">
      <ul className="flex justify-around">
        <li>
          <Link to="/" className=" hover:text-gray-400">Home</Link>
        </li>
        <li>
          <Link to="/login" className=" hover:text-gray-400">Login</Link>
        </li>
        <li>
          <Link to="/about" className=" hover:text-gray-400">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
