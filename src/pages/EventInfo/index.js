import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Modal from 'react-modal';
import * as yup from 'yup';
import { getSingleEvent } from 'service/api';
import useForm from 'hooks/useForm';
import moment from 'moment';
import { updateSection,postBookTickets } from 'service/api';
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





  async function bookTicket(data) {
   
console.log("data from api is ====>>>")
    const req = {
      data: {
      venue_id:venueId,
      event_id:eventId,
      first_name:data?.first_name,
      last_name: data?.last_name,
      phone:data?.phone,
      email:data?.email,
      booking_note: bookingNotes?.label,
      no_of_seats:data?.no_of_seats,
      arrival_time:formattedStartTime,
      dob:dob,
      section:mySection,
      
      },
    };

    try {
      const res = await postBookTickets(req);
      console.log("i hit the api ==>>")
      console.log(res);

      toast.success('Ticket has been Booked  Successfully!');
      setTimeout(() => {
        onRequestClose();
         window.location.href = '/';
      }, 3000);
    } catch (err) {
      console.error(err);
      toast.error('Something Went Wrong!');
    }
  }

  const handleDateChange = (start) => {
    console.log(start,"testing is now done")
    setStartDate(start);
  
  };
  const handleDobChange = (start) => {
    console.log(start,"testing is now done")
    setDob(start);
  
  };
  

  const handleTimeChange = (start) => {
    const formattedTime = moment(start).format('hh:mm A');
    setArrivalTime(start);
    setFormattedStartTime(formattedTime)
    
  };

 

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
                                <div  className='flex flex-row items-start justify-between mt-[18px] w-full
                                resize-none border border-white p-2 rounded-md  h-[220px]  text-white font-roboto p-0  placeholder-white-900 text-base text-left h-[130px]  pl-4 
                                w-full h-[100%] bg-[#292e34]'>
                     
                
  <p style={{color:"white"}}  className=" font-roboto p-0  placeholder-white-900 text-base text-left h-[90px] p-3   ">
    <h1 className='font-roboto mb-5'> Start Date :- {customDate} </h1>
    <h1 className='font-roboto mb-5'> End Date :- {customEndDate}</h1>
    <h1 className='font-roboto mb-5'> Description :- {data.event_desc}</h1>
    <h1 className='font-roboto mb-5'> Organiser :- {data.event_organiser}</h1>
    <h1 className='font-roboto mb-5'> Status :- {data.event_status}</h1>
    <h2></h2>
</p>


                                    
                          
                                </div>
           
                        </div>
                       
               
                 
                  
                </div>
                


                <div  className='flex flex-row items-start justify-between mt-[18px] w-full'>
                        {/* <Input
                        name="Preffered Section"
                        placeholder="Preffered Section"
                        className=" font-roboto p-0  placeholder-white-900 text-base text-left h-[50px]  pl-4 "
                        wrapClassName={mySection?(" common-pointer border border-[#d2ae38] border-solid w-[49%] bg-[#292e34]"):("common-pointer border border-white-700_99 border-solid w-[49%] bg-[#292e34]")}
                        style={{color:"white"}}
                       
                        errors={form?.errors?.section}
                        value={mySection}
                      
                        size="md"
                        variant="fill"
                /> */}

                <div className='w-[49%] h-[51px]'> 
                {/* <TimePicker 
                          onChange={handleTimeChange}
                          value={arrivalTime}
                          placeholder="Arrival Time"
                          className="custom-timepicker border  text-left h-full  w-full text-base " 
                        /> */}
                </div>
                                    

      
                                </div>


                                <div  className='flex flex-row items-start justify-between mt-[18px] w-full'>
                        {/* <Input
                        name="firstName"
                        placeholder="First Name"
                        className="font-roboto p-0  placeholder-white-900 text-base text-left h-[50px]  pl-4 "
                        wrapClassName=" common-pointer border border-white-700_99 border-solid w-[49%] bg-[#292e34]"
                        style={{color:"white"}}
                        onChange={(e) => {
                          form.handleChange("first_name", e);
                        }}
                        errors={form?.errors?.["first_name"]}
                        value={form?.values?.["first_name"]}
                      
                        size="md"
                        variant="fill"
                /> */}
         {/* <Input
                        name="lastName"
                        placeholder="Last Name"
                        className="font-roboto p-0  placeholder-white-900 text-base text-left h-[50px]  pl-4 "
                        wrapClassName=" common-pointer border border-white-700_99 border-solid w-[49%] bg-[#292e34]"
                        style={{color:"white"}}
                        onChange={(e) => {
                          form.handleChange("last_name", e);
                        }}
                        errors={form?.errors?.["last_name"]}
                        value={form?.values?.["last_name"]}
                      
                        size="md"
                        variant="fill"
                /> */}
                                    
                       
                                </div>
                                <div  className='flex flex-row items-start justify-between mt-[18px] w-full'>
                        {/* <Input
                        name="ContactNo"
                        placeholder="Contact No"
                        className=" font-roboto p-0  placeholder-white-900 text-base text-left h-[50px]  pl-4 "
                        wrapClassName=" common-pointer border border-white-700_99 border-solid w-[49%] bg-[#292e34]"
                        style={{color:"white"}}
                        onChange={(e) => {
                          form.handleChange("phone", e);
                        }}
                        errors={form?.errors?.phone}
                        value={form?.values?.phone}
                      
                        size="md"
                        variant="fill"
                /> */}
         {/* <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className=" font-roboto p-0  placeholder-white-900 text-base text-left h-[50px]  pl-4 "
                        wrapClassName=" common-pointer border border-white-700_99 border-solid w-[49%] bg-[#292e34]"
                        style={{color:"white"}}
                        onChange={(e) => {
                          form.handleChange("email", e);
                        }}
                        errors={form?.errors?.email}
                        value={form?.values?.email}
                      
                        size="md"
                        variant="fill"
                />
                                     */}
                       
                                </div>
                                <div  className='flex flex-row items-start justify-between mt-[18px] w-full'>
                                {/* <div className='border border-white-700_99 border-solid w-[49%] bg-[#292e34] h-[51px]'>
                              
                                <DOB placeholder='DOB' onChange={handleDobChange}  utcOffset={new Date().getTimezoneOffset()}/>

                                
</div> */}
                      
        
                                    
                       
                                </div>
                <div className="flex flex-col items-start justify-start mt-[18px] w-full">
                
                  {/* <Input
                        name="input"
                        placeholder=" Booking Notes?"
                        className=" font-roboto p-0  placeholder-white-900 text-base text-left w-full h-[50px] pl-4 "
                        wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                        style={{color:"white"}}
                        onChange={(e) => {
                          form.handleChange("booking_note", e);
                        }}
                        errors={form?.errors?.["booking_note"]}
                        value={form?.values?.["booking_note"]}
                      
                        size="md"
                        variant="fill"
                /> */}
 {/* <Select
  id="booking_notes"
  name="booking_notes"
  className="capitalize font-roboto h-[51] p-0 text-base text-left w-full common-pointer bg-[#292e34] p-[10px] text-white-A700 border border-[white] outline-none focus:border-b-2 focus:border-[white] focus:ring-0 appearance-none"
  options={bookingNotesList}
  placeholder="Booking Notes..."
  isSearchable={false}
  onChange={handleBookingChange}
  value={
     // assuming you have a label property in bookingNotes
    bookingNotesList.find((option) => option.value === bookingNotes)
  }
  styles={selectStyle}
/>

{bookingNotes?.value === "others" ? (
  <textarea
    rows=""
    cols=""
    className="capitalize font-roboto p-0  text-base text-left w-full common-pointer bg-[#292e34] p-[18px] text-white-A700 border border-[white] outline-none focus:border-b-2 focus:border-[white] focus:ring-0 appearance-none mt-5"
    placeholder="Your occasion or special request?"
    onChange={(e) => {
      setBookingNotes({ value: "others", label: e.target.value });
    }}
  ></textarea>
) : null} */}

                                  {/* <select  style={{color:"white"}} id="booking_note_select" name="booking_note" className="capitalize font-roboto  pl-4 text-base text-left w-full common-pointer bg-[#292e34]  text-white-A700 border border-[white] outline-none focus:border-b-2 focus:border-[white] focus:ring-0 appearance-none h-[51px]"  onChange={(e) => {
                          form.handleChange("booking_note", e);
                          if (e.target.value === 'other') {
                            document.getElementById('booking_note_textarea').style.display = 'block';
                        } else {
                            document.getElementById('booking_note_textarea').style.display = 'none';
                        }
                        }}>
                                  <option value="" className="text-darkgray ">Select a booking note</option>
                                  <option value="birthday" >Birthday Celebration</option>
                                  <option value="anniversary">Anniversary Party</option>
                                  <option value="graduation">Graduation Dinner</option>
                                  <option value="other">Other</option>
                                  </select>
                                  <textarea id="booking_note_textarea" name="other_event_note" className="capitalize font-roboto p-0  text-base text-left w-full common-pointer bg-[#292e34] p-[18px] text-white-A700 border border-[white] outline-none focus:border-b-2 focus:border-[white] focus:ring-0 appearance-none mt-5" placeholder="Your occasion or special request?" style={{ display: 'none' }} />
                             */}
                
                </div>
               
                <div className="flex flex-col items-start justify-start mt-[18px] w-full">
                {/* <Input
  name="input"
  placeholder="No of Guests"
  className="font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
  wrapClassName="common-pointer border-[2px] rounded-[20px] border-[#d2ae38] border-solid w-full bg-[#292e34]"
  type="number"
  onChange={(e) => {
    form.handleChange("no_of_seats", e);
  }}
  errors={form?.errors?.["no_of_seats"]}
  value={form?.values?.["no_of_seats"]}
  style={{ color: "white" }}
  min="1"
  size="md"
  variant="fill"
/> */}

                 
                </div>
              
                
                

                <div className="flex flex-col items-start justify-start w-full mt-20">
                  <Button
                    className="common-pointer cursor-pointer font-bold leading-[normal] min-w-[459px] sm:min-w-full text-center text-xl w-full"
                    shape="round"
                    size="md"
                    variant="gradient"
                    color="blue_600_indigo_900"
                    onClick={() => {
                      form.handleSubmit(bookTicket);
                    }}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
                          {/* )} */}
            </div>
          </div>
          )}

          </div>
     
          <ToastContainer
    
    style={{
     
      top: '70%',
      left: '50%',
      transform: 'translateX(-50%)',
      
      
    }}
  />
      <ViewLayout isOpen={isModalOpen} onRequestClose={closeModal} />
    </Modal>
    
  );
}

export default EventInfo;
