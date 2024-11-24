  // NewPage.jsx
import React from 'react';
import { useState } from 'react';
import gif from './loadbar.gif'
import NavButton from './navbutton.jsx';
import './generator.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'; 
import { faImages } from '@fortawesome/free-solid-svg-icons';

const Generator = () => {

    const [prompt, setPrompt] = useState('');
    const [generatedImage, setGeneratedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [navBarOpen, setNavBarOpen] = useState(false);

    const handleForm = async (input) => {
        setLoading(true);
        input.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/prompt_recv', {
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
    <div className="generator-div"data-nav={navBarOpen.toString()}>
        <main className="main-generator">
        <h1 className="title1">
          Create
        </h1>
        <h2 className="title2">
          Without
        </h2>
        <h2 className="title3">
          Limits
        </h2>
        <h2 className="title4">
          Be Free
        </h2>
        <div className="imagebar"/>
        <div class="centered-bar"></div>
            {!loading && !generatedImage &&(
                        <form onSubmit={handleForm} method="POST">
                            <input
                                className="input-text"
                                name="prompt"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="What do you want to generate?"
                            />
                            <button className="submit-button" type="submit">
                                <FontAwesomeIcon className="submit-icon" icon={faPaperPlane} />
                            </button>
                        </form>
                    )}

                {loading && (
                        <div className="loading-container">
                        <div className="loading-overlay"></div>
                        <div className="loading-indicator"></div>
                        <h1 className="loading-text">Your Image is being generated, please wait</h1>
                    </div>
                    )} 

                {generatedImage && !loading && (
                        <div className="modal-overlay">
                          <h2 className="modal-title">
                              Image has been generated
                          </h2>
                            <img 
                                src={generatedImage}
                                alt="Generated"
                                className="max-w-full max-h-full" 
                            />
                            <a href={generatedImage} download="generated-image.jpg">
                                <button className="download-button">
                                    <FontAwesomeIcon className="download-icon" icon={faArrowDown} />
                                </button>
                            </a>
                            <button className='gallery-button'>
                                <FontAwesomeIcon className="gallery-icon" icon={faImages} />
                            </button>
                            <button className="discard-button" onClick={() => setGeneratedImage(null)}>
                              <FontAwesomeIcon className="discard-icon" icon={faTrash} />
                          </button>
                        </div>
                    )}  
          </main>
          {!generatedImage && (
            <NavButton classname="nav-section" setNavBarOpen={setNavBarOpen} navBarOpen={navBarOpen}/>
          )
          }
    </div>
  );

}

export default Generator;