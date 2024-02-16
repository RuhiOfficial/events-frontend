import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Modal from 'react-modal';
import * as yup from 'yup';
import { getSingleEvent } from 'service/api';
import useForm from 'hooks/useForm';
import moment from 'moment';

import { ToastContainer, toast } from 'react-toastify';
import { Button, Img, Line, List, Text ,Input} from "components";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'components/Timepicker';
import DatePicker from 'components/Date';
import DOB from 'components/Dob';
import { css } from '@emotion/react';
import { ScaleLoader } from 'react-spinners';
import ViewLayout from 'pages/ViewLayout';
import NumberInput from "react-number-input";
import Select from 'react-select';
import SingleEvent from 'pages/SingleEvent';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;





function EventInfo({ isOpen, onRequestClose, eventId }) {
    const [data,setData]=useState([])
    const [customDate,setCustomDate]=useState()
    const [customEndDate,setCustomEndDate]=useState()
    const [startDate, setStartDate] = useState(null);
    const [dob, setDob] = useState(null);
    const [formattedStartTime,setFormattedStartTime] = useState(null);
    const [arrivalTime, setArrivalTime] = useState(null);
    const venueId=localStorage.getItem('Venue')
    const [mySection, setMySection] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingNotes, setBookingNotes] = useState(null);
   
    useEffect(()=>{
      (localStorage.removeItem('Section'));
   },[eventId])

    useEffect(()=>{
      setMySection(localStorage.getItem('Section'));
   },)

  useEffect(() => {
    // Convert the given date string to a JavaScript Date object

    const rawDate= data.date_from;
    const rawDate2=data.date_to;
 const dateBeforeTString= rawDate?rawDate.split('T')[0]:null;
 const dateBeforeTString2= rawDate2?rawDate.split('T')[0]:null;



 

    const dateObject = new Date(dateBeforeTString);
    const dateObject2 = new Date(dateBeforeTString2);

    const options = {
      weekday: 'short', // Short day name (Sun)
      month: 'short',   // Short month name (Jan)
      day: 'numeric',   // Day of the month (04)
      year: 'numeric',  // Full year (2024)
    };
    
    const formattedDate = dateObject.toLocaleDateString('en-US', options);
    const formattedDate2 = dateObject2.toLocaleDateString('en-US', options);
    
   
    setCustomDate(formattedDate);
    setCustomEndDate(formattedDate2)
  }, [data.date_from,data.date_to]);

  useEffect(() => {
    loadSection();
  }, [eventId]);

  console.log(eventId,"event id =============>>>>")



  const bookingNotesList = [
    { value: 'birthday', label: 'Birthday Celebration' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'business', label: 'Business Meeting' },
    { value: 'wedding', label: 'Wedding Reception' },
    { value: 'graduation', label: 'Graduation Party' },
    { value: 'holiday', label: 'Holiday Celebration' },
    { value: 'promotion', label: 'Job Promotion' },
    { value: 'retirement', label: 'Retirement Party' },
    { value: 'farewell', label: 'Farewell Gathering' },
    { value: 'engagement', label: 'Engagement Party' },
    { value: 'baby_shower', label: 'Baby Shower' },
    { value: 'reunion', label: 'Family Reunion' },
    { value: 'conference', label: 'Conference Meeting' },
    { value: 'product_launch', label: 'Product Launch' },
    { value: 'award_ceremony', label: 'Award Ceremony' },
    { value: 'others', label: 'Others' },
  ];

  const selectStyle= {
    control: (provided, state) => ({
      ...provided,
      border: "none",
       // Add optional bottom border
      backgroundColor: "transparent",
      marginBottom:0,
      boxShadow: state.isFocused ? "none" : provided.boxShadow, // Remove boxShadow on focus
     
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#656c79",
      fontSize: 16,
      padding:0
      
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#5051f9" : "#292e34",
      color: state.isSelected ? "#fafafa" : "#fff",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#fff",
      "&:hover": {
        color: "#fff",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#656c79", // Set the background color of the dropdown menu
    }),
  
  }

  const handleBookingChange = (selectedOption) => {

    setBookingNotes(selectedOption);
    
  }; 

  const form = useForm(
    {

    
      first_name: "",
      last_name: "",
      phone: "",
      email:"",
      booking_note: "",
      no_of_seats:"",
      arrival_time:"",
      dob:"",
      section:"",
    
    },
    // {
    //   validate: true,
    //   validateSchema: formValidationSchema,
    //   validationOnChange: true,
    // },
  );



  console.log(dob,"dob is =================================>>>>>>>>>>")





 

  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

 


  async function loadSection() {
    setIsLoading(true)
    try {

      const res = await getSingleEvent({ data: { id: eventId } });
      console.log('Fetched Data from the single event page is :', res.data);

      // Check if the response data is not empty
      if (res.data) {
        // Update the state
       
        setData(res.data);
        
       setIsLoading(false)
        // setPrice(res.data.price);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // data imported ......................

console.log(data.event_desc,"data ==============>>>>>")


  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleClick = () => {
      // Toggle the state to open/close the popup
      setPopupOpen(!isPopupOpen);
  };




  
  const handleCloseModal = () => {
    // Reset ImageUploader by calling its reset function
  
    // Close the modal
    onRequestClose()
   
    setFormattedStartTime(null);
    setArrivalTime(null)
    
     // Reset the form when closing the modal
     form.resetForm();
    
  };
  


 
  console.log(bookingNotes,"notes for the booking is =====>>")
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
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
      
   
     


 <div className="flex flex-col font-poppins items-center justify-start mx-auto w-full ">
 {isLoading ? (
        <div style={{ display: 'flex', flexDirection:"column", justifyContent: 'center', alignItems: 'center', height: 'auto', width:"100%"}}>
          <ScaleLoader css={override} color={'#5051f9'} loading={isLoading} />
          <h1 style={{color:'#5051f9', fontSize:"20px"}}> Loading!</h1>
        </div>
      ) : (  
           <div className="flex flex-col font-poppins items-center justify-start mx-auto w-full ">
             <div className="bg-no-repeat flex flex-col items-center justify-start p-10 md:p-5 w-full">
             {/* <PacmanLoader css={override} size={50} color={'#5051f9'} loading={isLoading} />
                          {!isLoading && ( */}
               <div className="bg-[#292e34] flex flex-col items-start justify-start p-[3.5rem] rounded-[24px] w-full ">
                 <div className='text-center w-full flex justify-between items-center'>
                 <div className='text-center w-full flex justify-between items-center'>
                <div className="flex flex-col items-center justify-center w-[700px] sm:w-full">
                  <Text
                    className="md:text-3xl sm:text-[28px] text-[32px] text-white-A700 w-auto"
                    size="txtPoppins"
                  >
                    
                    {data.name}
                  </Text>
                </div>
                <Button className="modal-close" style={{color:"white",fontSize:"xx-large"}}  onClick={handleCloseModal}>
            &times;
          </Button>

                </div>
              

                </div>
               
                
                <div className="flex flex-row items-start justify-start mt-[18px] w-full">
                
                <div className='w-5/12 my-container'>
               
                 <img className="h-51  event-image" src={data.featured_image} alt="" />
                             
                  </div>
                 
                        <div className='w-8/12'>
                        <div  className='flex flex-row items-start justify-between mt-[18px] w-full'>
                     
                       

                                    
                          {/* <Button
                              className=" h-[52px] w-[49%] cursor-pointer font-inter font-semibold leading-[normal] min-w-[128px] text-center text-sm border border-[#d2ae38] hover:bg-[#d2ae38]  text-white700 "
                              // color="indigo_A400"
                              style={{color:"white"}}
                              size="sm"
                              onClick={openModal}>
                          
                              Table Selection
                            </Button> */}
                                </div>
                                <div  className='flex flex-row items-start justify-between mt-[10px] w-full
                                resize-none  p-2 rounded-md    text-white font-roboto p-0  placeholder-white-900 text-base text-left   pl-4 
                                w-full h-[100%] bg-[#292e34]'>
                     
                
  <p style={{color:"white"}}  className=" font-roboto p-0  placeholder-white-900 text-xl text-left p-3   ">
    
    <h1 className='font-roboto mb-5'> Date :- {customDate}</h1>
    <h1 className='font-roboto mb-5'> Description :- {data.event_desc}</h1>
    <h1 className='font-roboto mb-5'> Organiser :- {data.event_organiser}</h1>
    <h1 className='font-roboto mb-5'> Status :- {data.event_status}</h1>
    <h2></h2>
</p>


                                    
                          
                                </div>
           
                        </div>
                       
               
                 
                  
                </div>
                


         
              
                
                

                <div className="flex flex-col items-start justify-start w-full mt-20">
                  <Button
                    className="common-pointer cursor-pointer font-bold leading-[normal] min-w-[459px] sm:min-w-full text-center text-xl w-full"
                    shape="round"
                    size="md"
                    variant="gradient"
                    color="blue_600_indigo_900"
                    
                    onClick={
                        openModal }
                  >
                    Book Now
                  </Button>
                </div>
              </div>
                          {/* )} */}
            </div>
          </div>
          )}
<SingleEvent isOpen={isModalOpen} onRequestClose={closeModal} eventId={eventId} />
          </div>
     
          <ToastContainer
    
    style={{
     
      top: '70%',
      left: '50%',
      transform: 'translateX(-50%)',
      
      
    }}
  />
      {/* <ViewLayout isOpen={isModalOpen} onRequestClose={closeModal} /> */}
    </Modal>
    
  );
}

export default EventInfo;
