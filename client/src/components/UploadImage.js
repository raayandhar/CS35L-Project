// client/src/components/UploadImage.js

import React, { useState } from 'react';
import './UploadImage.css'; // Create this CSS file for styling

function UploadImage() {
  const [formData, setFormData] = useState({
    image: null,
    title: '',
    description: '',
    uploader: ''
  });

  const [uploadStatus, setUploadStatus] = useState(null);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!formData.image) {
      alert('Please select an image to upload.');
      return;
    }

    const data = new FormData();
    data.append('image', formData.image);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('uploader', formData.uploader);

    fetch('http://localhost:5000/upload_image', {
      method: 'POST',
      body: data
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Image uploaded successfully') {
          setUploadStatus('success');
          // Optionally, reset the form
          setFormData({
            image: null,
            title: '',
            description: '',
            uploader: ''
          });
          // Optionally, refresh the gallery by emitting an event or using a global state
          window.location.reload(); // Simple way to refresh
        } else {
          setUploadStatus('error');
          alert(`Error: ${data.message}`);
        }
      })
      .catch(error => {
        setUploadStatus('error');
        console.error('Error uploading image:', error);
      });
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

        <button type="submit" className="upload-button">
          Upload Image
        </button>
      </form>

      {uploadStatus === 'success' && <p className="success-message">Image uploaded successfully!</p>}
      {uploadStatus === 'error' && <p className="error-message">Failed to upload image.</p>}
    </div>
  );
}

export default UploadImage;
