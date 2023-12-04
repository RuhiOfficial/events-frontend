// ImageUploader.js
import React, { useState } from 'react';
import { FiCamera } from 'react-icons/fi';

const ImageUploader = ({ onChange }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
  
    console.log('Selected File:', file);
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = () => {
        console.log('Reader Result:', reader.result);
        const imageUrl = reader.result;
        setImage(imageUrl);
        onChange(imageUrl);
      };
  
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <style>
        {`
          /* Your custom styles for the camera button */
          .camera-button {
            
            width: 100px;
            height: 100px;
            
        
    
            cursor: pointer;
          }

          .camera-button img {
            width:150px;
            height:150px;
            object-fit: cover;
          }

          

          /* Hide input type file */
          .hidden-input {
            display: none;
          }
        `}
      </style>

      <label htmlFor="fileInput" className="camera-button">
        {image ? (
          <img src={image} alt="Uploaded" />
        ) : (
          <div className="camera-icon">
            {/* Use the FiCamera icon from react-icons */}
            <FiCamera size={150} color="#ffffff" />
          </div>
        )}
        <input
          id="fileInput"
          type="file"
          className="hidden-input"
          accept="image/*"
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
};

export default ImageUploader;