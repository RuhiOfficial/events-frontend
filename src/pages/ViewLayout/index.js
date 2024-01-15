import React, { useRef, useEffect, useState } from 'react';
import Modal from 'react-modal';

const ViewLayout = ({ isOpen, onRequestClose }) => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [hoveredBoxIndex, setHoveredBoxIndex] = useState(null);
  const imageUrl =
    'https://api.asm.skype.com/v1/objects/0-sa-d3-20b39e930b5b98a84a843785f2c5624f/views/imgpsh_fullsize_anim';

  const boxes = [
    [100, 100, 50, 50, 'Box1'],
    [200, 150, 70, 40, 'Box2'],
    // Add more boxes as needed
  ];

  const canvasRef = useRef(null);

  const handleMouseOver = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Check if the mouse is over any box
    for (let i = 0; i < boxes.length; i++) {
      const [x, y, width, height] = boxes[i];
      if (mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height) {
        // Mouse is over the current box, update the hovered box index
        setHoveredBoxIndex(i);
      }
    }
  };

  const handleMouseOut = () => {
    // Reset the hovered box index when the mouse leaves the canvas
    setHoveredBoxIndex(null);
  };

  useEffect(() => {
    const loadImage = async () => {
      const image = new Image();
      image.src = imageUrl;

      await new Promise((resolve) => {
        image.onload = resolve;
      });

      const canvas = canvasRef.current;
      if (!canvas) {
        // Canvas not yet available
        return;
      }

      const context = canvas.getContext('2d');
      if (!context) {
        // Canvas context not available
        return;
      }

      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the image on the canvas
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Draw boxes on specified coordinates with names
      context.strokeStyle = 'red';
      context.lineWidth = 2;
      context.font = '14px Arial';

      boxes.forEach((box, index) => {
        const [x, y, width, height, name] = box;

        // Draw the box
        context.strokeRect(x, y, width, height);

        // Highlight the box if it is currently being hovered
        if (index === hoveredBoxIndex) {
          context.fillStyle = 'rgba(255, 0, 0, 0.2)';
          context.fillRect(x, y, width, height);
        }

        // Draw the name inside the box
        context.fillStyle = 'red';
        context.fillText(name, x + 5, y + 15);
      });
    };

    loadImage();
  }, [imageUrl, boxes, canvasRef.current, hoveredBoxIndex]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: 'none',
          border: 'none',
          padding: 0,
          maxHeight: '80vh',
        },
      }}
    >
      <canvas
        ref={canvasRef}
        width={800} // Set the canvas width (adjust as needed)
        height={600} // Set the canvas height (adjust as needed)
        style={{ border: '1px solid #ccc' }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      ></canvas>
    </Modal>
  );
};

export default ViewLayout;
