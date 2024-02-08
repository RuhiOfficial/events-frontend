


// Import necessary libraries and styles
import React, { useMemo,useEffect,useState } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import { matchSorter } from 'match-sorter';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import { Button ,Text,Img} from 'components';
import Section from 'pages/Section';
import AddTable from 'pages/AddTable';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DeleteSection from 'pages/DeleteSection';
import DeleteTable from 'pages/DeleteTable';
import EditSection from 'pages/EditSection';
import { getSectionList } from 'service/api';
import { css } from '@emotion/react';
import { ScaleLoader } from 'react-spinners';
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


const cardStyles = {
  boxShadow: '0 0 20px rgba(255, 105, 180, 0.8)', // Bright pink shadow
  borderRadius: '8px',
  padding: '16px',
  backgroundColor:'transparent'
  // Set the desired background color
  // Other styling properties...
};


function Reservation() {
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [isTableOpen, setIsTableOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditSectionOpen, setIsEditSectionOpen] = useState(false);
  const [editSectionId, setEditSectionId] = useState(null);
  const [deleteSectionId, setDeleteSectionId] = useState();
  
  const vid=localStorage.getItem('Venue')
  
  const [tableList,setTableList]=useState([])
  const [isLoading, setIsLoading] = useState(true);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
  
    const updatedSections = [...tableList];
    const sourceSection = updatedSections.find((section) => section && section.section_id && section.section_id.toString() === result.source.droppableId);
    const destinationSection = updatedSections.find((section) => section && section.section_id && section.section_id.toString() === result.destination.droppableId);
  
    if (sourceSection && destinationSection) {
      const [movedTable] = sourceSection.tables.splice(result.source.index, 1);
      destinationSection.tables.splice(result.destination.index, 0, movedTable);
  
      setTableList(updatedSections); // Update the state with the modified table list
    }
  };
  
  
  
  
  
  



  const openModal = () => {
    setIsSectionOpen(true);
  };

  const closeModal = () => {
    setIsSectionOpen(false);
    section();
  };
  const openTableModal = () => {
    setIsTableOpen(true);
  };

  const closeTableModal = () => {
    setIsTableOpen(false);
  };
  
  const openDeleteModal = (sectionId) => {
    setDeleteSectionId(sectionId)
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteSectionId(null)
    setIsDeleteOpen(false);
    section();
  };

  const openDeleteTableModal = (sectionId) => {
    setDeleteSectionId(sectionId)
    setIsDeleteOpen(true);
  };

  const closeDeleteTableModal = () => {
    setDeleteSectionId(null)
    setIsDeleteOpen(false);
    section();
  };

  const openEditSectionModal = (sectionId) => {
     console.log(sectionId,"coming as params")
    setEditSectionId(sectionId)
    setIsEditSectionOpen(true);
  };

  const closeEditSectionModal = () => {
    setEditSectionId(null)

    setIsEditSectionOpen(false);
    section();
  };


  



  const DraggableTableName = ({ name, index, onClick }) => {
    const handleClick = () => {
      onClick(index); // Pass the index or any necessary data to the onClick function
    };
  
    return (
      
      <Draggable draggableId={name} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`cursor-move inline-block ${
              snapshot.isDragging ? "opacity-50" : ""
            }`}
          >
            <div
              className="bg-[#5051f9] text-white p-2 rounded mr-2"
              onClick={handleClick}
            >
              {name}
            </div>
          </div>
        )}
      </Draggable>
    );
  };
  
  
   ///////////Table List///////////////
useEffect(()=>{
  section()
},[])

async function section() {
 const req = {
   data:{
     venue_id:25,
   }
 }
 await getSectionList(req)
  .then((res) => {
   

    // if (res.data && Array.isArray(res.data)) {
    //   const sectionsData = res.data.map((section) => {
    //     return {
    //       id: section.section_id,
    //       sectionName: section.section_name,
    //       tables: section.tables.map((table) => ({
    //         id: table.id,
    //         tableName: table.table_name,
    //       })),
    //     };
    //   });

    //   console.log(sectionsData); // Log the transformed data

      setTableList(res.data.data);
      setIsLoading(false)
    
  })
  .catch((err) => {
    console.error(err);
  });

}

 
 
 

 



  return (
    <div className="flex flex-col font-roboto items-center justify-start mx-auto w-full">
    <div  style={cardStyles} className="backdrop-opacity-[0.5] bg-gray-900  flex flex-col items-center justify-end   w-full">
    <div   className="flex md:flex-col flex-row  items-start justify-between mx-auto md:px-5 w-full">
    
    <div className='p-[18px] m-[40px] bg-[#1f2327] w-full' style={cardStyles}>
      <div  className='flex justify-between items-center'>
      <Text
                    className="md:text-3xl sm:text-[25px] text-[20px] text-white-A700 w-auto"
                    size="txtPoppins"
                  >
                   TABLE
                  </Text>
             
     
    <div className='flex flex-row  items-start justify-end'>

   
    <Button
    className=" ml-3 mr-3 cursor-pointer font-inter font-semibold leading-[normal] min-w-[128px] rounded-lg text-center text-sm "
    color="indigo_A400"
    size="sm"
    onClick={openModal}
    >
    Add Section
    </Button>
    <Button
    className=" ml-3 mr-3 cursor-pointer font-inter font-semibold leading-[normal] min-w-[128px] rounded-lg text-center text-sm "
    color="indigo_A400"
    size="sm"
    onClick={openTableModal}
    >
    Add Table
    </Button>

    <Section isOpen={isSectionOpen} onRequestClose={closeModal} />
    </div>
    </div>
    <ScaleLoader css={override} size={50} color={'#5051f9'} loading={isLoading} />
                          {!isLoading && (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="mx-auto mt-8">
        {tableList.map((section) => (
          <div key={section.section_id} className="flex items-center justify-between p-4 grey-border mb-4">
            <div>
              <h2 className="text-lg font-bold white">{section.section_name}</h2>
              <Droppable droppableId={section.section_id.toString()} direction="horizontal">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="flex mt-2 white">
            {section.tables.map((table, index) => (
              <DraggableTableName
                key={`${section.id}-${table.table_id}`}// Ensure a unique key
                name={table.table_name}
                index={index}
                
              
                onClick={() => {
                  console.log("table index is clicked ", index);
                }}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
            </div>
            <div className="flex items-center justify">
            <div className="flex items-center justify">

<button className="mx-2 text-[white] hover:text-blue-700 text-[25px]" onClick={()=>{openEditSectionModal(section.section_id)}}>
  <MdEdit />
</button>
<button className="mx-2 text-[white] hover:text-red-700 text-[25px]" onClick={()=>{openDeleteModal(section.section_id)}}>
<RiDeleteBin5Fill />
</button>


<AddTable isTableOpen={isTableOpen} onRequestTableClose={closeTableModal} />
<DeleteSection isOpen={isDeleteOpen} onRequestClose={closeDeleteModal} sectionId={deleteSectionId}/>
<EditSection isOpen={isEditSectionOpen} onRequestClose={closeEditSectionModal} sectionId={editSectionId} />
</div>

            </div>
          </div>
        ))}
      </div>
    </DragDropContext>
                          )}
    </div>
   </div></div></div>
  
  );
}

export default Reservation