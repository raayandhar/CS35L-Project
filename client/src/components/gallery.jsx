// client/src/components/Gallery.jsx

import React, { useEffect, useState } from 'react';
import './Gallery.css';
import { useSnackbar } from 'notistack';
import NavButton from './navbutton.jsx';

function Gallery() {
  const [images, setImages] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [navBarOpen, setNavBarOpen] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/gallery`);
        const result = await response.json();

        if (response.ok) {
          setImages(result.images);
        } else {
          enqueueSnackbar(`Error: ${result.message}`, { variant: 'error' });
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        enqueueSnackbar('Failed to fetch images.', { variant: 'error' });
      }
    };

    fetchImages();
  }, [enqueueSnackbar]);

  return (
    <div className="gallery-container" data-nav={navBarOpen.toString()}>
      <h2>Community Gallery</h2>
      <div className="gallery-grid">
        {images.map((image) => (
          <div key={image.id} className="gallery-item">
            <img
              src={`data:image/png;base64,${image.image}`}
              alt={image.title}
              className="gallery-image"
            />
            <div className="gallery-info">
              <h3>{image.title}</h3>
              <p>{image.description}</p>
              <span>Uploaded by: {image.uploader}</span>
              <span>On: {new Date(image.timestamp).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
      <NavButton classname="nav-section" setNavBarOpen={setNavBarOpen} navBarOpen={navBarOpen}/>
    </div>
  );
}

export default Gallery;
