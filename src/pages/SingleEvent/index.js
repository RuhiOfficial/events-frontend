import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Modal from 'react-modal';
import * as yup from 'yup';
import { getSingleEvent } from 'service/api';

import { updateSection, sectionById } from 'service/api';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Img, Line, List, Text ,Input} from "components";
import "react-datepicker/dist/react-datepicker.css";




function SingleEvent({ isOpen, onRequestClose, eventId }) {
const [data,setData]=useState([])

  useEffect(() => {
    loadSection();
  }, [eventId]);

  console.log(eventId,"event id =============>>>>")

  async function editSection() {
    // Check if both name and price are defined
   

    const req = {
      // data: {
      //   id: eventId,
      //   name: name,
      //   price: price,
      // },
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
      const res = await getSingleEvent({ data: { id: eventId } });
      console.log('Fetched Data from the single event page is :', res.data);

      // Check if the response data is not empty
      if (res.data) {
        // Update the state
       
        setData(res.data);
        // setPrice(res.data.price);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // data imported ......................



  const { id } = useParams();
  // const [selectedDate, setSelectedDate] = useState(null);
  const [startTime] = useState(null);
  const [dob] = useState(null);
  const [date] = useState(null);
  const [bookingNote] = useState("");
  const [guestsNumber] = useState(0);

  // getDayClassName = (date) => {
  //     // Add custom styling for specific days if needed
  //     return date.getDay() === 0 || date.getDay() === 6 ? "weekend-day" : "";
  // };

  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleClick = () => {
      // Toggle the state to open/close the popup
      setPopupOpen(!isPopupOpen);
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
          overflowY: 'auto',
          maxHeight: '80vh',
         
        },
      }}
    >
      
   


 <div className="flex flex-col font-poppins items-center justify-start mx-auto w-full ">
           
           <div className="flex flex-col font-poppins items-center justify-start mx-auto w-full ">
             <div className="bg-no-repeat flex flex-col items-center justify-start p-10 md:p-5 w-full">
               <div className="bg-[#292e34] flex flex-col items-start justify-start p-[3.5rem] rounded-[24px] w-full ">
                 <div className='text-center w-full flex justify-between items-center'>
                 <div className="flex flex-col items-center justify-center w-[800px] sm:w-full">
                   <Text
                    className="md:text-3xl sm:text-[28px] text-[32px] text-white-A700 w-auto"
                    size="txtPoppins"
                  >
                   Party Event 
                  </Text>
                  
                </div>
              

                </div>
               
                
                <div className="flex flex-row items-start justify-start mt-[18px] w-full">
                
                <div className='w-5/12'>
                 <img className="h-51  event-image" src="https://dzbwcqs3bd4zb.cloudfront.net/bab479e3-b12c-4736-824f-1499da4fca0b.png" alt="Event Image" />
                           
                  </div>
                   <div>
                          
                        </div>
                        <div className='w-8/12'>
                        <div  className='flex flex-row items-start justify-between mt-[18px] w-full'>
                        <Input
                        name="Date"
                        value="date is"
                        className=" capitalize font-roboto p-0  placeholder-white-900 text-base text-left h-[50px]  pl-4 "
                        wrapClassName=" common-pointer border border-white-700_99 border-solid w-[49%] bg-[#292e34]"
                        style={{color:"white"}}
                        // onChange={(e) => {
                        //   form.handleChange("name", e);
                        // }}
                        // errors={form?.errors?.name}
                        // value={form?.values?.name}
                      
                        size="md"
                        variant="fill"
                />

                                    
                          <Button
                              className=" h-[52px] w-[49%] cursor-pointer font-inter font-semibold leading-[normal] min-w-[128px] text-center text-sm border text-white700 "
                              // color="indigo_A400"
                              style={{color:"white"}}
                              size="sm"
                              onClick={handleClick}>
                          
                              Table Selection
                            </Button>
                                </div>
                                <div  className='flex flex-row items-start justify-between mt-[18px] w-full'>
                                
                        {/* <Input
                        name="Date"
                        
                        placeholder="Preferred Section"
                        className=" capitalize font-roboto p-0  placeholder-white-900 text-base text-left h-[50px]  pl-4 "
                        wrapClassName=" common-pointer border border-white-700_99 border-solid w-full h-[100%] bg-[#292e34]"
                        style={{color:"white"}}
                        // onChange={(e) => {
                        //   form.handleChange("name", e);
                        // }}
                        // errors={form?.errors?.name}
                        // value={form?.values?.name}
                      
                        size="md"
                        variant="fill"
                /> */}
                <textarea   readOnly
  className=" resize-none border border-white p-2 rounded-md  h-[220px]  text-white font-roboto p-0  placeholder-white-900 text-base text-left h-[130px]  pl-4 
 w-full h-[100%] bg-[#292e34] "
  style={{color:"white"}}
  placeholder="Type something..."
></textarea>


                                    
                          
                                </div>
           
                        </div>
                       
               
                 
                  {/* {/ Add more input fields as needed /} */}
                </div>
                


                <div  className='flex flex-row items-start justify-between mt-[18px] w-full'>
                        <Input
                        name="Preffered Section"
                        placeholder="Preffered Section"
                        className=" capitalize font-roboto p-0  placeholder-white-900 text-base text-left h-[50px]  pl-4 "
                        wrapClassName=" common-pointer border border-white-700_99 border-solid w-[49%] bg-[#292e34]"
                        style={{color:"white"}}
                        // onChange={(e) => {
                        //   form.handleChange("name", e);
                        // }}
                        // errors={form?.errors?.name}
                        // value={form?.values?.name}
                      
                        size="md"
                        variant="fill"
                />

                                    
                          <Button
                              className=" h-[52px] w-[49%] cursor-pointer font-inter font-semibold leading-[normal] min-w-[128px] text-center text-sm border text-white700 "
                              // color="indigo_A400"
                              style={{color:"white"}}
                              size="sm"
                              onClick={handleClick}>
                          TimePicker
                            </Button>
                                </div>


                                <div  className='flex flex-row items-start justify-between mt-[18px] w-full'>
                        <Input
                        name="firstName"
                        placeholder="First Name"
                        className=" capitalize font-roboto p-0  placeholder-white-900 text-base text-left h-[50px]  pl-4 "
                        wrapClassName=" common-pointer border border-white-700_99 border-solid w-[49%] bg-[#292e34]"
                        style={{color:"white"}}
                        // onChange={(e) => {
                        //   form.handleChange("name", e);
                        // }}
                        // errors={form?.errors?.name}
                        // value={form?.values?.name}
                      
                        size="md"
                        variant="fill"
                />
         <Input
                        name="lastName"
                        placeholder="Last Name"
                        className=" capitalize font-roboto p-0  placeholder-white-900 text-base text-left h-[50px]  pl-4 "
                        wrapClassName=" common-pointer border border-white-700_99 border-solid w-[49%] bg-[#292e34]"
                        style={{color:"white"}}
                        // onChange={(e) => {
                        //   form.handleChange("name", e);
                        // }}
                        // errors={form?.errors?.name}
                        // value={form?.values?.name}
                      
                        size="md"
                        variant="fill"
                />
                                    
                       
                                </div>
                                <div  className='flex flex-row items-start justify-between mt-[18px] w-full'>
                        <Input
                        name="ContactNo"
                        placeholder="Contact No"
                        className=" capitalize font-roboto p-0  placeholder-white-900 text-base text-left h-[50px]  pl-4 "
                        wrapClassName=" common-pointer border border-white-700_99 border-solid w-[49%] bg-[#292e34]"
                        style={{color:"white"}}
                        // onChange={(e) => {
                        //   form.handleChange("name", e);
                        // }}
                        // errors={form?.errors?.name}
                        // value={form?.values?.name}
                      
                        size="md"
                        variant="fill"
                />
         <Input
                        name="email"
                        placeholder="Email"
                        className=" capitalize font-roboto p-0  placeholder-white-900 text-base text-left h-[50px]  pl-4 "
                        wrapClassName=" common-pointer border border-white-700_99 border-solid w-[49%] bg-[#292e34]"
                        style={{color:"white"}}
                        // onChange={(e) => {
                        //   form.handleChange("name", e);
                        // }}
                        // errors={form?.errors?.name}
                        // value={form?.values?.name}
                      
                        size="md"
                        variant="fill"
                />
                                    
                       
                                </div>
                                <div  className='flex flex-row items-start justify-between mt-[18px] w-full'>
                        <Input
                        name="DOB"
                        placeholder="DOB"
                        className=" capitalize font-roboto p-0  placeholder-white-900 text-base text-left h-[50px]  pl-4 "
                        wrapClassName=" common-pointer border border-white-700_99 border-solid w-[49%] bg-[#292e34]"
                        style={{color:"white"}}
                        // onChange={(e) => {
                        //   form.handleChange("name", e);
                        // }}
                        // errors={form?.errors?.name}
                        // value={form?.values?.name}
                      
                        size="md"
                        variant="fill"
                />
        
                                    
                       
                                </div>
                <div className="flex flex-col items-start justify-start mt-[18px] w-full">
                
                  <Input
                        name="input"
                        placeholder=" Booking Notes?"
                        className="capitalize font-roboto p-0  placeholder-white-900 text-base text-left w-full h-[50px] pl-4 "
                        wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                        style={{color:"white"}}
                        // onChange={(e) => {
                        //   form.handleChange("name", e);
                        // }}
                        // errors={form?.errors?.name}
                        // value={form?.values?.name}
                      
                        size="md"
                        variant="fill"
                />

                  {/* {/ Add more input fields as needed /} */}
                </div>
               
                <div className="flex flex-col items-start justify-start mt-[18px] w-full">
                  <Input
                    name="input"
                    placeholder="No of Guests "
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
                    wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                    type="number"
                    // onChange={(e) => {
                    //   form.handleChange("price", e);
                    // }}
                    // errors={form?.errors?.price}
                    // value={form?.values?.price}
                    style={{color:"white"}}
                   
                    size="md"
                    variant="fill"
                  />
                  {/* {/ Add more input fields as needed /} */}
                </div>
              
                
                

                <div className="flex flex-col items-start justify-start w-full mt-20">
                  <Button
                    className="common-pointer cursor-pointer font-bold leading-[normal] min-w-[459px] sm:min-w-full text-center text-xl w-full"
                    shape="round"
                    size="md"
                    variant="gradient"
                    color="blue_600_indigo_900"
                    // onClick={() => {
                    //   form.handleSubmit(addSection);
                    // }}
                  >
                    Book Ticket
                  </Button>
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
