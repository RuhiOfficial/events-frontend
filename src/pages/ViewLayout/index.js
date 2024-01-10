import React, { useRef, useEffect ,useState} from 'react';
import { Button, Img, Input, SelectBox, Text } from "components";

import Modal from 'react-modal';
const ViewLayout = ({  isOpen, onRequestClose }) => {
  const [selectedSection, setSelectedSection] = useState(null);
   const  imageUrl = 'https://api.asm.skype.com/v1/objects/0-sa-d3-20b39e930b5b98a84a843785f2c5624f/views/imgpsh_fullsize_anim'; // Replace with your image path
   
   const handleSectionChange = (selectedOption) => {

    setSelectedSection(selectedOption);
    onRequestClose()
  };
  const sectionList = [
    { label: "Left Section", value: "Left Section" },
    { label: "Right Section", value: "Right Section" },
    
  ];
  if(selectedSection){
    localStorage.setItem("Section", selectedSection);
  }
  else{
    localStorage.setItem("Section", "Preffered Section");
  }
 
   // const   boxes = [
//     [100, 100, 50, 50 , 'Box1'],
//     [200, 150, 70, 40 ,'Box2'],
//     // Add more boxes as needed
//   ];
//   const handleBoxClick = (boxDetails) => {
//     console.log('Clicked box:', boxDetails);
//     // You can do further processing with the clicked box details
//   };

//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) {
//       // Canvas not yet available
//       return;
//     }
  
//     const context = canvas.getContext('2d');
//     if (!context) {
//       // Canvas context not available
//       return;
//     }
  
//     const image = new Image();
  
//     image.onload = () => {
//       console.log('Image loaded successfully');
//   // Draw the image on the canvas
//   context.drawImage(image, 0, 0, canvas.width, canvas.height);
    
  
//       // Draw boxes on specified coordinates with names
//       context.strokeStyle = 'red';
//       context.lineWidth = 2;
//       context.font = '14px Arial';
  
//       boxes.forEach((box, index) => {
//         const [x, y, width, height, name] = box;
  
//         // Draw the box
//         context.strokeRect(x, y, width, height);
  
//         // Draw the name inside the box
//         context.fillStyle = 'red';
//         context.fillText(name, x + 5, y + 15);
//       });
//     };
  
//     image.src = imageUrl;
//   }, [imageUrl, boxes, canvasRef.current]);
  

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
     
     <div>
     <SelectBox
                      className="bg-white-A700 outline outline-[1px] outline-gray-400 pl-3.5 pr-0.5 py-0.5 rounded-[10px] text-base text-gray-600 text-left w-full"
                      placeholderClassName="text-gray-600"
                      indicator={
                        <img
                          className="h-11 mr-[0] w-7"
                          src="images/img_div.svg"
                          alt="div"
                        />
                      }
                      isMulti={false}
                      name="div"
                      options={sectionList}
                      isSearchable={true}
                      placeholder="Select Section"
                      onChange={handleSectionChange}

                    />
      <img src={imageUrl} alt="" 
      />   

        </div>
     {/* <canvas
      ref={canvasRef}
      width={800} // Set the canvas width (adjust as needed)
      height={600} // Set the canvas height (adjust as needed)
      style={{ border: '1px solid #ccc' }}
    ></canvas> */}
    </Modal>
  );
};

export default ViewLayout;