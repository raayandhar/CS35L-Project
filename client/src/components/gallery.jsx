// client/src/components/Gallery.jsx

import React, { useEffect, useState } from 'react';
import './Gallery.css';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import NavButton from './navbutton.jsx';
import './home.css'; // Import your CSS file

function Gallery() {
  const [images, setImages] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchUploader, setSearchUploader] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const [navBarOpen, setNavBarOpen] = useState(false);
  const navigate = useNavigate();

  const limit = 14; // Images per page

  const fetchImages = async (title = '', uploader = '', pageNumber = 1) => {
    setIsLoading(true);
    try {
      let apiUrl = `http://127.0.0.1:8000/gallery?page=${pageNumber}&limit=${limit}`;
      if (title) {
        apiUrl += `&title=${encodeURIComponent(title)}`;
      }
      if (uploader) {
        apiUrl += `&uploader=${encodeURIComponent(uploader)}`;
      }

      const response = await fetch(apiUrl);
      if (!response.ok) {
        const errorData = await response.json();
        enqueueSnackbar(`Error: ${errorData.message}`, { variant: 'error' });
        throw new Error(errorData.message);
      }

      const result = await response.json();
      setImages(result.images);
      setPage(result.page);
      setTotalPages(result.total_pages);
    } catch (error) {
      console.error('Error fetching images:', error);
      enqueueSnackbar('Failed to fetch images.', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchImages(searchTitle, searchUploader, 1);
  };

  const handleNextPage = () => {
    if (page < totalPages && !isLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchImages(searchTitle, searchUploader, nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1 && !isLoading) {
      const prevPage = page - 1;
      setPage(prevPage);
      fetchImages(searchTitle, searchUploader, prevPage);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="gallery-container" data-nav={navBarOpen.toString()}>
      {/* Navbar Positioned at the Top */}
      <NavButton classname="nav-section" setNavBarOpen={setNavBarOpen} navBarOpen={navBarOpen} />

      <h2>Community Gallery</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-group">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="search-group">
          <input
            type="text"
            placeholder="Search by uploader..."
            value={searchUploader}
            onChange={(e) => setSearchUploader(e.target.value)}
            className="search-input"
          />
        </div>
        <button type="submit" className="search-button" disabled={isLoading}>
            {isLoading && <div className="spinner" aria-hidden="true"></div>}
            {isLoading ? '' : 'Search'}
        </button>

      </form>
      {/* Gallery Grid */}
      <div className="gallery-grid">
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image.id} className="gallery-item">
              <img
                src={`data:image/png;base64,${image.image}`}
                alt={image.title}
                className="gallery-image"
                loading="lazy"
              />
              <div className="gallery-info">
                <h3>{image.title}</h3>
                <p>{image.description}</p>
                <span>Uploaded by: {image.uploader}</span>
                <span>On: {new Date(image.timestamp).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        ) : (
          !isLoading && <p>No images found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button onClick={handlePreviousPage} disabled={page === 1 || isLoading}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={page === totalPages || isLoading}>
            Next
          </button>
        </div>
      )}

      {/* "Go Back" Button at the Bottom */}
      <button onClick={handleGoBack} className="go-back-button">
        Go Back
      </button>
    </div>
  );
}

export default Gallery;
