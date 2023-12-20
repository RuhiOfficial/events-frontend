
import React,{useEffect,useState} from 'react';
import Modal from 'react-modal';
import * as yup from "yup";
import { Button, Input, Text,SelectBox ,Img} from "components";
import useForm from "hooks/useForm";
import {  ToastContainer,toast } from "react-toastify";

import { updateSection,sectionById} from 'service/api';

function EditSection({ isOpen, onRequestClose,sectionId}) {

    const[response,setResponse]=useState([])



    useEffect(()=>{
    loadSection()
    },[sectionId])
  console.log(sectionId,"id coming from the edit page ")
    const formValidationSchema = yup.object().shape({
                      name: yup.string().required("Name is required"),
                      price: yup.string().required("Price count is required"),
                      
                      });
                
            const form = useForm(
                        {
                          name: "",
                          price:"",
                        
                        },
                        {
                          validate: true,
                          validateSchema: formValidationSchema,
                          validationOnChange: true,
                        },
                      );
        /// Hiiting the Api to to save data /////////
        
        
             async function editSection(data) {
        
              // console.log(data,"data from modal is ");
                const req = {
            
                  data: {
                    id:sectionId,
                    name: data?.name,
                    price: data?.price,
                    
                  },
            
                };
            console.log(req,"req is ======>>>")
             await   updateSection(req)
                  .then((res) => {
                    console.log(res)
                    
                
                    
                    toast.success("Section is updated Succesfully!");
                    setTimeout(() => {
                      window.location.href="/reservation"
                    }, 3000);
                  
                  })
                  .catch((err) => {
                    console.error(err);
                    toast.error("Something Went Wrong!");
                  });
              }



              async function loadSection() {
                try {
                  const res = await sectionById({ data: { id: sectionId } });
                  console.log("Fetched Data:", res.data);
              
                  // Check if the response data is not empty
                  if (res.data) {
                    setResponse(res.data);
              
                    // Set the form values after the response data is available
                    form.setValues({
                      name: res.data.name || "",
                      price: res.data.price || "",
                    });
                  }
                } catch (err) {
                  console.error(err);
                }
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
                   Edit Section
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
                        value={form?.values?.name || response.name}
                       
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
                    value={form?.values?.price || response.price}
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
                      form.handleSubmit(editSection);
                    }}
                  >
                    Edit
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

export default EditSection;



