import React, { useRef, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getLayout } from 'service/api';
import { ToastContainer, toast } from 'react-toastify';

const ViewLayout = ({ isOpen, onRequestClose }) => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [hoveredBoxIndex, setHoveredBoxIndex] = useState(null);
  const [response, setResponse] = useState([]);
  const [ imgWidth,setImgWidth]=useState();
  const [ imgHeight,setImgHeight]=useState();
   const[url,setUrl]=useState()

 

 const fetch=async()=>{
  const vid = localStorage.getItem('Venue')
 const req={
  data:{
    venue_id:vid
  }}
  try {
    const res = await getLayout(req);
        console.log(res,"Response coming from the get Layout api ======>>");
        setResponse(res.data[0])
        setUrl(res.data[0].image_url)
    // toast.success('Ticket has been Booked  Successfully!');
    // setTimeout(() => {
    //   onRequestClose();
    //    window.location.href = '/';
    // }, 3000);
  } catch (err) {
    console.error(err);
    // toast.error('Something Went Wrong!');
  }


 }




 




  
    

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
      console.log(url,"4535126482348723428340294-=2104=21=4-")
      const image = new Image();
      image.src = url;

      console.log(image.src,"overEveryw13908u145124614398130-`93-=")

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

      // // Draw boxes on specified coordinates with names
      // context.strokeStyle = 'red';
      // context.lineWidth = 2;
      // context.font = '14px Arial';

      // boxes.forEach((box, index) => {
      //   const [x, y, width, height, name] = box;

      //   // Draw the box
      //   context.strokeRect(x, y, width, height);

      //   // Highlight the box if it is currently being hovered
      //   if (index === hoveredBoxIndex) {
      //     context.fillStyle = 'rgba(255, 0, 0, 0.2)';
      //     context.fillRect(x, y, width, height);
      //   }

      //   // Draw the name inside the box
      //   context.fillStyle = 'red';
      //   context.fillText(name, x + 5, y + 15);
      // });
      setImgHeight(image.height)
      setImgWidth(image.width)
    };

    loadImage();
  }
  , [url, canvasRef.current,isOpen]);

useEffect(()=>{
  fetch();
 },[url])

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
          maxHeight: '100vh',
        },
      }}
    >
      <canvas
        ref={canvasRef}
        width={imgWidth?imgWidth:1000} // Set the canvas width (adjust as needed)
        height={imgHeight?imgHeight:800} // Set the canvas height (adjust as needed)
        style={{ border: '1px solid #ccc' }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      ></canvas>
    </Modal>
  );
};

export default ViewLayout;
