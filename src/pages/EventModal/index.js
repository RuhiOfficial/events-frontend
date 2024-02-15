// Modal.js
import React,{useEffect,useState,useRef} from 'react';
import * as yup from "yup";
import { Button, Img, Input, Text,SelectBox } from "components";
import useForm from 'hooks/useForm';
import {postAddEvent,getEventType } from "service/api";
import {  ToastContainer,toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DateRangePicker from 'components/DateRangePicker';
import TimePicker from 'components/Timepicker';
import moment from 'moment';
import ImageComponent from 'components/ImageComponent.js';
import Select from "react-select";
import ImageUploader from 'components/ImageUploader'

const EventModal = ({ isEventOpen, onEventClose } ) => {
  const [resetSelectKey, setResetSelectKey] = useState(0);
  const [resetSelect, setResetSelect] = useState(false);
  const imageUploaderRef = useRef();
 const datePickerRef =useRef();
 const handleCloseModal = () => {
  // Reset ImageUploader by calling its reset function
  if (imageUploaderRef.current && imageUploaderRef.current.resetImage) {
    imageUploaderRef.current.resetImage();
  }

  // Reset the DateRangePicker
  if (datePickerRef.current && datePickerRef.current.resetDatePicker) {
    datePickerRef.current.resetDatePicker();
  }

  // Close the modal
  onEventClose();

  // Reset the form only when the modal is closed
  resetForm();
  form.resetForm()
  setSelectedEventType("")
  setResetSelect(true);
  setResetSelectKey((prevKey) => prevKey + 1);
};

// This effect will run when resetSelectBox changes
useEffect(() => {
  // Reset the state when resetSelect changes
  if (resetSelect) {
    setSelectedEventType("");
    setResetSelect(false);
  }
}, [resetSelect]);




    const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [formattedStartTime, setFormattedStartTime] = useState(null);
  const [formattedEndTime, setFormattedEndTime] = useState(null);
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [eventTypeList, setEventTypeList] = useState([]);
 const [selectedEventType, setSelectedEventType] = useState(null);
 const vid= localStorage.getItem("Venue");

  console.log(selectedImage,"selected image is ")
  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
  
 };

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
//  const cardStyles = {
//   boxShadow: '0 0 20px rgba(255, 105, 180, 0.8)', // Bright pink shadow
//   borderRadius: '8px',
//   padding: '16px',
  
//   // Set the desired background color
//   // Other styling properties...
// };


  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleTimeChange = (start) => {
    const formattedTime = moment(start).format('hh:mm A');
    setStartTime(start);
    setFormattedStartTime(formattedTime)
    
  };
  const handleTimeToChange = (end) => {
    const formattedTime = moment(end).format('hh:mm A');
    setEndTime(end);
    setFormattedEndTime(formattedTime)
  };

  useEffect(() => {
    // Reset the DateRangePicker when the modal is closed
    if (!isEventOpen) {
      // Reset logic for other state if needed
      setStartDate(null);
      setEndDate(null);
    }
  }, [isEventOpen]);

  
 const cid= localStorage.getItem("LoginId");
 console.log(cid,"customer id is ===>>>")

  /////////// Validations ////////////////
      const formValidationSchema = yup.object().shape({
      name: yup.string().required("Name is required"),
    
      
      // date_from: yup.string().required("Date is required"),
      // date_to: yup.string().required("Date is required"),
      // time_from: yup.string().required("Time is required"),
      // time_to: yup.string().required("Time is required"),
      //  event_type: yup.string().required("Event type is required"),
      event_organiser: yup.string().required("Event Organiser is required"),
  
      event_desc: yup.string().required("Description is required"),
      event_status: yup.string().required("Status is required")

      });

      const resetForm = () => {
        form.resetForm({
          name: "",
          featured_image: "",
          date_from: "",
          date_to: "",
          time_from: "",
          time_to: "",
          event_type: "",
          event_day: "",
          event_organiser: "",
          event_desc: "",
          facebook_event_url: "",
          event_status: "",
        });
        setStartDate(null);
        setEndDate(null);
        setStartTime(null);
        setEndTime(null);
        setFormattedStartTime(null);
        setFormattedEndTime(null);
        setSelectedEventType(null);
        setSelectedImage(null);
      };
      

      
      const form = useForm(
        {
        
          name: "",
          featured_image: "",
          date_from: "",
          date_to:"",
          time_from: "",
          time_to:"",
          event_type:"",
          event_day:"",
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


     async function addEvent(data) {
      console.log("addevent called ==>>")

        const req = {
    
          data: {
          venue_id:vid,
          name: data?.name,
          featured_image: selectedImage?selectedImage:"https://png.pngtree.com/thumb_back/fh260/background/20230328/pngtree-party-dance-neon-light-background-image_2120481.jpg",
          date_from: startDate,
          date_to:endDate,
          time_from: formattedStartTime,
          time_to:formattedEndTime,
          event_type:selectedEventType?.value,
          event_day:data?.event_day,
          event_organiser: data?.event_organiser,
          event_desc: data?.event_desc,
          facebook_event_url: data?.facebook_event_url,
          event_status:data?.event_status

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
            }, 2000);
          
          })
          .catch((err) => {
            console.error(err);
            toast.error(err);
          });
      }

          useEffect(()=>{
            eventType();
          },[])
          /////////Event_Type/////////
      


const handleEventTypeChange = (selectedOption) => {

  setSelectedEventType(selectedOption);
 
};

async function eventType() {
  const req = {};

  await getEventType(req)
    .then((res) => {
      console.log(res, "response is");
      

      let options;

      if (res.data.data.length === 1) {
        
        options = [
          {
            label: res.data.data[0].name,
            value: res.data.data[0].id,
          },
        ];
      } else {
       
        options = res.data.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
      }

      setEventTypeList(options);
      
    })
    .catch((err) => {
      console.error(err);
    });
}
   
    console.log(selectedEventType,"selected")
    useEffect(() => {
      console.log(selectedImage,"from useEffect"); // Check the value in the console
    }, [selectedImage]);

  return (
    <div className={`modal ${isEventOpen ? 'flex' : 'hidden'}`}>  
      <div   className="modal-overlay " onClick={handleCloseModal}></div>
      <div  className="modal-container fixed top-0 left-0 h-screen w-screen flex items-center justify-center overflow-auto">
        <div  className="modal-content bg-white p-4 rounded-lg shadow-md w-full sm:w-1/2 max-h-screen overflow-auto">
          

       
          <div  className="flex flex-col font-poppins items-center justify-start mx-auto w-full ">
           
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
                <Button className="modal-close" style={{color:"white",fontSize:"xx-large"}}  onClick={handleCloseModal}>
            &times;
          </Button>

                </div>
               
                
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                        name="name"
                        placeholder=" Event Name"
                        className="capitalize font-roboto p-0  placeholder-white-900 text-base text-left w-full h-[50px] pl-4"
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
               <div className="flex flex-row items-center justify-between mt-[38px] w-full">

               <ImageUploader
          ref={imageUploaderRef} // Attach the ref to ImageUploader
          onChange={handleImageSelect}
        />
              
               <div >


 <div className="flex flex-col items-start justify-start w-full
 border-b border-white-700_99 border-solid ">

<DateRangePicker
              ref={datePickerRef}
              startDate={startDate}
              endDate={endDate}
              onChange={handleDateChange}
              onReset={() => {
                // Handle any additional reset logic for DateRangePicker if needed
                console.log('DateRangePicker reset');
              }}
              className=" border-b border-white-700_99 border-solid w-full bg-[#292e34]"
            />
       
 </div>
 
 <div className="flex flex-row justify-between mt-[38px] w-full border-b border-white-700_99 border-solid">
 <TimePicker 
          onChange={handleTimeChange}
          value={startTime}
          placeholder="Time From"
          className="custom-timepicker" 
        />
        <TimePicker 
          onChange={handleTimeToChange}
          value={endTime}
          placeholder="Time To"
          className="custom-timepicker" 
        />
 



 </div>
 </div>
 </div>

 

 <div className="flex flex-col items-start justify-start mt-[38px] w-full">
               
 <Select
            key={resetSelectKey} // Force re-mount when key changes
            id="eventType"
            name="eventType"
            className=" capitalize font-roboto p-0 text-base text-left w-full common-pointer bg-[#292e34] p-[10px] text-white-A700 border-t-0 border-r-0 border-l-0 border-b border-[white] outline-none focus:border-b-2 focus:border-[white] focus:ring-0 appearance-none"
            options={eventTypeList}
            placeholder="Select Event Type..."
            isSearchable={false}
            onChange={handleEventTypeChange}
            value={eventTypeList.find((option) => option.value === selectedEventType)}
            styles={selectStyle}
           ></Select>
                {/* <select
                  id="eventType"
                  name="eventType"
                  style={{
                    placeholder: {
                      color: "red",
                      fontSize: 12,
                      fontWeight: "bold",
                    },}}
                  className="capitalize font-roboto p-0 text-base text-left w-full common-pointer bg-[#292e34] p-[18px] text-white-A700 border-t-0 border-r-0 border-l-0 border-b-2 border-[white] outline-none focus:border-b-2 focus:border-[white] focus:ring-0 appearance-none"
                  onChange={(e) => {
                    form.handleChange("event_type", e.target.value);
                    setSelectedEventType(e.target.value)
                  }}
                  value={form.values.event_type}
                  
                  

                >
                  <option value="" disabled hidden className="placeholder-text-gray-500">Select Event Type...</option>
                  {eventTypeList.map((event) => (
                    <option key={event.value} value={event.value}>
                      {event.label}
                    </option>
                  ))}

                </select> */}
                  {/* Add more input fields as needed */}
                </div>
                {selectedEventType?.value == "3"?
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                <Input
                  name="event_day"
                  placeholder="Event Day"
                  className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
                  wrapClassName="common-pointer border-b border-white-700_99 border-solid w-full bg-[#292e34]"
                  
                  onChange={(e) => {
                    form.handleChange("event_day", e);
                  }}
                  errors={form?.errors?.["event_day"]}
                  value={form?.values?.["event_day"]}
                  style={{color:"white"}}
                  size="md"
                  variant="fill"
                />
                {/* Add more input fields as needed */}
              </div>:null}
                
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="event_organiser"
                    placeholder="Event Organiser"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
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
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
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
                    placeholder="Event  URL"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
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
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
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
                      form.handleSubmit(addEvent);
                     
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