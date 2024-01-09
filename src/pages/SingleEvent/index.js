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
import Dob from 'components/Date';





function SingleEvent({ isOpen, onRequestClose, eventId }) {
const [data,setData]=useState([])
const [startDate, setStartDate] = useState(null);
const [dob, setDob] = useState(null);
const [formattedStartTime,setFormattedStartTime] = useState(null);
  const [arrivalTime, setArrivalTime] = useState(null);
  const venueId=localStorage.getItem('Venue')




  useEffect(() => {
    loadSection();
  }, [eventId]);

  console.log(eventId,"event id =============>>>>")

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






  async function bookTicket(data) {
    // Check if both name and price are defined
   

    const req = {
      data: {
        venue_id:venueId,
        event_id:eventId,
        first_name:data?.first_name,
      last_name: data?.last_name,
      phone:data?.phone,
      email:data?.email,
      booking_note: data?.booking_note,
      no_of_seats:data?.no_of_seats,
      arrival_time:arrivalTime,
      dob:dob,
      section:"hello",
      },
    };

    try {
      const res = await postBookTickets(req);
      console.log("i hit the api ==>>")
      console.log(res);

      toast.success('Ticket has been Booked  Successfully!');
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

console.log(data.event_desc,"data ==============>>>>>")


  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleClick = () => {
      // Toggle the state to open/close the popup
      setPopupOpen(!isPopupOpen);
  };




  const handleDateChange = (start) => {
    setStartDate(start);
  
  };
  const handleDobChange = (dob) => {
    console.log("==================================================================================>>>>>>>")
    console.log(dob,"comimg dob is ")
    setDob(dob);
  
  };

  const handleTimeChange = (start) => {
    const formattedTime = moment(start).format('hh:mm A');
    setArrivalTime(start);
    setFormattedStartTime(formattedTime)
    
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
                   {data.name}
                  </Text>
                  
                </div>
              

                </div>
               
                
                <div className="flex flex-row items-start justify-start mt-[18px] w-full">
                
                <div className='w-5/12'>
                 <img className="h-51  event-image" src={data.featured_image} alt="Event Image" />
                           
                  </div>
                   <div>
                          
                        </div>
                        <div className='w-8/12'>
                        <div  className='flex flex-row items-start justify-between mt-[18px] w-full'>
                      <div className='border border-white-700_99 border-solid w-[49%] bg-[#292e34] h-[51px]'>
                      <DatePicker placeholder={data.date_from} onChange={handleDateChange}
                         className="capitalize font-roboto p-0  placeholder-white-900 text-base text-left h-[50px]  pl-4   " />
                      </div>
                       

                                    
                          <Button
                              className=" h-[52px] w-[49%] cursor-pointer font-inter font-semibold leading-[normal] min-w-[128px] text-center text-sm border text-white700 "
                              // color="indigo_A400"
                              style={{color:"white"}}
                              size="sm"
                              onClick={handleClick}>
                          
                              Table Selection
                            </Button>
                                </div>
                                <div  className='flex flex-row items-start justify-between mt-[18px] w-full
                                resize-none border border-white p-2 rounded-md  h-[220px]  text-white font-roboto p-0  placeholder-white-900 text-base text-left h-[130px]  pl-4 
                                w-full h-[100%] bg-[#292e34]'>
                     
                {/* <textarea   readOnly
         className=" resize-none border border-white p-2 rounded-md  h-[220px]  text-white font-roboto p-0  placeholder-white-900 text-base text-left h-[130px]  pl-4 
 w-full h-[100%] bg-[#292e34] "
  
  placeholder="Type something..."
  
></textarea> */}

<h2 style={{
  color:"white"
}}>
{data.event_desc}
</h2>


                                    
                          
                                </div>
           
                        </div>
                       
               
                 
                  
                </div>
                


                <div  className='flex flex-row items-start justify-between mt-[18px] w-full'>
                        <Input
                        name="Preffered Section"
                        placeholder="Preffered Section"
                        className=" capitalize font-roboto p-0  placeholder-white-900 text-base text-left h-[50px]  pl-4 "
                        wrapClassName=" common-pointer border border-white-700_99 border-solid w-[49%] bg-[#292e34]"
                        style={{color:"white"}}
                       
                        errors={form?.errors?.section}
                        value={form?.values?.section}
                      
                        size="md"
                        variant="fill"
                />

                <div className='w-[49%] h-[51px]'> 
                <TimePicker 
                          onChange={handleTimeChange}
                          value={arrivalTime}
                          placeholder="Arrival Time"
                          className="custom-timepicker border  text-left h-full  w-full text-base " 
                        />
                </div>
                                    

      
                                </div>


                                <div  className='flex flex-row items-start justify-between mt-[18px] w-full'>
                        <Input
                        name="firstName"
                        placeholder="First Name"
                        className=" capitalize font-roboto p-0  placeholder-white-900 text-base text-left h-[50px]  pl-4 "
                        wrapClassName=" common-pointer border border-white-700_99 border-solid w-[49%] bg-[#292e34]"
                        style={{color:"white"}}
                        onChange={(e) => {
                          form.handleChange("first_name", e);
                        }}
                        errors={form?.errors?.["first_name"]}
                        value={form?.values?.["first_name"]}
                      
                        size="md"
                        variant="fill"
                />
         <Input
                        name="lastName"
                        placeholder="Last Name"
                        className=" capitalize font-roboto p-0  placeholder-white-900 text-base text-left h-[50px]  pl-4 "
                        wrapClassName=" common-pointer border border-white-700_99 border-solid w-[49%] bg-[#292e34]"
                        style={{color:"white"}}
                        onChange={(e) => {
                          form.handleChange("last_name", e);
                        }}
                        errors={form?.errors?.["last_name"]}
                        value={form?.values?.["last_name"]}
                      
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
                        onChange={(e) => {
                          form.handleChange("phone", e);
                        }}
                        errors={form?.errors?.phone}
                        value={form?.values?.phone}
                      
                        size="md"
                        variant="fill"
                />
         <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className=" capitalize font-roboto p-0  placeholder-white-900 text-base text-left h-[50px]  pl-4 "
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
                                    
                       
                                </div>
                                <div  className='flex flex-row items-start justify-between mt-[18px] w-full'>
                                <div className='border border-white-700_99 border-solid w-[49%] bg-[#292e34] h-[51px]'>
                              


                                <Dob placeholder="DOB" onChange={handleDobChange}
                         className="capitalize font-roboto p-0  placeholder-white-900 text-base text-left h-[50px]  pl-4   " />
                      </div>
                      
        
                                    
                       
                                </div>
                <div className="flex flex-col items-start justify-start mt-[18px] w-full">
                
                  <Input
                        name="input"
                        placeholder=" Booking Notes?"
                        className="capitalize font-roboto p-0  placeholder-white-900 text-base text-left w-full h-[50px] pl-4 "
                        wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                        style={{color:"white"}}
                        onChange={(e) => {
                          form.handleChange("booking_note", e);
                        }}
                        errors={form?.errors?.["booking_note"]}
                        value={form?.values?.["booking_note"]}
                      
                        size="md"
                        variant="fill"
                />

                
                </div>
               
                <div className="flex flex-col items-start justify-start mt-[18px] w-full">
                  <Input
                    name="input"
                    placeholder="No of Guests "
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
                    wrapClassName="common-pointer border-[2px] rounded-[20px] border-[#d2ae38] border-solid w-full bg-[#292e34]"
                    type="number"
                    onChange={(e) => {
                      form.handleChange("no_of_seats", e);
                    }}
                    errors={form?.errors?.["no_of_seats"]}
                    value={form?.values?.["no_of_seats"]}
                    style={{color:"white"}}
                   
                    size="md"
                    variant="fill"
                  />
                 
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
