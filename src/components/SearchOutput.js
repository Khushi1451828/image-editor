// src/components/ImageResults.js
import React from 'react';

const ImageResults = ({ images, onAddCaption }) => {
  return (
    <div className="image-grid">
      {images.map((image) => (
        <div key={image.id} className="image-item">
          <img src={image.src.medium} alt={image.alt} />
          <button onClick={() => onAddCaption(image.src.large)}>Add Captions</button>
        </div>
      ))}
    </div>
  );
};

export default ImageResults;
