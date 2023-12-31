// Modal.js
import React,{useState} from 'react';
import * as yup from "yup";
import { Button, Img, Input, Text } from "components";
import useForm from "hooks/useForm";
import {postAddEvent } from "service/api";
import {  ToastContainer,toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DateRangePicker from 'components/DateRangePicker';
// import
// TimePicker
// from
// "@ashwinthomas/react-time-picker-dropdown"
// ;
import "../../pages/Custom.css"
import ImageUploader from 'components/ImageUploader'

const EventModal = ({ isEventOpen, onEventClose }) => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);


  console.log(selectedImage,"selected image is ")
  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
  
    // Convert data URL to Blob
    const blob = dataURLtoBlob(imageUrl);
  
    // Convert Blob to a readable URL
    const imageUrlReadable = URL.createObjectURL(blob);
  
    
  };
  
  // Function to convert data URL to Blob
  function dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new Blob([u8arr], { type: mime });
  }
  

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleTimeChange = (start) => {
    setStartTime(start);
    
  };
  const handleTimeToChange = (end) => {
    setEndTime(end);
    
  };

  
 const cid= localStorage.getItem("LoginId");
 console.log(cid,"customer id is ===>>>")

  /////////// Validations ////////////////
      const formValidationSchema = yup.object().shape({
      name: yup.string().required("Name is required"),
    
      
      date_from: yup.string().required("Date is required"),
      date_to: yup.string().required("Date is required"),
      time_from: yup.string().required("Time is required"),
      time_to: yup.string().required("Time is required"),
      event_type: yup.string().required("Event type is required"),
      event_organiser: yup.string().required("Event Organiser is required"),
      featured_image: yup.string().required("Image is required"),
      event_desc: yup.string().required("Description is required"),
      event_status: yup.string().required("Status is required")

      });

      const form = useForm(
        {
        
          name: "",
          featured_image: "",
          date_from: "",
          date_to:"",
          time_from: "",
          time_to:"",
          event_type: "",
          event_organiser: "",
          event_desc: "",
          facebook_event_url: "",
          event_status:"",
        },
        {
          validate: true,
          validateSchema: formValidationSchema,
          validationOnChange: true,
        },
      );


     async function event(data) {
      console.log("addevent called ==>>")

        const req = {
    
          data: {
            venue_id:1,
            name: data?.name,
          featured_image: selectedImage,
          date_from: startDate,
          date_to:endDate,
          time_from: startTime,
          time_to:endTime,
          event_type: data?.event_type,
          event_organiser: data?.event_organiser,
          event_desc: data?.event_desc,
          facebook_event_url: data?.facebook_event_url,
          event_status:data?.eve
    
          },
    
        };
    console.log(req,"req is ======>>>")
     await   postAddEvent(req)
          .then((res) => {
            console.log(res)
            
           // // setSignupUser(res?.data);
            
            toast.success("Event is added Succesfully!");
            setTimeout(() => {
              window.location.href="/"
            }, 3000);
          
          })
          .catch((err) => {
            console.error(err);
            toast.error("Something Went Wrong!");
          });
      }

   
    
   

  return (
    <div className={`modal ${isEventOpen ? 'flex' : 'hidden'}`}>  
      <div className="modal-overlay " onClick={onEventClose}></div>
      <div className="modal-container fixed top-0 left-0 h-screen w-screen flex items-center justify-center overflow-auto">
        <div className="modal-content bg-white p-4 rounded-lg shadow-md w-full sm:w-1/2 max-h-screen overflow-auto">
          

          {/* Your modal content */}
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
                    Add Event
                  </Text>
                </div>
            
                <span className="modal-close" style={{color:"white",fontSize:"xx-large"}}  onClick={onEventClose}>
            &times;
          </span>

                </div>
               
                
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                        name="name"
                        placeholder=" Event Name"
                        className="capitalize font-roboto p-0  placeholder-white-900 text-base text-left w-full"
                        wrapClassName="common-pointer border-b border-white-700_99 border-solid w-full bg-[#292e34]"
                        style={{color:"white"}}
                        onChange={(e) => {
                          form.handleChange("name", e);
                        }}
                        errors={form?.errors?.name}
                        value={form?.values?.name}
                      
                        size="md"
                        variant="fill"
                />

                  {/* Add more input fields as needed */}
                </div>
               <div className="flex flex-row items-start justify-start mt-[38px] w-full">

               <ImageUploader onChange={handleImageSelect} />
              
               <div >

               
                <div className="flex flex-col items-start justify-start w-full
                border-b border-white-700_99 border-solid ">
              
                  <DateRangePicker startDate={startDate} endDate={endDate} onChange={handleDateChange}
                   className=" border-b border-white-700_99 border-solid w-full bg-[#292e34] " />
                  
               
                </div>
                
                <div className="flex flex-row justify-between mt-[38px] w-full border-b border-white-700_99 border-solid">
                {/* <TimePicker className="custom-timepicker" style={{border:"1px solid white"}}
                
                placeholder="Time From" 
                onTimeChange
                =
                {
                handleTimeChange
                }
                />

                <TimePicker
                placeholder="Time To"
                onTimeChange
                =
                {
                handleTimeToChange
                }
                /> */}

                </div>
                </div>
                </div>

                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="event_type"
                    placeholder="Event Type"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
                    wrapClassName="common-pointer border-b border-white-700_99 border-solid w-full bg-[#292e34]"
                    
                    onChange={(e) => {
                      form.handleChange("event_type", e);
                    }}
                    errors={form?.errors?.["event_type"]}
                    value={form?.values?.["event_type"]}
                    style={{color:"white"}}
                    size="md"
                    variant="fill"
                  />
                  {/* Add more input fields as needed */}
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="event_organiser"
                    placeholder="Event Organiser"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
                    wrapClassName="common-pointer border-b border-white-700_99 border-solid w-full bg-[#292e34]"
                    
                    onChange={(e) => {
                      form.handleChange("event_organiser", e);
                    }}
                    errors={form?.errors?.["event_organiser"]}
                    value={form?.values?.["event_organiser"]}
                    style={{color:"white"}}
                    size="md"
                    variant="fill"
                  />
                  {/* Add more input fields as needed */}
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="event_desc"
                    placeholder="Description"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
                    wrapClassName="common-pointer border-b border-white-700_99 border-solid w-full bg-[#292e34]"
                    
                    onChange={(e) => {
                      form.handleChange("event_desc", e);
                    }}
                    errors={form?.errors?.["event_desc"]}
                    value={form?.values?.["event_desc"]}
                    style={{color:"white"}}
                    size="md"
                    variant="fill"
                  />
                  {/* Add more input fields as needed */}
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="facebook_event_url"
                    placeholder="Event Facebook URL"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
                    wrapClassName="common-pointer border-b border-white-700_99 border-solid w-full bg-[#292e34]"
                    
                    onChange={(e) => {
                      form.handleChange("facebook_event_url", e);
                    }}
                    errors={form?.errors?.["facebook_event_url"]}
                    value={form?.values?.["facebook_event_url"]}
                    style={{color:"white"}}
                    size="md"
                    variant="fill"
                  />
                  {/* Add more input fields as needed */}
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="event_status"
                    placeholder="Event Status"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full "
                    wrapClassName=" common-pointer border-b border-white-700_99 border-solid w-full bg-[#292e34] "
                    
                    onChange={(e) => {
                      form.handleChange("event_status", e);
                    }}
                    errors={form?.errors?.["event_status"]}
                    value={form?.values?.["event_status"]}
                    style={{color:"white"}}
                    size="md"
                    variant="fill"
                  />
                  {/* Add more input fields as needed */}
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
               
                  {/* <Input
                    name="featured_image"
                    placeholder="Featured Images"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
                    wrapClassName="common-pointer border-b border-white-700_99 border-solid w-full bg-[#292e34]"
                    
                    onChange={(e) => {
                      form.handleChange("timezone", e);
                    }}
                    errors={form?.errors?.timezone}
                    value={form?.values?.timezone}
                    style={{color:"white"}}
                    size="md"
                    variant="fill"
                  /> */}
                  {/* Add more input fields as needed */}
                </div>
            
                

                <div className="flex flex-col items-start justify-start w-full mt-20">
                <Button
                    className="common-pointer cursor-pointer font-bold leading-[normal] min-w-[459px] sm:min-w-full text-center text-xl w-full"
                    shape="round"
                    size="md"
                    variant="gradient"
                    color="blue_600_indigo_900"
                    onClick={() => {
                      form.handleSubmit(event);
                    }}
                  >
                    Add 
                  </Button>
                </div>
              </div>
            </div>
          </div>


          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    
  );
};

export default EventModal;