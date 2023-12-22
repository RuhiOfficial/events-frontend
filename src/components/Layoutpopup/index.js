// LayoutPopup.js
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card' 
import Modal from 'react-modal';
import { Button, Img, Line, List, Text,Input } from "components";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

 

function LayoutPopup({ onClose, onBackgroundImageChange,isOpen, onRequestClose }) {
  const [layoutName, setLayoutName] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(null);

  localStorage.setItem('layoutName',layoutName)
  if(backgroundImage){
    console.log(backgroundImage.name)
  }
  

  const handleBackgroundImageChange = (e) => {
    const file = e.target.files[0];
    setBackgroundImage(file);
  };

  const handleSave = () => {
    if (layoutName && backgroundImage) {
        
      // Send the layout name and background image to the parent component
      onBackgroundImageChange(layoutName, backgroundImage);
      onRequestClose();
    }
  };

  return (

 
     <Modal
     isOpen={isOpen}
     onRequestClose={onRequestClose}
     contentLabel="Example Modal"
     style={{
       overlay: {
         backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
         overflow: 'auto',
       },
      
     }}
   >
     
    <div className="flex flex-col font-poppins items-center justify-start mx-auto w-full ">
           
          <div className="flex flex-col font-poppins items-center justify-start mx-auto w-full ">
            <div className="bg-no-repeat flex flex-col items-center justify-start p-10 md:p-5 w-full">
              <div className="bg-[#292e34] flex flex-col items-start justify-start max-w-[716px] p-[3.5rem] rounded-[24px] w-full ">
                <div className='text-center w-full flex justify-between items-center'>
                <div className="flex flex-col items-center justify-center w-[534px] sm:w-full">
                  <Text
                    className="md:text-3xl sm:text-[28px] text-[32px] text-white-A700 w-auto"
                    size="txtPoppins"
                  >
                   Upload Layout
                  </Text>
                </div>
                {/* <span className="modal-close" style={{color:"white",fontSize:"xx-large"}}  onClick={onEventClose}>
            &times;
          </span> */}

                </div>
               
                <div className='flex flex-column items-center '>
               

                <div className="flex flex-col items-start justify-start mt-[38px]">
                <label htmlFor="backgroundImage" className="custom-file-input">
                  <div className="file-container">
                {backgroundImage ? (
            <img
              src={URL.createObjectURL(backgroundImage)}
              alt="Selected"
              style={{ width: '100px', height: '100px', marginRight: '10px' }}
            />
          ) : (
            <FontAwesomeIcon icon={faCamera} className="text-white" style={{ fontSize: '100px' }} />
          )}
          {/* {backgroundImage && (
            <span style={{ color: 'white' }}>{backgroundImage.name}</span>
          )} */}
        </div>
        <input
          type="file"
          id="backgroundImage"
          accept="image/*"
          className="opacity-0 absolute"
          onChange={handleBackgroundImageChange}
        />
      </label>
      {/* Add more input fields as needed */}
    </div>
    <div className="flex flex-col items-start justify-start mt-[38px] w-[380px]">
                
             
                <input   
                placeholder=" Event Name"
        type="text"
        id="layoutName"
        value={layoutName}
        className=" inputs text-white capitalize font-roboto p-0 placeholder-white-900 text-base text-left w-[370px] ml-10 h-[50px] pl-4 common-pointer border-t border-white-700_99 border-solid w-full bg-[#292e34]"
        onChange={(e) => setLayoutName(e.target.value)}
        style={{color:"white"}}
    />
</div>
               
</div>
 

                <div className="flex flex-col items-start justify-start w-full mt-20">
                <Button
                    className="common-pointer cursor-pointer font-bold leading-[normal] min-w-[459px] sm:min-w-full text-center text-xl w-full"
                    shape="round"
                    size="md"
                    variant="gradient"
                    color="blue_600_indigo_900"
                    onClick={handleSave}
                  >
                    Upload
                  </Button>
                </div>
              </div>
            </div>
          </div>


          </div>
    
   </Modal>
  
  );
}

export default LayoutPopup;
  