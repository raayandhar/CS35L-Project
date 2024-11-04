import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import Navbar from './navbar.jsx';
import Login from './login.jsx';
import './home.css'; // Import your CSS file


const Home = () => {

  const [navBarOpen, setNavBarOpen] = useState(false);
  const goGenerate = useNavigate();


  function goToGenerate() {
    goGenerate('/generator');
  }

  const toggleNavBar = () => {
    setNavBarOpen(!navBarOpen);
  }

    return (
      <div data-nav={navBarOpen.toString()}>
        <main>         
          <button id='nav-toggle' type='button' onClick={toggleNavBar}>
            <FontAwesomeIcon className="open" icon={faBars}/>
            <FontAwesomeIcon className="close" icon={faXmark}/>
          </button>
        </main>
        {navBarOpen && (
            <nav>
            <Navbar />
          </nav>
        )}
      </div>

 

      /*
        <div className="text-stone-600"
        >
            <Login/>
            <div 
            className=" h-screen w-full align-middle text-center space-y-20"
            > 
              <div className="text-7xl pt-20 text-white font-bold font-serif">
                Flux diffision image generator
              </div>
              <button onClick={goToGenerate} 
  className="bg-white h-20 w-1/3 rounded-xl border-2 border-stone-600 text-6xl font-bold font-serif text-black transition-transform duration-300 ease-in-out transform hover:scale-110">
  Generate 
              </button>
            </div>

      </div>
      */
    );
}
export default Home