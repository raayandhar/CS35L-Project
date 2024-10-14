import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
function App() {
  const [backendOut,setBackendOut] = useState('');

  function callBackend() {
    fetch('http://127.0.0.1:5000/').then(res => res.json()).then(res => setBackendOut(res["message"]));
  }

  return (
    <div className="App">
      <div className="bg-blue-500 h-screen w-full align-middle text-center space-y-20"> 
        <div className="text-4xl pt-20">
          Flux diffision image generator
        </div>
        <button onClick={callBackend} className="bg-white h-20 w-40 rounded-xl">
          Click me 
        </button>
        <div>
          <div className="text-4xl">
            Backend Route output:

          </div>
          <div className="text-4xl">
          {backendOut }
          </div>
        </div>
        
      </div>
      
    </div>
  );
}

export default App;
