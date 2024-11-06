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
          <h2 className="name">
            The Syndicate
          </h2>
          <h2 className="title">
              Flux Diffusion Image Gen.
          </h2>
           <h2 className="side1">
            Bring your visions to life with limitless <span className="fancy">creativity</span>
          </h2>
          <h2 className="side2">
            Turn ideas into images; let your imagination take <span className="fancy">flight</span>
          </h2>
          <h2 className="side3">
            From concept to creation, unleash boundless <span className="fancy">potential</span>
          </h2>
          <h2 className="side4">
            Create beyond boundaries; the canvas is <span className="fancy">endless</span>
          </h2>
          <h2 className="side5">
            Where imagination meets <span className="fancy">innovation</span>
          </h2>
          <h2 className="side6">
            Let your dreams shape reality—one image at a <span className="fancy">time</span>
          </h2>
          <h2 className="side7">
            Your creative potential, amplified to <span className="fancy">infinity</span>
          </h2>
          <h2 className="side8">
            Make them <span className="fancy">believe</span>
          </h2>
        </main>
        <button id='nav-toggle' type='button' onClick={toggleNavBar}>
            <FontAwesomeIcon className="open" icon={faBars}/>
            <FontAwesomeIcon className="close" icon={faXmark}/>
          </button>
          <body className="login-wrapper">
                <Login className="login-wrapper"/>
            </body>
        {navBarOpen && (
            <nav>
            <Navbar activated={navBarOpen}/>
            </nav>
        )}
      </div>
    );
}
export default Home