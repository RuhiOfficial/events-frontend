import React,{useEffect,useState} from 'react';
import * as yup from "yup";
import { Button, Img, Input, Text,SelectBox } from "components";
import useForm from 'hooks/useForm';
import {updateEvent,getEventType,getSingleEvent } from "service/api";
import {  ToastContainer,toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import TimePicker from 'components/Timepicker';
import moment from 'moment';
import ImageComponent from 'components/ImageComponent.js';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ImageUploader from 'components/ImageUploader'



function EditEvent({ isOpen, onRequestClose, eventId }) {
  const [name, setName] = useState('');
  const [organiser, setOrganiser] = useState('');
  const [description, setDescription ] = useState('');
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');
  // const [organiser, setOrganiser] = useState('');
  const [hoveredButtonIndex, setHoveredButtonIndex] = useState(null);
  const [tableList, setTableList] = useState([]);


  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [formattedStartTime, setFormattedStartTime] = useState(null);
  const [formattedEndTime, setFormattedEndTime] = useState(null);
  const [selectedEventTypeValue, setSelectedEventTypeValue] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [eventTypeList, setEventTypeList] = useState([]);
 const [selectedEventType, setSelectedEventType] = useState(null);
 const vid= localStorage.getItem("Venue");
 const [eventDay, setEventDay] = useState(null);
 const [type, setType] = useState(null);
 const [response, setResponse] = useState([]);
 const[featuredImage,setFeaturedImage]=useState(null)
  const[flag,setFlag]=useState(null)
 


 const handleImageSelect = (imageUrl) => {
  setSelectedImage(imageUrl);

};
const handleStartChange = (start) => {
  setStartDate(start);

};
const handleEndChange = (end) => {
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

const handleEventTypeChange = (selectedOption) => {
  console.log('Selected Option:', selectedOption);

  if (selectedOption) {
    // Check if the selected option contains only the value
    if (selectedOption.label === undefined) {
      // Search for the corresponding option in eventTypeList
      const updatedEventType = eventTypeList.find(
        (option) => option.value === selectedOption.value
      );

      // Update the state with the found option
      setSelectedEventType((prev) => updatedEventType || prev);
      setSelectedEventTypeValue(selectedOption.value);
    } else {
      // If the selected option has both label and value, update the state
      setSelectedEventType(selectedOption);
      setSelectedEventTypeValue(selectedOption.value);
    }
  } else {
    // If selected option is null, reset the state
    setSelectedEventType(null);
    setSelectedEventTypeValue(null);
  }
};







const cid= localStorage.getItem("LoginId");


 
  // useEffect(() => {
  //   async function loadEvent() {
   

  //     try {
  //       const res = await getSingleEvent({ data: { id: eventId} });
  //       console.log('Fetched Data For Single Event :', res.data);
  
  //       // Check if the response data is not empty
  //       if (res.data) {
  //         // Update the state
  //        setResponse(res.data);
  //         setName(res.data.name);
  //         setOrganiser(res.data.event_organiser)
  //         setDescription(res.data.event_desc);
  //         setUrl(res.data.facebook_event_url)
  //         setStatus(res.data.event_status)
  //         const startDateObject = new Date(res.data.date_from);
  //         const endDateObject = new Date(res.data.date_to);
         
  //         const startTimeMoment = moment(res.data.time_from, 'hh:mm A');
  //         const endTimeMoment = moment(res.data.time_to, 'hh:mm A');
  
  //         // Set the initial values for the DateRangePicker and TimePicker
  //         setStartDate(startDateObject);
  //         setEndDate(endDateObject);
  //         setStartTime(startTimeMoment.toDate());
  //         setEndTime(endTimeMoment.toDate());
  //         setType(res.data.eventType)
  //        // Find the option with the matching event_type ID
  //        const selectedEventTypeOption = eventTypeList.find(
  //         (option) => option.value === res.data.event_type
  //       );
  
  //       // Set the selected option
  //       setSelectedEventType(selectedEventTypeOption);
  
          
          
  //       return res.data;
  //         // setPrice(res.data.data.price);
  //         // setTableList(res.data.data.tables)
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   loadEvent();
  // }, [eventId,eventTypeList]);


  useEffect(() => {
    async function loadEvent() {
      try {
        const res = await getSingleEvent({ data: { id: eventId } });
        console.log('Fetched Data For Single Event:', res.data);
  
        if (res.data) {
          setResponse(res.data);
          setName(res.data.name);
          setOrganiser(res.data.event_organiser);
          setDescription(res.data.event_desc);
          setUrl(res.data.facebook_event_url);
          setStatus(res.data.event_status);
  
          const startDateObject = new Date(res.data.date_from);
          const endDateObject = new Date(res.data.date_to);
          const startTimeMoment = moment(res.data.time_from, 'hh:mm A');
          const endTimeMoment = moment(res.data.time_to, 'hh:mm A');
  
          setStartDate(startDateObject);
          setEndDate(endDateObject);
          setStartTime(startTimeMoment.toDate());
          setEndTime(endTimeMoment.toDate());
          setType(res.data.eventType);
  
          // Find the option with the matching event_type ID
          const selectedEventTypeOption = eventTypeList.find(
            (option) => option.value === res.data.event_type
          );

          // Set the selected option
          setSelectedEventType(selectedEventTypeOption);
          setSelectedEventTypeValue(selectedEventTypeOption ? selectedEventTypeOption.value : null);
          setFeaturedImage(res.data.featured_image)
          return res.data;
        }
      } catch (err) {
        console.error(err);
      }
    }
  
    loadEvent();
  }, [eventId, eventTypeList]);
  
  // Remove the second useEffect block that handles selectedEventType

  
  

  async function handleEdit() {
    // Check if both name and price are defined
    // if (name === undefined || price === undefined) {
     
    //   return;
    // }

    const req = {
      data: {
        id: eventId,
        venue_id:vid,
        name:name,
        featured_image:featuredImage,
        date_from:startDate,
        date_to:endDate,
        time_from:formattedStartTime,
        time_to:formattedEndTime,
        event_type:selectedEventTypeValue,
        event_desc:description,
        facebook_event_url: url,
        event_status:status,
        event_organiser:organiser,




      },
    };

    try {
      const res = await updateEvent(req);
      console.log(res);

      toast.success('Event is updated Successfully!');
      setTimeout(() => {
        onRequestClose();
        // setName("");
        // setPrice("");
        // window.location.href = '/reservation';
      }, 3000);
    } catch (err) {
      console.error(err);
      toast.error('Something Went Wrong!');
    }
  }

           /////////Event_Type/////////
      


// const handleEventTypeChange = (selectedOption) => {

//   setSelectedEventType(selectedOption);
 
// };
useEffect(()=>{
  eventType();
},[])

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
useEffect(() => {
  // Log or debug statements for tracking the state changes
  console.log('selectedEventType:', selectedEventType);
}, [selectedEventType]);


// useEffect(() => {
//   // Find the option with the matching event_type ID
//   console.log(response.event_type,"type ====>>> from use effect ==>>")
//   console.log(flag ,"initial value ");
//   const selectedEventTypeOption = eventTypeList.find(
//     (option) => option.value === response.event_type
//   );

//   console.log(selectedEventTypeOption, "options=====>>");

//   // Set the selected option after the component has rendered
//   setSelectedEventType(selectedEventTypeOption);
 

  
// },[selectedEventType,response.event_type]); // Add dependencies as needed


console.log(selectedEventType,"selected event type ",eventId ,"=====>>>>>>>>>>>>>>> this ===>>")
  

 
  console.log(selectedEventType,"final event type =====>>>>>")
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={()=>{
      
        onRequestClose()
      }}
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
                   Edit Event
                  </Text>
                </div>
                <Button className="modal-close" style={{color:"white",fontSize:"xx-large"}}  onClick={onRequestClose}>
            &times;
          </Button>

                </div>
               
                
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                
                 <input
                  name="Name"
                  placeholder=" Event Name"
                  className="common-pointer border-[transparent]  w-full bg-[#292e34]  font-roboto p-0 placeholder-white-900 text-base text-left w-full h-[50px] pl-4 common-pointer w-full bg-[#292e34] "
                  
                  style={{ color: 'white' ,borderBottom:"1px solid white " }}
                  onChange={(e) => {
                    

                    
                    setName(e.target.value);
                  }}
                  value={name}
                  size="md"
                  variant="fill"
                />

                  {/* Add more input fields as needed */}
                </div>
               <div className="flex flex-row items-center justify-between mt-[38px] w-full">

               <ImageUploader imageUrl={featuredImage} onChange={handleImageSelect} />

              
               <div >


 <div className="flex flex-row items-start justify-start w-full
 border-b border-white-700_99 border-solid ">


<DatePicker
        selected={startDate}
        onChange={handleStartChange}
        startDate={startDate}
        dateFormat="yyyy-MM-dd"
        selectsStart
        placeholderText="Start Date"
        className="custom-datepicker"
      />

<DatePicker
        selected={endDate}
        onChange={handleEndChange}
        startDate={endDate}
        dateFormat="yyyy-MM-dd"
        selectsEnd
        placeholderText="End Date"
        className="custom-datepicker"
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
 
<SelectBox
  className="font-roboto p-0 placeholder:text-white-900 text-base text-left w-full common-pointer border-b border-solid w-full bg-[#292e34] p-[18px] text-white-A700"
  placeholderClassName="text-gray-600"
  isMulti={false}
  name="eventType"
  options={eventTypeList}
  isSearchable={true}
  placeholder="Select Event Type..."
  onChange={handleEventTypeChange}
  value={selectedEventType} // Make sure selectedEventType is set correctly
/>

  </div>
                {selectedEventType?.value == "3"?
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                {/* <Input
                  name="event_day"
                  placeholder="Event Day"
                  className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
                  wrapClassName="common-pointer border-b border-white-700_99 border-solid w-full bg-[#292e34]"
                  
                  // onChange={(e) => {
                  //   form.handleChange("event_day", e);
                  // }}
                  // errors={form?.errors?.["event_day"]}
                  // value={form?.values?.["event_day"]}
                  style={{color:"white"}}
                  size="md"
                  variant="fill"
                /> */}
                 <input
                  name="event_day"
                  placeholder="Event Day"
                  className="common-pointer border-[transparent]  w-full bg-[#292e34]  font-roboto p-0 placeholder-white-900 text-base text-left w-full h-[50px] pl-4 common-pointer w-full bg-[#292e34] "
                  
                  style={{ color: 'white' ,borderBottom:"1px solid white " }}
                  onChange={(e) => {
                    

                    
                    setEventDay(e.target.value);
                  }}
                  value={eventDay}
                  size="md"
                  variant="fill"
                />
                {/* Add more input fields as needed */}
              </div>:null}
                
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  

<input
                   name="event_organiser"
                   placeholder="Event Organiser"
                  className="common-pointer border-[transparent]  w-full bg-[#292e34]  font-roboto p-0 placeholder-white-900 text-base text-left w-full h-[50px] pl-4 common-pointer w-full bg-[#292e34] "
                  
                  style={{ color: 'white' ,borderBottom:"1px solid white " }}
                  onChange={(e) => {
                   setOrganiser(e.target.value);
                  }}
                  value={organiser}
                  size="md"
                  variant="fill"
                />
                  {/* Add more input fields as needed */}
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  
                  <input
                  name="event_desc"
                  placeholder="Description"
                  className="common-pointer border-[transparent]  w-full bg-[#292e34]  font-roboto p-0 placeholder-white-900 text-base text-left w-full h-[50px] pl-4 common-pointer w-full bg-[#292e34] "
                  
                  style={{ color: 'white' ,borderBottom:"1px solid white " }}
                  onChange={(e) => {
                    

                    
                    setDescription(e.target.value);
                  }}
                  value={description}
                  size="md"
                  variant="fill"
                />
                  {/* Add more input fields as needed */}
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                 
                    <input
                  name="facebook_event_url"
                  placeholder="Event URL"
                  className="common-pointer border-[transparent]  w-full bg-[#292e34]  font-roboto p-0 placeholder-white-900 text-base text-left w-full h-[50px] pl-4 common-pointer w-full bg-[#292e34] "
                  
                  style={{ color: 'white' ,borderBottom:"1px solid white " }}
                  onChange={(e) => {
                    

                    
                    setUrl(e.target.value);
                  }}
                  value={url}
                  size="md"
                  variant="fill"
                />
                  {/* Add more input fields as needed */}
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                
                    <input
                  name="event_status"
                  placeholder="Event Status"
                  className="common-pointer border-[transparent]  w-full bg-[#292e34]  font-roboto p-0 placeholder-white-900 text-base text-left w-full h-[50px] pl-4 common-pointer w-full bg-[#292e34] "
                  
                  style={{ color: 'white' ,borderBottom:"1px solid white " }}
                  onChange={(e) => {
                    

                    
                    setStatus(e.target.value);
                  }}
                  value={status}
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
                    onClick={
                      handleEdit
                    }
                  >
                    Update
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

export default EditEvent;
