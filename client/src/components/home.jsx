import React from 'react'
import { useState } from 'react';
import { useSnackbar } from 'notistack'
const Home = () => {
  const [backendOut,setBackendOut] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  function callBackend() {
    fetch('http://127.0.0.1:5000/').then(res => res.json()).then(res => setBackendOut(res["message"]));
    enqueueSnackbar('Backend call made', { variant: 'success', autoHideDuration: 3000 });
  }
    return (
        <div className="text-stone-600">
            <div className="bg-white h-screen w-full align-middle text-center space-y-20"> 
              <div className="text-7xl pt-20">
                Flux diffision image generator
              </div>
              <button onClick={callBackend} className="bg-emerald-200 h-20 w-40 rounded-xl border-2 border-stone-600">
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
export default Home