import React, { useState, useEffect } from 'react';

const ImageComponent = ({ imageUrl }) => {
  return (
    <div>
      {imageUrl && (
        <img
          className="sm:flex-1 h-[151px] md:h-auto object-cover w-[21%] sm:w-full"
          src={imageUrl}
          alt="Photo"
        />
      )}
    </div>
  );
};

export default ImageComponent;
