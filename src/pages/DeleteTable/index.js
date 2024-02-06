import React from 'react'
import Modal from 'react-modal';

import { Button,Text} from "components";

import {  ToastContainer,toast } from "react-toastify";

import { deleteSection } from 'service/api';



function DeleteTable({ isOpen, onRequestClose ,tableId}) {

  const delSection=async()=>{
    const req = { 
      data:{id:tableId }
    };
  
    await deleteSection(req)
      .then((res) => {
        toast.success("Table has been deleted Succesfully!");
            setTimeout(() => {
              window.location.href="/reservation"
            }, 3000);
          
          })
          .catch((err) => {
            console.error(err);
            toast.error("Something Went Wrong!");
          });




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
          <h2>Modal Content</h2>
          <div className="flex flex-col font-poppins items-center justify-start mx-auto w-full ">
           
           <div className="flex flex-col font-poppins items-center justify-start mx-auto w-full ">
             <div className="bg-no-repeat flex flex-col items-center justify-start p-10 md:p-5 w-full">
               <div className="bg-[#292e34] flex flex-col items-start justify-start max-w-[716px] p-[3.5rem] rounded-[24px] w-full ">
                 <div className='text-center w-full flex justify-between items-center'>
                 <div className="flex items-center justify-center w-[534px] sm:w-full relative">
  {/* Delete icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-16 w-16 text-[#ef4444]"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5 2a2 2 0 012-2h6a2 2 0 012 2h3a1 1 0 011 1v2a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1h3zM3 7v10a2 2 0 002 2h10a2 2 0 002-2V7H3zm9 0v8a1 1 0 01-1 1h-2a1 1 0 01-1-1V7H5V5a1 1 0 011-1h8a1 1 0 011 1v2h2z"
      clipRule="evenodd"
    />
  </svg>
</div> 



              
              

                </div>
               
                
                
               
                <div className="flex flex-col items-center justify-center mt-[10px] w-full">
                
                <Text
                    className="md:text-3xl sm:text-[28px] text-[20px] text-white-A700 w-auto"
                    size="txtPoppins"
                  >
                  Do you want to delete this Table ?
                  </Text>
                </div>
              
                
                

                <div className="flex flex-row items-start justify-around w-full mt-10">
                  <Button
                    className="common-pointer cursor-pointer  leading-[normal]  text-center text-s w-[200px]"
                    shape="round"
                    size="md"
                    variant="gradient"
                    color="blue_600_indigo_900"
                    onClick={() => {
                      onRequestClose()
                    }}
                  >
                    No Cancel
                  </Button>
                  <Button style={{color:"white"}}
  className="common-pointer cursor-pointer leading-[normal] text-center text-white text-s w-[200px] bg-gradient-to-r from-[#ef4444] to-[#991b1b]"
  shape="round"
  size="md"
  onClick={delSection}
>
  Yes, I'm sure
</Button>


                </div>
              </div>
            </div>
          </div>


          </div>
        
     
      <ToastContainer />
        </Modal>
  )
}

export default DeleteTable;