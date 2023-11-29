// import React ,{useState} from "react";

// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";

// import { postLoginUser } from "service/api";
// import * as yup from "yup";

// import { Button, Img, Input, Text } from "components";

// import useForm from "hooks/useForm";


// export default function Modal({ isOpen, onClose }) {
//     const navigate = useNavigate();
//     const [showModal, setShowModal] = useState(false);
//     return (
//         <div  className={`modal ${isOpen ? 'block' : 'hidden'}`}>
          
//             {showModal ? (
//                 <>
//                     <div className="bg-black-900 flex flex-col font-poppins items-center justify-start mx-auto w-full">
//         <div
//           className="bg-cover bg-no-repeat flex flex-col h-[1117px] items-center justify-start p-[246px] md:px-10 sm:px-5 w-full"
//           style={{ backgroundImage: "url('images/img_group2.png')" }}
//         >
//           <div className=" bg-white-A700 flex flex-col items-start justify-start max-w-[661px] p-12 md:px-10 sm:px-5 rounded-[24px] w-full">

         

         

//             <Text
//               className="mt-[22px] md:text-3xl sm:text-[28px] text-[32px] text-blue_gray-900 text-center"
//               size="txtPoppinsBold32"
//             >
//               Log In
//             </Text>
//             <div className="flex flex-col h-[304px] md:h-auto items-start justify-start mt-[38px] w-auto sm:w-full ">
//               <div className="flex flex-col gap-5 items-end justify-center w-auto sm:w-full">
//                 <div className="flex flex-col gap-3.5 items-start justify-start pb-[19px] w-full">
//                   <Text
//                     className="text-base text-gray-700"
//                     size="txtPoppinsSemiBold16"
//                   >
//                     Email
//                   </Text>
//                   <Input
//                     name="input"
//                     placeholder="Email"
//                     className="capitalize font-roboto p-0 placeholder:text-black-900_87 text-base text-left w-full" 
//                     wrapClassName="common-pointer border border-gray-700_99 border-solid w-full w-[558px]"
//                     type="email"
//                     onChange={(e) => {
                      
//                     //   form1.handleChange("email", e);
//                     }}
//                     // errors={form1?.errors?.email}
//                     // value={form1?.values?.email}
//                     // onClick={() => {
//                     //   form1.handleSubmit(input);
//                     // }}
//                     shape="round"
//                     color="gray_200"
//                     size="md"
//                     variant="fill"
//                   ></Input>
//                 </div>
//                 <div className="flex flex-col gap-[11px] items-start justify-start pb-5 w-full">
//                   <Text
//                     className="text-base text-gray-700"
//                     size="txtPoppinsSemiBold16"
//                   >
//                     Password
//                   </Text>
//                   <Input
//                     name="input_One"
//                     placeholder="Password"
//                     className="!placeholder:text-black-900_87 !text-black-900_87 font-roboto p-0 text-base text-left w-full"
//                     wrapClassName="border-2 border-gray-700_66 border-solid flex rounded-[12px] w-full w-[558px]"
//                     type="password"
//                     // onChange={(e) => {
                      
//                     //   form1.handleChange("password", e);
//                     // }}
//                     // errors={form1?.errors?.password}
//                     // value={form1?.values?.password}
//                     suffix={
//                       <Img
//                         className="ml-[35px] my-auto"
//                         src="images/img_eye.svg"
//                         alt="button"
//                       />
//                     }
//                     // shape="round"
//                     // color="white_A700"
//                     // size="sm"
//                     // variant="fill"
//                     shape="round"
//                     color="gray_200"
//                     size="sm"
//                     variant="fill"
//                   ></Input>
//                 </div>
//                 <div className="flex flex-col items-start justify-start w-auto sm:w-full">
//                   <Button
//                     className="common-pointer cursor-pointer font-bold leading-[normal] min-w-[459px] sm:min-w-full text-center text-xl w-[558px]"
//                     // onClick={() => {
//                     //   form1.handleSubmit(login);
//                     // }}
//                     shape="round"
//                     size="md"
//                     variant="gradient"
//                     color="blue_600_indigo_900"
//                   >
//                     Log In
//                   </Button>
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-col items-center justify-between mb-[27px] mt-[43px] p-0.5 w-[459px] sm:w-full">
//               <Text
//                 className="common-pointer text-base text-center text-gray-700 underline w-auto mt-8"
//                 size="txtPoppinsRegular16"
//                 onClick={() => navigate("/signup")}
//               >
//                 <span className="text-indigo-900_01 font-poppins font-semibold">
//                   New Venue?
//                 </span>
//                 <span className="text-gray-700 font-poppins font-normal">
//                   {" "}
//                   Click here to get started.
//                 </span>
//               </Text>
//             </div>
//           </div>
//         </div>
//       </div>
//                 </>
//             ) : null}
//         </div>
//     );
// }

// Modal.js
// Modal.js
// import React from 'react';
// import { Button, Img, Input, Text } from "components";

// const Modal = ({ isOpen, onClose }) => {
//   return (
//     <div className={`modal ${isOpen ? 'flex' : 'hidden'}`}>
//       <div className="modal-overlay " onClick={onClose}></div>
//       <div className="modal-container fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
//         <div className="modal-content bg-white p-4 rounded-lg shadow-md w-full sm:w-1/2">
//           <span className="modal-close" onClick={onClose}>
//             &times;
//           </span>
          
//           {/* Your simplified and adjusted modal content */}
//           <div className="flex flex-col font-poppins items-center justify-start mx-auto w-full">
//             <div className="bg-no-repeat flex flex-col items-center justify-start p-10 md:p-5 w-full">
//               <div className="bg-[#292e34] flex flex-col items-start justify-start max-w-[661px] p-5 rounded-[24px] w-full">

//                 <Text
//                   className="mt-[22px] md:text-3xl sm:text-[28px] text-[32px] text-white-A700 text-center"
//                   size="txtPoppinsBold32"
//                 >
//                   Add Venue
//                 </Text>
                
//                 <div className="flex flex-col items-start justify-start mt-[38px] w-full">
//                   <Input
//                     name="input"
//                     placeholder="Email"
//                     className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
//                     wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
//                     type="email"
//                     onChange={(e) => {
//                       // Handle change
//                     }}
//                     color="gray_200"
//                     size="md"
//                     variant="fill"
//                   />
//                   {/* Add more input fields as needed */}
//                 </div>
               
//                 <div className="flex flex-col items-start justify-start mt-[38px] w-full">
//                   <Input
//                     name="input"
//                     placeholder="Email"
//                     className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
//                     wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
//                     type="email"
//                     onChange={(e) => {
//                       // Handle change
//                     }}
//                     color="gray_200"
//                     size="md"
//                     variant="fill"
//                   />
//                   {/* Add more input fields as needed */}
//                 </div>
//                 <div className="flex flex-col items-start justify-start mt-[38px] w-full">
//                   <Input
//                     name="input"
//                     placeholder="Email"
//                     className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
//                     wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
//                     type="email"
//                     onChange={(e) => {
//                       // Handle change
//                     }}
//                     color="gray_200"
//                     size="md"
//                     variant="fill"
//                   />
//                   {/* Add more input fields as needed */}
//                 </div>
//                 <div className="flex flex-col items-start justify-start mt-[38px] w-full">
//                   <Input
//                     name="input"
//                     placeholder="Email"
//                     className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
//                     wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
//                     type="email"
//                     onChange={(e) => {
//                       // Handle change
//                     }}
//                     color="gray_200"
//                     size="md"
//                     variant="fill"
//                   />
//                   {/* Add more input fields as needed */}
//                 </div>
//                 <div className="flex flex-col items-start justify-start mt-[38px] w-full">
//                   <Input
//                     name="input"
//                     placeholder="Email"
//                     className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
//                     wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
//                     type="email"
//                     onChange={(e) => {
//                       // Handle change
//                     }}
//                     color="gray_200"
//                     size="md"
//                     variant="fill"
//                   />
//                   {/* Add more input fields as needed */}
//                 </div>
//                 <div className="flex flex-col items-start justify-start mt-[38px] w-full">
//                   <Input
//                     name="input"
//                     placeholder="Email"
//                     className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
//                     wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
//                     type="email"
//                     onChange={(e) => {
//                       // Handle change
//                     }}
//                     color="gray_200"
//                     size="md"
//                     variant="fill"
//                   />
//                   {/* Add more input fields as needed */}
//                 </div>
//                 <div className="flex flex-col items-start justify-start mt-[38px] w-full">
//                   <Input
//                     name="input"
//                     placeholder="Email"
//                     className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
//                     wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
//                     type="email"
//                     onChange={(e) => {
//                       // Handle change
//                     }}
//                     color="gray_200"
//                     size="md"
//                     variant="fill"
//                   />
//                   {/* Add more input fields as needed */}
//                 </div>
//                 <div className="flex flex-col items-start justify-start mt-[38px] w-full">
//                   <Input
//                     name="input"
//                     placeholder="Email"
//                     className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
//                     wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
//                     type="email"
//                     onChange={(e) => {
//                       // Handle change
//                     }}
//                     color="gray_200"
//                     size="md"
//                     variant="fill"
//                   />
//                   {/* Add more input fields as needed */}
//                 </div>
//                 <div className="flex flex-col items-start justify-start mt-[38px] w-full">
//                   <Input
//                     name="input"
//                     placeholder="Email"
//                     className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
//                     wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
//                     type="email"
//                     onChange={(e) => {
//                       // Handle change
//                     }}
//                     color="gray_200"
//                     size="md"
//                     variant="fill"
//                   />
//                   {/* Add more input fields as needed */}
//                 </div>
                












//                 <div className="flex flex-col items-start justify-start w-full">
//                   <Button
//                     className="common-pointer cursor-pointer font-bold leading-[normal] min-w-[459px] sm:min-w-full text-center text-xl w-full"
//                     shape="round"
//                     size="md"
//                     variant="gradient"
//                     color="blue_600_indigo_900"
//                   >
//                     Log In
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

// Modal.js
import React from 'react';
import { Button, Img, Input, Text } from "components";

const Modal = ({ isOpen, onClose }) => {
  return (
    <div className={`modal ${isOpen ? 'flex' : 'hidden'}`}>
      <div className="modal-overlay " onClick={onClose}></div>
      <div className="modal-container fixed top-0 left-0 h-screen w-screen flex items-center justify-center overflow-auto">
        <div className="modal-content bg-white p-4 rounded-lg shadow-md w-full sm:w-1/2 max-h-screen overflow-auto">
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>

          {/* Your modal content */}
          <div className="flex flex-col font-poppins items-center justify-start mx-auto w-full">
           
          <div className="flex flex-col font-poppins items-center justify-start mx-auto w-full">
            <div className="bg-no-repeat flex flex-col items-center justify-start p-10 md:p-5 w-full">
              <div className="bg-[#292e34] flex flex-col items-start justify-start max-w-[661px] p-5 rounded-[24px] w-full">

                <Text
                  className="mt-[22px] md:text-3xl sm:text-[28px] text-[32px] text-white-A700 text-center"
                  size="txtPoppinsBold32"
                >
                  Add Venue
                </Text>
                
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="input"
                    placeholder="Email"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
                    wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                    type="email"
                    onChange={(e) => {
                      // Handle change
                    }}
                    color="gray_200"
                    size="md"
                    variant="fill"
                  />
                  {/* Add more input fields as needed */}
                </div>
               
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="input"
                    placeholder="Email"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
                    wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                    type="email"
                    onChange={(e) => {
                      // Handle change
                    }}
                    color="gray_200"
                    size="md"
                    variant="fill"
                  />
                  {/* Add more input fields as needed */}
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="input"
                    placeholder="Email"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
                    wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                    type="email"
                    onChange={(e) => {
                      // Handle change
                    }}
                    color="gray_200"
                    size="md"
                    variant="fill"
                  />
                  {/* Add more input fields as needed */}
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="input"
                    placeholder="Email"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
                    wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                    type="email"
                    onChange={(e) => {
                      // Handle change
                    }}
                    color="gray_200"
                    size="md"
                    variant="fill"
                  />
                  {/* Add more input fields as needed */}
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="input"
                    placeholder="Email"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
                    wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                    type="email"
                    onChange={(e) => {
                      // Handle change
                    }}
                    color="gray_200"
                    size="md"
                    variant="fill"
                  />
                  {/* Add more input fields as needed */}
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="input"
                    placeholder="Email"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
                    wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                    type="email"
                    onChange={(e) => {
                      // Handle change
                    }}
                    color="gray_200"
                    size="md"
                    variant="fill"
                  />
                  {/* Add more input fields as needed */}
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="input"
                    placeholder="Email"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
                    wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                    type="email"
                    onChange={(e) => {
                      // Handle change
                    }}
                    color="gray_200"
                    size="md"
                    variant="fill"
                  />
                  {/* Add more input fields as needed */}
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="input"
                    placeholder="Email"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
                    wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                    type="email"
                    onChange={(e) => {
                      // Handle change
                    }}
                    color="gray_200"
                    size="md"
                    variant="fill"
                  />
                  {/* Add more input fields as needed */}
                </div>
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="input"
                    placeholder="Email"
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full"
                    wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                    type="email"
                    onChange={(e) => {
                      // Handle change
                    }}
                    color="gray_200"
                    size="md"
                    variant="fill"
                  />
                  {/* Add more input fields as needed */}
                </div>
                

                <div className="flex flex-col items-start justify-start w-full">
                  <Button
                    className="common-pointer cursor-pointer font-bold leading-[normal] min-w-[459px] sm:min-w-full text-center text-xl w-full"
                    shape="round"
                    size="md"
                    variant="gradient"
                    color="blue_600_indigo_900"
                  >
                    Log In
                  </Button>
                </div>
              </div>
            </div>
          </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
