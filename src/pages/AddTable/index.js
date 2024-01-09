import React,{useEffect,useState} from 'react';
import Modal from 'react-modal';
import * as yup from "yup";
import { Button, Input, Text,SelectBox ,Img} from "components";
import useForm from "hooks/useForm";
import {  ToastContainer,toast } from "react-toastify";
import { getSection,postTable } from 'service/api';

function AddTable({ isTableOpen, onRequestTableClose }) {
    const [selectedSection,setSelectedSection]=useState(null);
    const [sectionList,setSectionList]=useState([]);
     const venueId= localStorage.getItem('Venue')
     

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


             useEffect(()=>{
                section();
             },[])         
   ///////////Sections///////////////

const handleSectionChange = (selectedOption) => {

    setSelectedSection(selectedOption);
    
  };
  
  async function section() {
    
    const req = { 
      // data:{venue_id:venueId }
    };
  
    await getSection(req)
      .then((res) => {
        
        
  
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
        console.log(options)
       setSectionList(options)
        
      })
      .catch((err) => {
        console.error(err);
      });
  }
  




        /// Hiiting the Api to to save data /////////
        
        
             async function addTable(data) {
        
              // console.log(data,"data from modal is ");
                const req = {
            
                  data: {
                    venue_id:venueId,
                    section_id:selectedSection,
                    table_name: data?.name,
                    no_of_seats: data?.no_of_seats,
                    minimum_order: data?.minimum_order,
                  },
            
                };
           
             await   postTable(req)
                  .then((res) => {
                    
                    
                
                    
                    toast.success("Table is added Succesfully!");
                    setTimeout(() => {
                      window.location.href="/reservation"
                    }, 3000);
                  
                  })
                  .catch((err) => {
                    console.error(err);
                    toast.error("Something Went Wrong!");
                  });
              }
             
    
  return (
    <Modal
          isOpen={isTableOpen}
          onRequestClose={onRequestTableClose}
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
                            Add Table 
                           </Text>
                           
                         </div>
                       
         
                         </div>
                                                                                                                                                         
                         <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                <SelectBox
                   className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full common-pointer border border-solid w-full bg-[#292e34] p-[18px] text-white-A700"
                   placeholderClassName="text-gray-600"
                   isMulti={false}
                   name="country"
                 options={sectionList}
                   isSearchable={true}
                   placeholder="Select Section..."
                   onChange={handleSectionChange}
                
                 />
                </div>
                         <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                           <Input
                                 name="input"
                                 placeholder=" Table Name"
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
                             placeholder="No Of Seats "
                             className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
                             wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                             type="number"
                             onChange={(e) => {
                               form.handleChange("no_of_seats", e);
                             }}
                             errors={form?.errors?.["no_of_seats"]}
                             value={form?.values?.["no_of_seats"]}
                             style={{color:"white"}}
                            
                             size="md"
                             variant="fill"
                           />
                           {/* {/ Add more input fields as needed /} */}
                         </div>
                         <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                           <Input
                             name="input"
                             placeholder="Minimum Order"
                             className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
                             wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                             type="number"
                             onChange={(e) => {
                               form.handleChange("minimum_order", e);
                             }}
                             errors={form?.errors?.["minimum_order"]}
                             value={form?.values?.["minimum_order"]}
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
                             onClick={() => {
                               form.handleSubmit(addTable);
                             }}
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

export default AddTable;






