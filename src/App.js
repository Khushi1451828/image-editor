// src/App.js
import React, { useState } from 'react';
import SearchBar from './components/Search';
import ImageResults from './components/SearchOutput';
import CanvasEditor from './components/CanvasEdit';
import axios from 'axios';
import './App.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = async (query) => {
    const apiKey = 'RXwQhjISHDVit9zefigGDpWGbPbb4kbYI2WHcotw21nfPlo6NmiTv8Dl';
    const url = `https://api.pexels.com/v1/search?query=${query}&per_page=9`;

    try {
      const response = await axios.get(url, {
        headers: { Authorization: apiKey },
      });
      setImages(response.data.photos);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div className="App">

      <h1>Image Editor</h1>
      <h4>Name - Khushi Sharma</h4>
      <h4>Mail - ks1451828@gmail.com</h4>
      <SearchBar onSearch={handleSearch} />
      <ImageResults images={images} onAddCaption={setSelectedImage} />
      {selectedImage && <CanvasEditor selectedImage={selectedImage} />}
    </div>
  );
};

export default App;
