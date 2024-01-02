import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import * as yup from 'yup';

import { updateSection, sectionById } from 'service/api';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Img, Line, List, Text } from "components";

function SingleEvent({ isOpen, onRequestClose, sectionId }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    loadSection();
  }, [sectionId]);

  async function editSection() {
    // Check if both name and price are defined
    if (name === undefined || price === undefined) {
     
      return;
    }

    const req = {
      data: {
        id: sectionId,
        name: name,
        price: price,
      },
    };

    try {
      const res = await updateSection(req);
      console.log(res);

      toast.success('Section is updated Successfully!');
      setTimeout(() => {
        onRequestClose();
        // window.location.href = '/reservation';
      }, 3000);
    } catch (err) {
      console.error(err);
      toast.error('Something Went Wrong!');
    }
  }

  async function loadSection() {
    try {
      const res = await sectionById({ data: { id: sectionId } });
      console.log('Fetched Data:', res.data);

      // Check if the response data is not empty
      if (res.data) {
        // Update the state
       
        setName(res.data.name);
        setPrice(res.data.price);
      }
    } catch (err) {
      console.error(err);
    }
  }

  

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
            

              <div className="flex flex-row items-start justify-start   w-[570px]">
              <Img
                                  className="sm:flex-1 h-[250px] md:h-auto object-cover w-[50%] sm:w-full"
                                  src="images/img_rectangle63.png"
                                  alt="rectangleSixtyThree"
                                />
             <div className="flex flex-col items-end justify-start ml-[30px]  w-full">
             <Text
                    className="md:text-3xl sm:text-[28px] text-[32px] text-white-A700 w-auto"
                    size="txtPoppins"
                  >
                    PARTY 
                  </Text>
                  <Text
                    className="md:text-xl sm:text-[10px] text-[18px] text-white-A700 w-auto"
                    size="txtPoppins"
                  >
                    Party With live Music 
                  </Text>
                  <hr className="my-2 border-t border-white-A700 w-[250px]" />
                  <Text
                    className="md:text-xl sm:text-[10px] text-[22px] text-white-A700 w-auto"
                    size="txtPoppins"
                  >
                    SATURDAY
                  </Text>
                  <Text
                    className="md:text-xl sm:text-[10px] text-[18px] text-white-A700 w-auto"
                    size="txtPoppins"
                  >
                    2nd JAN 2024 - 4th JAN 2024
                  </Text>
                  <hr className="my-2 border-t border-white-A700 w-[250px]" />
                  <Text
                    className="md:text-xl sm:text-[10px] text-[18px] text-white-A700 w-auto"
                    size="txtPoppins"
                  >
                    Organized By:
                    
                  </Text>
                  <Text
                    className="md:text-xl sm:text-[10px] text-[18px] text-white-A700 w-auto"
                    size="txtPoppins"
                  >
                  Ruhani
                    
                  </Text>
                  <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
             Checkout On Facebook
                </a>
             </div>
           


              {/* <input
                  name="Section Name"
                  placeholder=" Section Name"
                  className="capitalize font-roboto p-0 placeholder-white-900 text-base text-left w-full h-[50px] pl-4 common-pointer border border-white-700_99 border-solid w-full bg-[#292e34] "
                  
                  style={{ color: 'white' }}
                  onChange={(e) => {
                    
                    setName(e.target.value);
                  }}
                  value={name}
                  size="md"
                  variant="fill"
                /> */}
              </div>

             

            
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </Modal>
  );
}

export default SingleEvent;
