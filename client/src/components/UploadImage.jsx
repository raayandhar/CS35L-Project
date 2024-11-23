// client/src/components/UploadImage.jsx

import React, { useState } from 'react';
import './UploadImage.css';
import { useSnackbar } from 'notistack';

function UploadImage() {
  const [formData, setFormData] = useState({
    image: null,
    title: '',
    description: '',
    uploader: '',
  });
  const [isUploading, setIsUploading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      enqueueSnackbar('Please select an image to upload.', { variant: 'warning' });
      return;
    }

    setIsUploading(true);

    const data = new FormData();
    data.append('image', formData.image);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('uploader', formData.uploader);

    try {
      // const backendUrl = process.env.REACT_APP_BACKEND_URL;
      //I don't know why the .env is not found, so I commented the line above and added this line
      const backendUrl = "http://127.0.0.1:8000";
      console.log('Backend URL:', backendUrl); // Debugging

      if (!backendUrl) {
        enqueueSnackbar('Backend URL is not defined.', { variant: 'error' });
        throw new Error('Backend URL is not defined.');
      }

      const response = await fetch(`${backendUrl}/upload_image`, {
        method: 'POST',
        body: data,
      });

      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        const errorData = await response.json();
        enqueueSnackbar(`Error: ${errorData.message}`, { variant: 'error' });
        throw new Error(errorData.message);
      }

      const result = await response.json();
      enqueueSnackbar('Image uploaded successfully!', { variant: 'success' });
      setFormData({
        image: null,
        title: '',
        description: '',
        uploader: '',
      });
      // Optionally, redirect or refresh the gallery
    } catch (error) {
      console.error('Error uploading image:', error);
      enqueueSnackbar('An unexpected error occurred.', { variant: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload to Gallery</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="image">Select Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter image title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter image description"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="uploader">Your Name:</label>
          <input
            type="text"
            name="uploader"
            value={formData.uploader}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <button type="submit" className="upload-button" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>
    </div>
  );
}

export default UploadImage;
