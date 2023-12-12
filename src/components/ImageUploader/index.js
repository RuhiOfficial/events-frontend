import React, { useState } from 'react';
import { FiCamera } from 'react-icons/fi';

const ImageUploader = ({ onChange }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
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
          .camera-button {
            width: 100px;
            height: 100px;
            cursor: pointer;
          }

          .camera-button img {
            width: 150px;
            height: 150px;
            object-fit: cover;
          }

          .hidden-input {
            display: none;
          }

          .icon {
            padding: 2px;
          }
        `}
      </style>

      <label htmlFor="fileInput" className="camera-button">
        {image ? (
          <img src={image} alt="Uploaded" />
        ) : (
          <div className="camera-icon">
            <FiCamera size={120} color="#ffffff" className="icon" />
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
