  // NewPage.jsx
import React from 'react';
import { useState } from 'react';
import gif from './loadbar.gif'

const Generator = () => {

    const [prompt, setPrompt] = useState('');
    const [generatedImage, setGeneratedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleForm = async (input) => {
        setLoading(true);
        input.preventDefault();
        const response = await fetch('http://127.0.0.1:5000/prompt_recv', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({prompt}),

        });
       if (!response.ok){
        console.log("HTTP error: ", response.status)
       }
       const image_recv = await response.json();

       setGeneratedImage(`data:image/png;base64,${image_recv.image}`);
       console.log("Set generated image to:", generatedImage);

       setLoading(false);
    }
    
  return (
    <div>
        <h1 style={{ fontWeight: 'bold', textAlign: 'center', position: 'absolute', top: '70px', width: '100%', fontSize: '50px' }}>
          Image Generator
        </h1>

        <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}>

      {!loading && !generatedImage &&(
                  <form onSubmit={handleForm} method="POST">
                      <input
                          name="prompt"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          placeholder="Enter prompt here"
                          style={{ marginBottom: '10px' }} 
                      />
                      <button type="submit">Submit prompt</button>
                  </form>
              )}

          {loading && (
                  <div>
                      <img 
                          src={gif} 
                          alt="Loading indicator" 
                          style={{ width: '200px', height: '200px', marginRight: '50px' }}
                      />
                      <h1>Image is being generated, Estimated time 3 minutes</h1>
                  </div>
              )} 

        {generatedImage && !loading && (
                  <div>
                      <h2>Image has been Generated</h2>
                      <img 
                          src={generatedImage} 
                          alt="Generated" 
                      />
                      <a 
                          href={generatedImage} 
                          download="generated_image.png"
                      >    
                          <button type="button">
                              Click here to download your image
                          </button>
                      </a>
                  </div>
              )}  
          </div>
    </div>
  );

}

export default Generator;