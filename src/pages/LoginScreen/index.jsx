import React from "react";

import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import { postLoginUser } from "service/api";
import * as yup from "yup";

import { Button, Img, Input, Text } from "components";
import { getLocalstorage } from "service/api";

import useForm from "hooks/useForm";

import "react-toastify/dist/ReactToastify.css";
import Cookies from 'js-cookie';


const LoginScreenPage = () => {
  const [loginUser, setLoginUser] = React.useState();
  
  
  const navigate = useNavigate();
  const form1ValidationSchema = yup.object().shape({
    email: yup
      .string()
      
      .required("Email is required")
      .matches(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Email is not in correct format",
      ),
    password: yup
      .string()
      .required("Password is required")
    
  });
  const form1 = useForm(
    { email: "", password: "" },
    {
      validate: true,
      validateSchema: form1ValidationSchema,
      validationOnChange: true,
    },
  );

  function login(data) {
    const req = { data: { email: data?.email, password: data?.password } };

    postLoginUser(req)
      .then((res) => {
         console.log(res,"response from Login screen ====>>")
        setLoginUser(res?.data);
        
        localStorage.setItem("Name", JSON.stringify(res?.data?.user?.name));
        localStorage.setItem("Venue", JSON.stringify(res?.data?.user?.venue_id));

        localStorage.setItem("LoginId", JSON.stringify(res?.data?.user?.id));
        localStorage.setItem('companyId', JSON.stringify(res?.data?.user?.company_id));
        localStorage.setItem("Status", true);

        localStorage.setItem(
          "RoleId",
          JSON.stringify(res?.data?.user?.["role_id"]),
        );

        localStorage.setItem(
          "Token",
          JSON.stringify(res?.data?.authorisation?.token),
        );
       
         Cookies.set('companyId', JSON.stringify(res?.data?.user?.company_id));
         Cookies.set('venueId', JSON.stringify(res?.data?.user?.venue_id));


         const fetch = async () => {
          const vid = localStorage.getItem('Venue');
          const req = {
            data: {
              venue_id: vid,
            },
          };
          try {
            const res = await getLocalstorage(req);
            console.log(res, 'Response coming from LOGIN PAGE  api ======>>');
            localStorage.setItem('canvasBackgroundImage',res.data[0].image_url)
            const backgroundImage=res.data[0].image_url
            const boxes=res.data[0].boxes
            localStorage.setItem(
              'canvasState',
              JSON.stringify({ backgroundImage, boxes, /* ...other state variables */ })
            );
            
          } catch (err) {
            console.error(err);
          }
        };
    fetch();













        
        // window.location.href = "/";
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went Wrong!");
      });
  }
  

  return (
    <>
      <div className="bg-black-900 flex flex-col font-poppins items-center justify-start mx-auto w-full">
        <div
          className="bg-cover bg-no-repeat flex flex-col h-[1117px] items-center justify-start p-[246px] md:px-10 sm:px-5 w-full"
          style={{ backgroundImage: "url('images/img_group2.png')" }}
        >
          <div className=" bg-white-A700 flex flex-col items-start justify-start max-w-[661px] p-12 md:px-10 sm:px-5 rounded-[24px] w-full h-full">

         

         

            <Text
              className="mt-[22px] md:text-3xl sm:text-[28px] text-[32px] text-blue_gray-900 text-center"
              size="txtPoppinsBold32"
            >
              Log In
            </Text>
            <div className="flex flex-col h-[304px] md:h-auto items-start justify-start mt-[38px] w-auto sm:w-full ">
              <div className="flex flex-col gap-5 items-end justify-center w-auto sm:w-full">
                <div className="flex flex-col gap-3.5 items-start justify-start pb-[19px] w-full">
                  <Text
                    className="text-base text-gray-700"
                    size="txtPoppinsSemiBold16"
                  >
                    Email
                  </Text>
                  <Input
                    name="input"
                    placeholder="Email"
                    className=" font-roboto p-0 placeholder:text-black-900_87 text-base text-left w-full h-[50px] pl-4" 
                    wrapClassName="common-pointer border border-gray-700_99 border-solid w-full w-[558px]"
                    type="email"
                    onChange={(e) => {
                      
                      form1.handleChange("email", e);
                    }}
                    errors={form1?.errors?.email}
                    value={form1?.values?.email}
                    onClick={() => {
                      form1.handleSubmit(login);
                    }}
                    shape="round"
                    color="gray_200"
                    size="md"
                    variant="fill"
                  ></Input>
                </div>
                <div className="flex flex-col gap-[11px] items-start justify-start pb-5 w-full">
                  <Text
                    className="text-base text-gray-700"
                    size="txtPoppinsSemiBold16"
                  >
                    Password
                  </Text>
                  <Input
                    name="input_One"
                    placeholder="Password"
                    className="!placeholder:text-black-900_87 !text-black-900_87 font-roboto p-0 text-base text-left w-full h-[50px] pl-4"
                    wrapClassName="border-2 border-gray-700_66 border-solid flex rounded-[12px] w-full w-[558px]"
                    type="password"
                    onChange={(e) => {
                      
                      form1.handleChange("password", e);
                    }}
                    errors={form1?.errors?.password}
                    value={form1?.values?.password}
                    suffix={
                      <Img
                        className="ml-[35px] my-auto"
                        src="images/img_eye.svg"
                        alt="button"
                      />
                    }
                    // shape="round"
                    // color="white_A700"
                    // size="sm"
                    // variant="fill"
                    shape="round"
                    color="gray_200"
                    size="sm"
                    variant="fill"
                  ></Input>
                </div>
                <div className="flex flex-col items-start justify-start w-auto sm:w-full">
                  <Button
                    className="common-pointer cursor-pointer font-bold leading-[normal] min-w-[459px] sm:min-w-full text-center text-xl w-[558px]"
                    onClick={() => {
                      form1.handleSubmit(login);
                    }}
                    shape="round"
                    size="md"
                    variant="gradient"
                    color="blue_600_indigo_900"
                  >
                    Log In
                  </Button>
                  <div className="flex flex-col items-center justify-between mb-[27px] mt-[43px] p-0.5 w-full sm:w-full">
              <Text
                className="common-pointer text-base text-center text-gray-700 underline w-auto  "
                size="txtPoppinsRegular16"
                onClick={() => navigate("/signup")}
              >
                <span className="text-indigo-900_01 font-poppins font-semibold">
                  Sign up?
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
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginScreenPage;
