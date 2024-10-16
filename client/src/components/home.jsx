import React from 'react'
import { useState } from 'react';
import gif from './dolphin.gif';
import sky from './sky.jpg';
import Login from './login.jsx';
const Home = () => {
  const [backendOut,setBackendOut] = useState('');
  function callBackend() {
    fetch('http://127.0.0.1:5000/').then(res => res.json()).then(res => setBackendOut(res["message"]));
    console.log(backendOut);
  }
    return (
        <div className="text-stone-600"
        style={{
          backgroundImage: `url(${sky})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        >
            <Login/>
            <div 
            className=" h-screen w-full align-middle text-center space-y-20"
              style={{
                backgroundImage: `url(${gif})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            > 
              <div className="text-7xl pt-20 text-white font-bold font-serif">
                Flux diffision image generator
              </div>
              <button onClick={callBackend} 
  className="bg-white h-20 w-1/3 rounded-xl border-2 border-stone-600 text-6xl font-bold font-serif text-black transition-transform duration-300 ease-in-out transform hover:scale-110">
  Generate
              </button>
            </div>

      </div>
    );
}
export default Home