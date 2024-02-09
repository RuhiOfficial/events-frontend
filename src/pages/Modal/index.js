// Modal.js
import React ,{useState,useEffect} from 'react';
import * as yup from "yup";
import { Button, Input, Text,SelectBox ,Img} from "components";
import useForm from "hooks/useForm";
import {postStates, postAddVenue,getCountry,postCities, getVenueType,getTimezone } from "service/api";
import {  ToastContainer,toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import "../Custom.css";

const Modal = ({ isOpen, onClose }) => {
  
 const cid= localStorage.getItem("companyId");
//  console.log(cid,"customer id is ===>>>")
 
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
 const [selectedState, setSelectedState] = useState(null);
 const [cityList, setCityList] = useState([]);
 const [selectedCity, setSelectedCity] = useState(null);
 const [venueTypeList, setVenueTypeList] = useState([]);
 const [selectedVenueType, setSelectedVenueType] = useState(null);
 const [timezoneList, setTimezoneList] = useState([]);
 const [selectedTimezone, setSelectedTimezone] = useState(null);
  

  
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
     
      zipcode: yup.string().required("Zipcode is required"),
      address: yup.string().required("Address is required"),
      // venue_type: yup.string().required("Venue Type is required"),
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

     useEffect(() => {
  const fetchData = async () => {
    try {
      await country();
      await venueType();
      await timezone();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);



// const cardStyles = {
//   boxShadow: '0 0 20px rgba(255, 105, 180, 0.8)', // Bright pink shadow
//   borderRadius: '8px',
//   padding: '16px',
  
//   // Set the desired background color
//   // Other styling properties...
// };


     async function addvenue(data) {

      // console.log(data,"data from modal is ");
        const req = {
    
          data: {
            name: data?.name,
            email: data?.email,
            phone: data?.phone,
            cid: cid,
            country_id:selectedCountry,
            state_id:selectedState,
            city_id:selectedCity,
            zipcode: data?.zipcode,
            address: data?.address,
            tax: data?.tax,
            venue_type:selectedVenueType,
            timezone:selectedTimezone,
            website:data?.website,
            currency:data?.currency,
            capacity: data?.capacity,
           
    
          },
    
        };
    // console.log(req,"req is ======>>>")
     await   postAddVenue(req)
          .then((res) => {
            // console.log(res)
            
        
            
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
     
     


      

/////////// DropDowns ///////////

///////////Country///////////////

const handleCountryChange = (selectedOption) => {

  setSelectedCountry(selectedOption);
  states(selectedOption);
};

async function country() {
  const req = {};

  await getCountry(req)
    .then((res) => {
      // console.log(res, "response is");
      

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

      setCountryList(options);
      
    })
    .catch((err) => {
      console.error(err);
    });
}

///////////State///////////////

const handleStateChange = (selectedOption) => {

  setSelectedState(selectedOption);
  cities(selectedOption)
};


async function states(selectedCountry) {
  
  const req = { 
    data:{countryId:selectedCountry }};
  try {
    const res = await postStates(req);

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

    setStateList(options);
    
  } catch (error) {
    console.error("Error fetching states:", error);
  }
}
//////////////City//////////////////
const handleCityChange = (selectedOption) => {

  setSelectedCity(selectedOption);
};


async function cities(selectedState) {
  
  const req = { 
    data:{stateId:selectedState }};
  try {
    const res = await postCities(req);

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

    setCityList(options);
    
  } catch (error) {
    console.error("Error fetching states:", error);
  }
}


//////////Venue Type///////


const handleVenueTypeChange = (selectedOption) => {

  setSelectedVenueType(selectedOption);
 
};

async function venueType() {
  const req = {};

  await getVenueType(req)
    .then((res) => {
      // console.log(res, "response is");
      

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

      setVenueTypeList(options);
      
    })
    .catch((err) => {
      console.error(err);
    });
}
//////////Timezone///////


const handleTimezoneChange = (selectedOption) => {

  setSelectedTimezone(selectedOption);
 
};

async function timezone() {
  const req = {};

  await getTimezone(req)
    .then((res) => {
      // console.log(res, "response is");
      

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

      setTimezoneList(options);
      
    })
    .catch((err) => {
      console.error(err);
    });
}





// console.log(selectedCountry,"selected country==>>")
// console.log(selectedState,"selected State==>>")
// console.log(selectedCity,"selected city")
// console.log(selectedVenueType,"selected venueType")
// console.log(selectedTimezone,"selected Timezone")

  return (
    <div className={`modal ${isOpen ? 'flex' : 'hidden'}`}>  
      <div className="modal-overlay " onClick={onClose}></div>
      <div className="modal-container fixed top-0 left-0 h-screen w-screen flex items-center justify-center overflow-auto">
        <div className="modal-content bg-white p-4 rounded-lg shadow-md w-full sm:w-1/2 max-h-screen overflow-auto">
          

          {/* {/ Your modal content /} */}
          <div className="flex flex-col font-poppins items-center justify-start mx-auto w-full ">
           
          <div className="flex flex-col font-poppins items-center justify-start mx-auto w-full ">
            <div className="bg-no-repeat flex flex-col items-center justify-start p-10 md:p-5 w-full">
              <div  className="bg-[#292e34] flex flex-col items-start justify-start max-w-[716px] p-[3.5rem] rounded-[24px] w-full ">
                <div className='text-center w-full flex justify-between items-center'>
                <div className="flex flex-col items-center justify-center w-[534px] sm:w-full">
                  <Text
                    className="md:text-3xl sm:text-[28px] text-[32px] text-white-A700 w-auto"
                    size="txtPoppins"
                  >
                    Add Venue
                  </Text>
                </div>
                <Button className="modal-close" style={{color:"white",fontSize:"xx-large"}}  onClick={onClose}>
            &times;
          </Button>

                </div>
               
                
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                        name="input"
                        placeholder="Name"
                        className="capitalize font-roboto p-0  placeholder-white-900 text-base text-left w-full h-[50px] pl-4 "
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

                  {/* {/ Add more input fields as needed /} */}
                </div>
               
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="input"
                    placeholder="Email"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
                    wrapClassName="common-pointer border-b border-white-700_99 border-solid w-full bg-[#292e34]"
                    type="email"
                    onChange={(e) => {
                      form.handleChange("email", e);
                    }}
                    errors={form?.errors?.email}
                    value={form?.values?.email}
                    style={{color:"white"}}
                   
                    size="md"
                    variant="fill"
                  />
                  {/* {/ Add more input fields as needed /} */}
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="input"
                    placeholder="Contact No"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
                    wrapClassName="common-pointer border-b border-white-700_99 border-solid w-full bg-[#292e34]"
                    type="tel"
                    onChange={(e) => {
                      form.handleChange("phone", e);
                    }}
                    errors={form?.errors?.phone}
                    value={form?.values?.phone}
                    style={{color:"white"}}
                   
                    size="md"
                    variant="fill"
                  />
                  {/* {/ Add more input fields as needed /} */}
                </div>
                
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                <SelectBox
                   className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full common-pointer border-b border-solid w-full bg-[#292e34] p-[18px] text-white-A700"
                   placeholderClassName="text-gray-600"
                   isMulti={false}
                   name="country"
                   options={countryList}
                   isSearchable={true}
                   placeholder="Select Country..."
                   onChange={handleCountryChange}
                
                 />
                </div>
                
               
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                <SelectBox
                   className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full common-pointer border-b border-solid w-full bg-[#292e34] p-[18px] text-white-A700"
                   placeholderClassName="text-gray-600"
                   isMulti={false}
                   name="state"
                   options={stateList}
                   isSearchable={true}
                   placeholder="Select State..."
                   onChange={handleStateChange}
                
                 />
                </div>

                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                <SelectBox
                   className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full common-pointer border-b border-solid w-full bg-[#292e34] p-[18px] text-white-A700"
                   placeholderClassName="text-gray-600"
                   isMulti={false}
                   name="city"
                   options={cityList}
                   isSearchable={true}
                   placeholder="Select City..."
                   onChange={handleCityChange}
                
                 />
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="input"
                    placeholder="Zipcode"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
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
                  
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="input"
                    placeholder="Address"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
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
                  
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="input"
                    placeholder="Tax"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
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
                 
                </div>

                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                <SelectBox
                   className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full common-pointer border-b border-solid w-full bg-[#292e34] p-[18px] text-white-A700"
                   placeholderClassName="text-gray-600"
                   isMulti={false}
                   name="venue_type"
                  options={venueTypeList}
                   isSearchable={true}
                   placeholder="Select Venue Type..."
                   onChange={handleVenueTypeChange}
                
                 />
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                <SelectBox
                   className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full common-pointer border-b border-solid w-full bg-[#292e34] p-[18px] text-white-A700"
                   placeholderClassName="text-gray-600"
                   isMulti={false}
                   name="timezone"
                  options={timezoneList}
                   isSearchable={true}
                   placeholder="Select Timezone..."
                   onChange={handleTimezoneChange}
                
                 />
                </div>
              
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="input"
                    placeholder="Website"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
                    wrapClassName="common-pointer border-b border-white-700_99 border-solid w-full bg-[#292e34]"
                    
                    onChange={(e) => {
                      form.handleChange("website", e);
                    }}
                    errors={form?.errors?.website}
                    value={form?.values?.website}
                    style={{color:"white"}}
                    size="md"
                    variant="fill"
                  />
                  
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="input"
                    placeholder="Currency"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
                    wrapClassName="common-pointer border-b border-white-700_99 border-solid w-full bg-[#292e34]"
                    
                    onChange={(e) => {
                      form.handleChange("currency", e);
                    }}
                    errors={form?.errors?.currency}
                    value={form?.values?.currency}
                    style={{color:"white"}}
                    size="md"
                    variant="fill"
                  />
                  
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="input"
                    placeholder="Capacity"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
                    wrapClassName="common-pointer border-b border-white-700_99 border-solid w-full bg-[#292e34]"
                    
                    onChange={(e) => {
                      form.handleChange("capacity", e);
                    }}
                    errors={form?.errors?.capacity}
                    value={form?.values?.capacity}
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

export default Modal;