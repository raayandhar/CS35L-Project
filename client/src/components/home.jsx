import React, { useState } from 'react';
import NavButton from './navbutton.jsx';
import './home.css'; // Import your CSS file



const Home = () => {

  const [navBarOpen, setNavBarOpen] = useState(false);
  
    return (
      <div className='main-div' data-nav={navBarOpen.toString()}>
        <main className='main-home'>
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
        <NavButton classname="nav-section" setNavBarOpen={setNavBarOpen} navBarOpen={navBarOpen} />
      </div>
    );
}
export default Home