  // NewPage.jsx
import React from 'react';
import { useState } from 'react';

const Generator = () => {

    const [prompt, setPrompt] = useState('');
    const [generatedImage, setGeneratedImage] = useState(null);

    const handleForm = async (input) => {

        input.preventDefault();
        const response = await fetch('http://127.0.0.1:5000/prompt_recv', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({prompt}),

        });
        const image_recv = await response.json();
       setGeneratedImage(`data:image/png;base64,${image_recv.image}`);
    }

  return (
    <div>
        <h1>Image Generator</h1>
        <form onSubmit={handleForm} method="POST">
            <input
            name="prompt"
            value = {prompt}
            onChange={(input) => setPrompt(input.target.value)} 
            placeholder='Enter prompt here'
            />
        <button type="submit">Submit prompt</button>
      </form>
      {!generatedImage && !handleForm &&(
            <div>
                <h1>Image is being generated please wait</h1>
            </div>
        )}
      {generatedImage && (
        <div>
          <h1>Image has been Generated</h1>
          <img src={generatedImage} alt="Generated" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );

}

export default Generator;