import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { getVenueType, postSignupUser,getTimezone } from "service/api";
import * as yup from "yup";

import { Button, Img, Input, SelectBox, Text } from "components";

import useForm from "hooks/useForm";

import "react-toastify/dist/ReactToastify.css";

const selectOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];
const divOptionsList = [
  { label: "America/New York", value: 1 },
  
];

const SignUpPage = () => {
  const navigate = useNavigate();
  const [signupUser, setSignupUser] = React.useState();


  
  const [venueTypeList, setVenueTypeList] = useState([]);
  const [selectedVenueType, setSelectedVenueType] = useState(null);
  const [venueType, setVenueType] = React.useState();
  
  const formValidationSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .required("Email is required")
      .matches(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Email is not in correct format",
      ),
    password: yup.string().required("Password is required"),
    venue_name: yup.string().required("Venue Name is required"),
   
  });
  
  const form = useForm(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      address:"",
      venue_name: "",
      venue_type:"",
      website: "",
      timezone:"",
    },
    {
      validate: true,
      validateSchema: formValidationSchema,
      validationOnChange: true,
    },
  );

  function createanaccount(data) {
    const req = {

      data: {
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        password: data?.password,
        role_id: "1",
        venue_name: data?.venue_name,
        phone:data?.phone,
        venue_type: selectedVenueType,
        website: data?.website,
        timezone: selectedTimeZoneType,

      },

    };

    postSignupUser(req)
      .then((res) => {
        setSignupUser(res?.data);

        toast.success("You are Registered Succesfully!");
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
        
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something Went Wrong!");
      });
  }
  async function select() {
    const req = {};
  
    await getVenueType(req)
      .then((res) => {
        console.log(res, "response is");
        setVenueType(res.data.data);
        console.log(venueType, "id ==>>>");
  
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
  

useEffect(()=>{
  select();

},[])

 console.log(venueTypeList,"type of venue ")



const handleVenueTypeChange = (selectedOption) => {

  setSelectedVenueType(selectedOption);
};

  
  const [timezoneType, setTimezoneType] = React.useState();
  const [timeZoneList, setTimeZoneList] = useState([]);
  const [selectedTimeZoneType, setSelectTimeZoneType] = useState(null);

  async function fetchTimezones() {
    try {
      const req = {};
      const res = await getTimezone(req);
      console.log(res.data.data, "response is");

      setTimezoneType(res.data.data);

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

      setTimeZoneList(options);
    } catch (err) {
      console.error(err);
    }
  }
  console.log(timeZoneList,"type of timezone")
 
  useEffect(() => {
   
    fetchTimezones();
  }, []);

  const handleTimeZoneTypeChange = (selectedOption) => {
   
    setSelectTimeZoneType(selectedOption);
  };



  return (
    <>
      <div className="bg-black-900 flex flex-col font-poppins items-center justify-start mx-auto w-full">
        <div
          className="bg-cover bg-no-repeat flex flex-col h-full items-center justify-start p-[53px] md:px-10 sm:px-5 w-full"
          style={{ backgroundImage: "url('images/img_group2.png')" }}
        >
          <div className="flex flex-col items-center justify-start mb-2.5 w-[41%] md:w-full">
            <div className="bg-white-A700 flex flex-col items-start justify-start max-w-[661px] p-12 md:px-10 sm:px-5 rounded-[24px] w-full">
              <div className="flex flex-col gap-6 items-start justify-start w-auto sm:w-full">
                <div className="flex flex-col items-center justify-center w-[534px] sm:w-full">
                  <Text
                    className="md:text-3xl sm:text-[28px] text-[32px] text-blue_gray-900 w-auto"
                    size="txtPoppinsMedium32"
                  >
                    Sign Up
                  </Text>
                </div>
                <div className="flex sm:flex-col flex-row gap-6 items-start justify-start w-[100%] sm:w-full">
                  <div className="flex flex-col gap-2.5 items-center justify-start w-[48%] sm:w-full">
                    <div className="flex flex-col items-start justify-start pb-[3px] pr-[3px] w-full">
                      <Text
                        className="text-base text-gray-700"
                        size="txtPoppinsSemiBold16"
                      >
                        First name
                      </Text>
                    </div>
                    <Input
                      name="input"
                      placeholder=""
                      className="p-0 placeholder:bg-white-A700 w-full h-[48px]"
                      wrapClassName="h-12 rounded-[10px] w-[98%]"
                      onChange={(e) => {
                        form.handleChange("firstName", e);
                      }}
                      errors={form?.errors?.firstName}
                      value={form?.values?.firstName}
                      shape="round"
                      color="gray_400"
                      variant="outline"
                    ></Input>
                  </div>
                  <div className="flex flex-col gap-2.5 items-center justify-start w-[48%] sm:w-full">
                    <div className="flex flex-col items-start justify-start pb-0.5 pr-0.5 w-full">
                      <Text
                        className="text-base text-gray-700"
                        size="txtPoppinsSemiBold16"
                      >
                        Last name
                      </Text>
                    </div>
                    <Input
                      name="input_One"
                      placeholder=""
                      className="p-0 placeholder:bg-white-A700 w-full h-[48px]"
                      wrapClassName="h-12 outline outline-[1px] outline-gray-400 rounded-[10px] w-[98%]"
                      onChange={(e) => {
                        form.handleChange("lastName", e);
                      }}
                      errors={form?.errors?.lastName}
                      value={form?.values?.lastName}
                      shape="round"
                      color="white_A700"
                      variant="fill"
                    ></Input>
                  </div>
                </div>
                <div className="flex sm:flex-col flex-row gap-6 items-start justify-start w-[100%] sm:w-full">
                  <div className="flex flex-col gap-2.5 items-center justify-start w-[48%] sm:w-full">
                    <div className="flex flex-col items-start justify-start pb-[3px] pr-[3px] w-full">
                      <Text
                        className="text-base text-white-700"
                        size="txtPoppinsSemiBold16"
                      >
                        Email
                      </Text>
                    </div>
                    <Input
                      name="input_Two"
                      placeholder=""
                      className="p-0 placeholder:bg-white-A700 w-full h-[48px]"
                      wrapClassName="outline outline-[1px] outline-gray-400 rounded-[10px] w-full"
                      onChange={(e) => {
                        form.handleChange("email", e);
                      }}
                      errors={form?.errors?.email}
                      value={form?.values?.email}
                      shape="round"
                      color="white_A700"
                      variant="fill"
                    ></Input>
                  </div>
                  <div className="flex flex-col gap-2.5 items-center justify-start w-[48%] sm:w-full">
                    <div className="flex flex-col font-poppins items-start justify-start pb-0.5 pr-0.5 w-full">
                      <Text
                        className="text-base text-gray-700"
                        size="txtPoppinsSemiBold16"
                      >
                        Password
                      </Text>
                    </div>
                  
                    <Input
                      name="input_Two"
                      type="password"
                      placeholder=""
                      className="p-0 placeholder:bg-white-A700 w-full h-[48px]"
                      wrapClassName="outline outline-[1px] outline-gray-400 rounded-[10px] w-full"
                      onChange={(e) => {
                        form.handleChange("password", e);
                      }}
                      errors={form?.errors?.password}
                      value={form?.values?.password}
                      shape="round"
                      color="white_A700"
                      variant="fill"
                    ></Input>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-start pb-2 w-full">
                  <div className="flex flex-col gap-1 items-start justify-start w-[558px] sm:w-full">
                    <div className="flex flex-col items-start justify-start pb-0.5 pr-0.5 w-full ">
                      <Text
                        className="text-base text-gray-700"
                        size="txtPoppinsSemiBold16"
                      >
                        Venue Name
                      </Text>
                    </div>
                    <Input
                      name="input_Three"
                      placeholder=""
                      className="p-0 placeholder:bg-white-A700 w-full h-[48px]"
                      wrapClassName="outline outline-[1px] outline-gray-400 rounded-[10px] w-full"
                      onChange={(e) => {
                        form.handleChange("venue_name", e);
                      }}
                      errors={form?.errors?.["venue_name"]}
                      value={form?.values?.["venue_name"]}
                      shape="round"
                      color="white_A700"
                      variant="fill"
                    ></Input>
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-start justify-start w-[558px] sm:w-full">
                  <div className="flex flex-col font-poppins items-start justify-end w-full">
                    <Text
                      className="text-base text-gray-700"
                      size="txtPoppinsSemiBold16"
                    >
                      What type of venue do you have? *
                    </Text>
                  </div>
                  <SelectBox
                    className="bg-white-A700 outline outline-[1px] outline-gray-400 pl-3.5 pr-0.5 py-0.5 rounded-[10px] text-base text-gray-600 text-left w-full"
                    placeholderClassName="text-gray-600"
                    indicator={
                      <Img
                        className="h-11 mr-[0] w-7"
                        src="images/img_div.svg"
                        alt="div"
                      />
                    }
                    isMulti={false}
                    name="select"
                    options={venueTypeList}
                    isSearchable={true}
                    placeholder="Select..."
                   onChange={handleVenueTypeChange}
                  
                  />
                </div>
                <div className="flex flex-col gap-1 items-start justify-start w-[558px] sm:w-full">
                  <div className="flex flex-col items-start justify-start pb-0.5 pr-0.5 w-full">
                    <Text
                      className="text-base text-gray-700"
                      size="txtPoppinsSemiBold16"
                    >
                      Address
                    </Text>
                  </div>
                  <div className="bg-white-A700 flex flex-col items-center justify-start outline outline-[1px] outline-gray-400 p-0.5 rounded-[10px] w-full">
                    <Input
                    type="tel"
                      name="div"
                      
                      placeholder=""
                      className="p-0 w-full h-[48px]"
                      wrapClassName="flex  w-full"
                     
                    ></Input>
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-start justify-start w-[558px] sm:w-full">
                  <div className="flex flex-col items-start justify-start pb-[3px] pr-[3px] w-full">
                    <Text
                      className="text-base text-gray-700"
                      size="txtPoppinsSemiBold16"
                    >
                      Timezone *
                    </Text>
                  </div>
                  <div className="flex flex-col font-roboto items-center justify-start w-full">
                    <SelectBox
                      className="bg-white-A700 outline outline-[1px] outline-gray-400 pl-3.5 pr-0.5 py-0.5 rounded-[10px] text-base text-gray-600 text-left w-full"
                      placeholderClassName="text-gray-600"
                      indicator={
                        <Img
                          className="h-11 mr-[0] w-7"
                          src="images/img_div.svg"
                          alt="div"
                        />
                      }
                      isMulti={false}
                      name="div"
                      options={timeZoneList}
                      isSearchable={true}
                      placeholder="Select..."
                      onChange={handleTimeZoneTypeChange}

                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-start justify-start w-[558px] sm:w-full">
                  <div className="flex flex-col items-start justify-start pb-[3px] pr-[3px] w-full">
                    <Text
                      className="text-base text-gray-700"
                      size="txtPoppinsSemiBold16"
                    >
                      Website
                    </Text>
                  </div>
                  <Input
                    name="input_Four"
                    placeholder=""
                    className="p-0 placeholder:bg-white-A700 w-full h-[48px]"
                    wrapClassName="outline outline-[1px] outline-gray-400 rounded-[10px] w-full"
                    onChange={(e) => {
                      form.handleChange("website", e);
                    }}
                    value={form?.values?.website}
                    shape="round"
                    color="white_A700"
                    variant="fill"
                  ></Input>
                </div>
                <Button
                  className="common-pointer cursor-pointer font-bold leading-[normal] min-w-[558px] sm:min-w-full rounded-[32px] text-center text-xl"
                  onClick={() => {
                    form.handleSubmit(createanaccount);
                  }}
                  size="lg"
                  variant="gradient"
                  color="blue_A400_indigo_900_01"
                >
                  Create an account
                </Button>
                <div className="flex flex-col items-center justify-center  p-0.5 w-full sm:w-full">
              <Text
                className="common-pointer text-base text-center text-gray-700 underline w-auto "
                size="txtPoppinsRegular16"
                onClick={() => navigate("/")}
              >
                <span className="text-indigo-900_01 font-poppins font-semibold">
                  Login?
                </span>
                <span className="text-gray-700 font-poppins font-normal">
                  {" "}
                  Click here to get started.
                </span>
              </Text>
            </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUpPage;
