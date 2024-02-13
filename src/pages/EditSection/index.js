import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import * as yup from 'yup';
import { Button, Input, Text } from 'components';
import { updateSection, sectionById,deleteTable } from 'service/api';
import { ToastContainer, toast } from 'react-toastify';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { css } from '@emotion/react';
import { ScaleLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


function EditSection({ isOpen, onRequestClose, sectionId }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [hoveredButtonIndex, setHoveredButtonIndex] = useState(null);
  const [tableList, setTableList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    loadSection();
  }, [sectionId]);

  async function editSection() {
    // Check if both name and price are defined
    if (name === undefined || price === undefined) {
     
      return;
    }

    const req = {
      data: {
        id: sectionId,
        name: name,
        price: price,
      },
    };

    try {
      const res = await updateSection(req);
      console.log(res);

      toast.success('Section is updated Successfully!');
      setTimeout(() => {
        onRequestClose();
        setName("");
        setPrice("");
        // window.location.href = '/reservation';
      }, 3000);
    } catch (err) {
      console.error(err);
      toast.error('Something Went Wrong!');
    }
  }
  async function handleDeleteButtonClick() {
    // Make your delete API call here
    if (hoveredButtonIndex !== null) {
      const vid=localStorage.getItem('Venue');
     const id = `${tableList[hoveredButtonIndex].id}`
  
      try {
        const res = await deleteTable({ data: { id:id} });
        toast.success("Table is deleted Succesfully!");
        loadSection()
  
        // Check if the response data is not empty
        
      } catch (err) {
        console.error(err);
      }
    
  
      








      // console.log(`Deleting section with ID: ${tableList[hoveredButtonIndex].id}`);
      // Add your delete API logic here
    }
    setHoveredButtonIndex(null);
  }
  async function loadSection() {
    setIsLoading(true)
    const vid=localStorage.getItem('Venue');
    

    try {
      
      const res = await sectionById({ data: { id: sectionId ,venue_id:vid} });
     
      
      
      if (res.data) {
        setIsLoading(false)
        // Update the state
       
        setName(res.data.data.name);
        setPrice(res.data.data.price);
        setTableList(res.data.data.tables)
        
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
     
      <div className="flex flex-col font-poppins items-center justify-start mx-auto w-full ">
        <div className="flex flex-col font-poppins items-center justify-start mx-auto w-full ">
          <div className="bg-no-repeat flex flex-col items-center justify-start p-10 md:p-5 w-full">
          {isLoading ? (
        <div style={{ display: 'flex', flexDirection:"column", justifyContent: 'center', alignItems: 'center', height: 'auto', width:"100%"}}>
          <ScaleLoader css={override} color={'#5051f9'} loading={isLoading} />
          
          <h1 style={{color:'#5051f9', fontSize:"20px"}}> Loading!</h1>
        </div>
      ) :(
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
                <Button className="modal-close" style={{color:"white",fontSize:"xx-large"}}  onClick={onRequestClose}>
            &times;
          </Button>

                </div>
          

              <div className="flex flex-col items-start justify-start mt-[38px] w-full">
              <input
                  name="Section Name"
                  placeholder=" Section Name"
                  className="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34] capitalize font-roboto p-0 placeholder-white-900 text-base text-left w-full h-[50px] pl-4 common-pointer border border-white border-solid w-full bg-[#292e34] "
                  
                  style={{ color: 'white' , borderColor:"white"}}
                  onChange={(e) => {
                    
                    setName(e.target.value);
                  }}
                  value={name}
                  size="md"
                  variant="fill"
                />
              </div>

              <div className="flex flex-col items-start justify-start mt-[38px] w-full">
                <input
                  name="price"
                  placeholder=" Price"
                  className="capitalize font-roboto p-0 placeholder-white-900 text-base text-left w-full h-[50px] pl-4 common-pointer border border-white-700_99 border-solid w-full bg-[#292e34] "
                  wrapClassName=" common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
                  style={{ color: 'white',borderColor:"white" }}
                  onChange={(e) => {
                     setPrice(e.target.value);
                  }}
                  value={price}
                  size="md"
                  variant="fill"
                />
              </div>

              <div className="flex flex-row items-start justify-start mt-[38px] w-full overflow-x-auto">
  <div className="flex space-x-4 ">
  {tableList.map((person, index) => (
            <div
              key={person.id}
              className="p-2 bg-[#5051f9] rounded-md shadow-md relative"
              onMouseEnter={() => setHoveredButtonIndex(index)}
              onMouseLeave={() => setHoveredButtonIndex(null)}
            >

             
              {hoveredButtonIndex === index? (
                 <Button
                 className="text-[20px] white"
                 onClick={handleDeleteButtonClick}><RiDeleteBin5Fill/></Button>
                // <div className="absolute top-0 right-0 p-2 bg-red-500 text-white rounded">
                //   <Button onClick={handleDeleteButtonClick}><RiDeleteBin5Fill/></Button>
                // </div>
              ): <Button
              className="text-sm white"
              onClick={() => console.log(person.id, 'clicked')}
            >
              {person.table_name}
            </Button>} 
            </div>
          ))}
  </div>
</div>




              <div className="flex flex-col items-start justify-start w-full mt-20">
                <Button
                  className="common-pointer cursor-pointer font-bold leading-[normal] min-w-[459px] sm:min-w-full text-center text-xl w-full"
                  shape="round"
                  size="md"
                  variant="gradient"
                  color="blue_600_indigo_900"
                  onClick={editSection}
                >
                  Update
                </Button>
              </div>
            </div>
      )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </Modal>
  );
}

export default EditSection;
