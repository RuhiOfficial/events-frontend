import React, { useState, useEffect } from 'react';
import { FiCamera } from 'react-icons/fi';

const ImageUploader = React.forwardRef(({ onChange, imageUrl }, ref) => {
  const [image, setImage] = useState(imageUrl);

  useEffect(() => {
    // Update the image state when the imageUrl prop changes
    setImage(imageUrl);
  }, [imageUrl]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const newImageUrl = reader.result;
        setImage(newImageUrl);
        onChange(newImageUrl);
      };

      reader.readAsDataURL(file);
    }
  };

  const resetImage = () => {
    setImage(null);
    onChange(null);
  };

  // Expose the resetImage function through the ref
  useEffect(() => {
    if (ref) {
      ref.current = {
        resetImage,
      };
    }
  }, [ref, resetImage]);

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
});

export default ImageUploader;
