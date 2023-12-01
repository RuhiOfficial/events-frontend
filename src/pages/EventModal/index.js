

// Modal.js
import React,{useState} from 'react';
import * as yup from "yup";
import { Button, Img, Input, Text } from "components";
import useForm from "hooks/useForm";
import {postAddVenue } from "service/api";
import {  ToastContainer,toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DateRangePicker from 'components/DateRangePicker';
import TimeRangePicker from 'components/TimeRangePicker';
import InputMask from 'react-input-mask';


const EventModal = ({ isEventOpen, onEventClose }) => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const handleTimeChange = (start, end) => {
    setStartTime(start);
    setEndTime(end);
  };

  
 const cid= localStorage.getItem("LoginId");
 console.log(cid,"customer id is ===>>>")

  /////////// Validations ////////////////
      const formValidationSchema = yup.object().shape({
      name: yup.string().required("Name is required"),
      email: yup
      .string()
      .required("Email is required")
      .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Email is not in correct format",
      ),
      phone: yup
      .string()
      .required("Contact Number is required")
      .matches(/^\d{10}$/, "Contact Number must be 10 digits"),
      country_id: yup.string().required("Country No. is required"),
      state_id: yup.string().required("State is required"),
      city_id: yup.string().required("City is required"),
      zipcode: yup.string().required("Zipcode is required"),
      address: yup.string().required("Address is required"),
      venue_type: yup.string().required("Venue Type is required"),
      website: yup.string().required("Website is required"),
      currency: yup.string().required("Currency is required"),
      capacity: yup.string().required("Capacity is required")

      });

      const form = useForm(
        {
          name: "",
          email: "",
          phone: "",
          country_id:"",
          state_id: "",
          city_id:"",
          zipcode: "",
          address: "",
          tax: "",
          venue_type: "",
          timezone:"",
          website: "",
          currency:"",
          capacity: "",
        },
        {
          validate: true,
          validateSchema: formValidationSchema,
          validationOnChange: true,
        },
      );

      // const formInitialState = {
      //   name: "",
      //   email: "",
      //   phone: "",
      //   country_id: "",
      //   state_id: "",
      //   city_id: "",
      //   zipcode: "",
      //   address: "",
      //   tax: "",
      //   venue_type: "",
      //   timezone: "",
      //   website: "",
      //   currency: "",
      //   capacity: "",
      // };
      // const form = useForm(
      //   { ...formInitialState },
      //   {
      //     validate: true,
      //     validateSchema: formValidationSchema,
      //     validationOnChange: true,
      //   }
      // );

      // const resetForm = () => {
      //   form.setValues({ ...formInitialState });
      //   form.setErrors({})
      // };


     async function addvenue(data) {

      console.log(data);
        const req = {
    
          data: {
            name: data?.name,
            email: data?.email,
            phone: data?.phone,
            cid: cid,
            country_id: data?.country_id,
            state_id:data?.state_id,
            city_id:data?.city_id,
            zipcode: data?.zipcode,
            address: data?.address,
            tax: data?.tax,
            venue_type: data?.venue_type,
            timezone: data?.timezone,
            website:data?.website,
            currency:data?.currency,
            capacity: data?.capacity,
    
          },
    
        };
    console.log(req,"req is ======>>>")
     await   postAddVenue(req)
          .then((res) => {
            console.log(res)
            
           // // setSignupUser(res?.data);
            
            toast.success("Venue is added Succesfully!");
            setTimeout(() => {
              window.location.href="/"
            }, 3000);
          
          })
          .catch((err) => {
            console.error(err);
            toast.error("Something Went Wrong!");
          });
      }

      const [startDate, setStartDate] = useState(null);
      const [endDate, setEndDate] = useState(null);
    
      const handleDateChange = (start, end) => {
        setStartDate(start);
        setEndDate(end);
      };
    
   

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
               
                <div className="flex flex-col items-start justify-start mt-[38px] w-full
                border-b border-white-700_99 border-solid ">
              
                  <DateRangePicker startDate={startDate} endDate={endDate} onChange={handleDateChange}
                   className=" border-b border-white-700_99 border-solid w-full bg-[#292e34] " />
                  
               
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  {/* <Input
                    name="date_to"
                    placeholder="Date To"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
                    wrapClassName="common-pointer border-b border-white-700_99 border-solid w-full bg-[#292e34]"
                    type="date"
                    onChange={(e) => {
                      form.handleChange("phone", e);
                    }}
                    errors={form?.errors?.phone}
                    value={form?.values?.phone}
                    style={{color:"white"}}
                   
                    size="md"
                    variant="fill"
                  /> */}
                  {/* Add more input fields as needed */}
                  <TimeRangePicker startTime={startTime} endTime={endTime} onChange={handleTimeChange} />
                </div>
                
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="time_from"
                    placeholder="Time From"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
                    wrapClassName="common-pointer border-b border-white-700_99 border-solid w-full bg-[#292e34]"
                    
                    onChange={(e) => {
                      form.handleChange("country_id", e);
                    }}
                    errors={form?.errors?.["country_id"]}
                    value={form?.values?.["country_id"]}
                    style={{color:"white"}}
                    size="md"
                    variant="fill"
                  />
                  {/* Add more input fields as needed */}
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                <InputMask
  mask="99:99 AM"
  maskChar="_"
  value={form?.values?.["state_id"]}
  onChange={(e) => {
    form.handleChange("state_id", e);
  }}
  className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
  placeholder="Time To"
  style={{
    color: "white",
    background: "transparent",
    border: "none",
    outline: "none",
    caretColor: "white",  // Set caret color for cursor
  }}
  size="md"
  variant="fill"
/>

                  {/* Add more input fields as needed */}
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="event_type"
                    placeholder="Event Type"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
                    wrapClassName="common-pointer border-b border-white-700_99 border-solid w-full bg-[#292e34]"
                    
                    onChange={(e) => {
                      form.handleChange("city_id", e);
                    }}
                    errors={form?.errors?.["city_id"]}
                    value={form?.values?.["city_id"]}
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
                      form.handleChange("zipcode", e);
                    }}
                    errors={form?.errors?.zipcode}
                    value={form?.values?.zipcode}
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
                      form.handleChange("address", e);
                    }}
                    errors={form?.errors?.address}
                    value={form?.values?.address}
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
                      form.handleChange("tax", e);
                    }}
                    errors={form?.errors?.tax}
                    value={form?.values?.tax}
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
                      form.handleChange("venue_type", e);
                    }}
                    errors={form?.errors?.["venue_type"]}
                    value={form?.values?.["venue_type"]}
                    style={{color:"white"}}
                    size="md"
                    variant="fill"
                  />
                  {/* Add more input fields as needed */}
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
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
                  />
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
                      form.handleSubmit(addvenue);
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
