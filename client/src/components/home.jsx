import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './login.jsx';
import './home.css'; // Import your CSS file


const Home = () => {

  const [frame, setFrame] = useState('50%');

  const goGenerate = useNavigate();

  const handleOnShift = (e) => {
    const p = (e.clientX / window.innerWidth) * 100;
    setFrame(`${p}%`);
    document.documentElement.style.setProperty('--frame-position', `${p}%`);
  }

  function goToGenerate() {
    goGenerate('/generator')
  }

    return (
      <div onMouseMove={handleOnShift}>
      <div id="left-side" className="side">
        <h2 className="title">
          Generate any image you can <span className="fancy">imagine</span>
        </h2>
      </div>
      <div id="right-side" className="side">
        <h2 className="title">
          Generate any image you can <span className="fancy">Here</span>
        </h2>
      </div>
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