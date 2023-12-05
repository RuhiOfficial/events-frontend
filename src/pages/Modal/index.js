// Modal.js
import React ,{useState,useEffect} from 'react';
import * as yup from "yup";
import { Button, Input, Text,SelectBox } from "components";
import useForm from "hooks/useForm";
import {postAddVenue,getCountry, } from "service/api";
import {  ToastContainer,toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

const Modal = ({ isOpen, onClose }) => {
  
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
            // venue_type: selectedVenueType,
            // timezone: selectedTimeZoneType,
    
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

  const [countryType, setCountryType] = useState();
  const [countryList, setCountryList] = useState([]);
 
  async function fetchCountry() {
    try {
      const req = {};
      const res = await getCountry(req);
      console.log(res.data.data, "response is");

      setCountryType(res.data.data);

      setCountryList(
        res.data.data.map((item) => ({
          label: item.name,
          value: item.id,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchCountry();
  }, []);

  return (
    <div className={`modal ${isOpen ? 'flex' : 'hidden'}`}>  
      <div className="modal-overlay " onClick={onClose}></div>
      <div className="modal-container fixed top-0 left-0 h-screen w-screen flex items-center justify-center overflow-auto">
        <div className="modal-content bg-white p-4 rounded-lg shadow-md w-full sm:w-1/2 max-h-screen overflow-auto">
          

         
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
                    Add Venue
                  </Text>
                </div>
                <span className="modal-close" style={{color:"white",fontSize:"xx-large"}}  onClick={onClose}>
            &times;
          </span>

                </div>
               
                
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                        name="input"
                        placeholder="Name"
                        className="capitalize font-roboto p-0  placeholder-white-900 text-base text-left w-full h-[50px] pl-4 "
                        wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                        style={{color:"white"}}
                        onChange={(e) => {
                          form.handleChange("name", e);
                        }}
                        errors={form?.errors?.name}
                        value={form?.values?.name}
                      
                        size="md"
                        variant="fill"
                />

                 
                </div>
               
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="input"
                    placeholder="Email"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
                    wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
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
                 
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="input"
                    placeholder="Contact No"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
                    wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
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
                 
                </div>
                
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                
                <SelectBox
                   className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full common-pointer border border-solid w-full bg-[#292e34] p-[18px] text-white-A700"
                   placeholderClassName="text-gray-600"
                   isMulti={false}
                   name="country_id"
                   options={countryList}
                   isSearchable={true}
                   placeholder="Select Country..."
                   onChange={(selectedOption) => {
                     form.handleChange("country_id", selectedOption);}}
                 
                 
/>
                
               </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="input"
                    placeholder="State"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
                    wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                    
                    onChange={(e) => {
                      form.handleChange("state_id", e);
                    }}
                    errors={form?.errors?.["state_id"]}
                    value={form?.values?.["state_id"]}
                    style={{color:"white"}}
                    size="md"
                    variant="fill"
                  />
                 
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="input"
                    placeholder="City"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
                    wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                    
                    onChange={(e) => {
                      form.handleChange("city_id", e);
                    }}
                    errors={form?.errors?.["city_id"]}
                    value={form?.values?.["city_id"]}
                    style={{color:"white"}}
                    size="md"
                    variant="fill"
                  />
                 
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="input"
                    placeholder="Zipcode"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
                    wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                    
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
                    wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                    
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
                    wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                    
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
                  <Input
                    name="input"
                    placeholder="Venue Type"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
                    wrapClassName=" common-pointer border border-white-700_99 border-solid w-full bg-[#292e34] "
                    
                    onChange={(e) => {
                      form.handleChange("venue_type", e);
                    }}
                    errors={form?.errors?.["venue_type"]}
                    value={form?.values?.["venue_type"]}
                    style={{color:"white"}}
                    size="md"
                    variant="fill"
                  />
                 
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="input"
                    placeholder="Timezone"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
                    wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                    
                    onChange={(e) => {
                      form.handleChange("timezone", e);
                    }}
                    errors={form?.errors?.timezone}
                    value={form?.values?.timezone}
                    style={{color:"white"}}
                    size="md"
                    variant="fill"
                  />
                 
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="input"
                    placeholder="Website"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
                    wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                    
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
                    wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                    
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
                    wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                    
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