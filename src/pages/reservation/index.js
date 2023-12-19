// Import necessary libraries and styles
import React, { useMemo,useEffect,useState } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import { matchSorter } from 'match-sorter';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import { Button ,Text} from 'components';
import Section from 'pages/Section';
import AddTable from 'pages/AddTable';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DeleteTable from 'pages/DeleteTable';


const sections = [
  {
    id: 1,
    sectionName: 'Section 1',
    tables: ['Table 1', 'Table 2', 'Table 3'],
  },
  {
    id: 2,
    sectionName: 'Section 2',
    tables: ['Table 4', 'Table 5', 'Table 6'],
  },
  // Add more sections as needed
];


function Reservartion() {
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [isTableOpen, setIsTableOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [sectionsData, setSectionsData] = useState(sections);

    const onDragEnd = (result) => {
      if (!result.destination) {
        return;
      }
  
      const updatedSections = [...sectionsData];
      const sourceSection = updatedSections.find((section) => section.id.toString() === result.source.droppableId);
      const destinationSection = updatedSections.find((section) => section.id.toString() === result.destination.droppableId);
  
      if (sourceSection && destinationSection) {
        const [movedTable] = sourceSection.tables.splice(result.source.index, 1);
        destinationSection.tables.splice(result.destination.index, 0, movedTable);
  
        setSectionsData(updatedSections);
      }
    };
  
  
  



  const openModal = () => {
    setIsSectionOpen(true);
  };

  const closeModal = () => {
    setIsSectionOpen(false);
  };
  const openTableModal = () => {
    setIsTableOpen(true);
  };

  const closeTableModal = () => {
    setIsTableOpen(false);
  };
  
  const openDeleteModal = () => {
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  };



  const DraggableTableName = ({ name, index }) => {
        return (
          <Draggable draggableId={name} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="cursor-move inline-block bg-[#5051f9] text-white p-2 rounded mr-2"
              >
                {name}
              </div>
            )}
          </Draggable>
        );
      };


  return (
    <div className='p-[50px] m-[50px] bg-[#1f2327]'>
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

    <Section isOpen={isSectionOpen} onRequestClose={closeModal} />
    </div>
    </div>
     
    <DragDropContext onDragEnd={onDragEnd}>
           <div className=" mx-auto mt-8 ">
        {sectionsData.map((section) => (
          <div key={section.id} className="flex items-center justify-between p-4 grey-border mb-4">
<div>
<h2 className="text-lg font-bold white">{section.sectionName}</h2>
<Droppable droppableId={section.id.toString()} direction="horizontal">
{(provided) => (
<div ref={provided.innerRef} {...provided.droppableProps} className="flex mt-2 white ">
{section.tables.map((table, index) => (
<DraggableTableName key={index} name={table} index={index} />
))}
{provided.placeholder}
</div>
)}
</Droppable>
</div>
            <div className="flex items-center justify">

              <button className="mx-2 text-blue-500 hover:text-blue-700">
                <span role="img" aria-label="Edit">
                  ✏️
                </span>
              </button>
              <button className="mx-2 text-red-500 hover:text-red-700 "onClick={openDeleteModal}>
                <span role="img" aria-label="Delete">
                  🗑️
                </span>
              </button>
             
              <button className="mx-2 text-green-500 hover:text-green-700" onClick={openTableModal}>
                <span role="img" aria-label="Add">
                  ➕
                </span>
              </button>
              <AddTable isTableOpen={isTableOpen} onRequestTableClose={closeTableModal} />
              <DeleteTable isOpen={isDeleteOpen} onRequestClose={closeDeleteModal} />
</div>
</div>
))}
</div>
</DragDropContext>
    </div>
   
  );
}

export default Reservartion


