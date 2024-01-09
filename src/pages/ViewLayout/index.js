import React, { useRef, useEffect } from 'react';

const ViewLayout = ({ imageUrl, boxes,onBoxClick }) => {
     imageUrl = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'; // Replace with your image path
  boxes = [
    [100, 100, 50, 50 , 'Box1'],
    [200, 150, 70, 40 ,'Box2'],
    // Add more boxes as needed
  ];
  const handleBoxClick = (boxDetails) => {
    console.log('Clicked box:', boxDetails);
    // You can do further processing with the clicked box details
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const image = new Image();

    image.onload = () => {
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
        
        // Draw the name inside the box
        context.fillStyle = 'red';
        context.fillText(name, x + 5, y + 15);

        // You can customize the text position and style as needed
      });
    };

    image.src = imageUrl;
  }, [imageUrl, boxes]);

  return (
    <canvas
      ref={canvasRef}
      width={800} // Set the canvas width (adjust as needed)
      height={600} // Set the canvas height (adjust as needed)
      style={{ border: '1px solid #ccc' }}
    ></canvas>
  );
};

export default ViewLayout;