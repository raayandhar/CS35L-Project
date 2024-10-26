// NewPage.jsx
import React from 'react';
import { useState } from 'react';

const Generator = () => {

    const [prompt, setPrompt] = useState('');

    const handleForm = (input) => {
        input.preventDefault();
        fetch('http://127.0.0.1:5000/prompt_recv', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({prompt}),
        })
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
    </div>
  );
}

export default Generator;