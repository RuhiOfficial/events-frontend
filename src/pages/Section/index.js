
import React,{useEffect,useState} from 'react';
import Modal from 'react-modal';
import * as yup from "yup";
import { Button, Input, Text,SelectBox ,Img} from "components";
import useForm from "hooks/useForm";
import {  ToastContainer,toast } from "react-toastify";

function Section({ isOpen, onRequestClose }) {
    const formValidationSchema = yup.object().shape({
                      name: yup.string().required("Name is required"),
                      no_of_seats: yup.string().required("Seats count is required"),
                      minimum_order: yup.string().required("Minimum Order is required"),
                      });
                
            const form = useForm(
                        {
                          name: "",
                          no_of_seats: "",
                          minimum_order: "",
                        
                        },
                        {
                          validate: true,
                          validateSchema: formValidationSchema,
                          validationOnChange: true,
                        },
                      );
        /// Hiiting the Api to to save data /////////
        
        
             async function addTable(data) {
        
              // console.log(data,"data from modal is ");
                const req = {
            
                  data: {
                    vid:1,
                    eid:2,
                    name: data?.name,
                    no_of_seats: data?.no_of_seats,
                    minimum_order: data?.minimum_order,
                  },
            
                };
            // console.log(req,"req is ======>>>")
            //  await   postAddVenue(req)
            //       .then((res) => {
            //         // console.log(res)
                    
                
                    
            //         toast.success("Venue is added Succesfully!");
            //         setTimeout(() => {
            //           window.location.href="/"
            //         }, 3000);
                  
            //       })
            //       .catch((err) => {
            //         console.error(err);
            //         toast.error("Something Went Wrong!");
            //       });
              }
             
        
        
    
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
              overflow: 'auto',
            },
           
          }}
        >
          <h2>Modal Content</h2>
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
                   Add Section
                  </Text>
                  
                </div>
              

                </div>
               
                
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                        name="input"
                        placeholder=" Section Name"
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

                  {/* {/ Add more input fields as needed /} */}
                </div>
               
                <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                  <Input
                    name="input"
                    placeholder="Price "
                    className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
                    wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                    type="number"
                    onChange={(e) => {
                      form.handleChange("price", e);
                    }}
                    errors={form?.errors?.price}
                    value={form?.values?.price}
                    style={{color:"white"}}
                   
                    size="md"
                    variant="fill"
                  />
                  {/* {/ Add more input fields as needed /} */}
                </div>
              
                
                

                <div className="flex flex-col items-start justify-start w-full mt-20">
                  <Button
                    className="common-pointer cursor-pointer font-bold leading-[normal] min-w-[459px] sm:min-w-full text-center text-xl w-full"
                    shape="round"
                    size="md"
                    variant="gradient"
                    color="blue_600_indigo_900"
                    // onClick={() => {
                    //   form.handleSubmit(addvenue);
                    // }}
                  >
                    Add 
                  </Button>
                </div>
              </div>
            </div>
          </div>


          </div>
        
     
      <ToastContainer />
        </Modal>
      )
}

export default Section;



// Modal.js
// import React,{useEffect,useState} from 'react';
// import Modal from 'react-modal';
// import { Button, Img, Line, List, Text } from "components";
// import { getVenue } from 'service/api';
// import Cookies from 'js-cookie';

// const ListModal = ({ isOpen, onRequestClose }) => {
//     const [loading, setLoading] = useState(false);
//     const [venueList, setVenueList] = useState([]);
//  const list=async()=>{
//     const req = {};
      
//     await getVenue(req)
//       .then((res) => {
//         setVenueList(res.data.data);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }
  

// useEffect(()=>{
//  list();

// },[])



// const handleListItemClick = (venueId) => {
//     // Update the cookie with the clicked venueId
//     Cookies.set('venueId', venueId);

//     // Handle other actions if needed
//     console.log(`List item clicked: ${venueId}`);
//     window.location.href = "/";
//     // Add your logic here, e.g., navigate to a different page
//   };
 







// console.log(venueList,"list is ")



//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       contentLabel="Example Modal"
//       style={{
//         overlay: {
//           backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         },
//         content: {
//           top: '50%',
//           left: '50%',
//           right: 'auto',
//           bottom: 'auto',
//           marginRight: '-50%',
//           transform: 'translate(-50%, -50%)',
//           background: 'none',
//           border: 'none',
//           padding: 0,
//           overflow: 'auto',
//         },
       
//       }}
//     >
//       <h2>Modal Content</h2>
//       <div style={{ height: '700px',width:'900px' /* Add a specific height to trigger scrolling */ }}>
//       <div className="bg-blue_gray-900_01 flex flex-col font-poppins  justify-start sm:px-5 px-[26px] rounded shadow-bs1 w-full">
//                         <div className="flex flex-col gap-10  justify-start py-9 w-full">
                         
                      
//                           <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between mb-[33px] w-full">
//                           {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <List
//           className="flex-1 sm:flex-col flex-row gap-[31px] grid md:grid-cols-1 grid-cols-2 w-full"
//           orientation="horizontal"
//         >
//           {venueList.map((item) => (
//             <div
//               key={item.id}
//               className="bg-black-900_11 border border-blue_gray-800 border-solid cursor-pointer  hover:bg-gray-700 flex flex-1 sm:flex-col flex-row gap-[21px] items-center justify-start sm:ml-[0] mx-0 p-2.5 shadow-bs transition duration-300 hover:bg-blue_gray-700 hover:border-blue_gray-600"
//               onClick={() => handleListItemClick(item.id)}
//             >
//               {/* <Img
//                 className="sm:flex-1 h-[151px] md:h-auto object-cover w-[21%] sm:w-full"
//                 src={item.thumbnailUrl}
//                 alt={`Photo ${item.id}`}
//               /> */}

//                   <Img
//                                   className="sm:flex-1 h-[151px] md:h-auto object-cover w-[21%] sm:w-full"
//                                   src="images/img_rectangle63.png"
//                                   alt="rectangleSixtyThree"
//                                 />

//               <div className="flex flex-col items-start justify-start">
//                 <Text
//                   className="sm:text-[19px] md:text-[21px] text-[23px] text-white-A700"
//                   size="txtPoppinsSemiBold23"
//                 >
//                   {item.name}
//                 </Text>
//                 <Text
//                   className="text-lg text-white-A700"
//                   size="txtPoppinsMedium18"
//                 >
//                   {item.email}
//                 </Text>
//                 <Text
//                   className="mt-3.5 text-sm text-white-A700"
//                   size="txtPoppinsRegular14"
//                 >
//                   {item.albumId}
//                 </Text>
//               </div>
//             </div>
//           ))}
//         </List>
//       )}
    
                           
//                           </div>
//                         </div>
//                       </div>
//       <button onClick={onRequestClose}>Close Modal</button>
//       </div>
//     </Modal>
//   );
// };

// export default ListModal;
