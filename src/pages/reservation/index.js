// Import necessary libraries and styles
import React, { useMemo,useEffect,useState } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import { matchSorter } from 'match-sorter';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import { Button ,Text} from 'components';
import Section from 'pages/Section';
import AddTable from 'pages/AddTable';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DeleteSection from 'pages/DeleteSection';
import EditSection from 'pages/EditSection';
import { getSectionList } from 'service/api';


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
  const [isEditSectionOpen, setIsEditSectionOpen] = useState(false);
  const [editSectionId, setEditSectionId] = useState(null);
  const [deleteSectionId, setDeleteSectionId] = useState();

  const [sectionsData, setSectionsData] = useState(sections);
  const [tableList,setTableList]=useState([])

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
  
  const openDeleteModal = (sectionId) => {
    setDeleteSectionId(sectionId)
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteSectionId(null)
    setIsDeleteOpen(false);
  };

  const openEditSectionModal = (sectionId) => {
    
    setEditSectionId(sectionId)
    setIsEditSectionOpen(true);
  };

  const closeEditSectionModal = () => {
    setEditSectionId(null)
    setIsEditSectionOpen(false);
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
     venue_id:5,
   }
 };

 await getSectionList(req)
  .then((res) => {
    console.log(res, "response from Reservation is ===>>");

    // Adjust this part based on the actual structure of your API response
    if (res.data && Array.isArray(res.data)) {
      const sectionsMap = new Map();

      res.data.forEach((item) => {
        console.log(item); // Log the current item to inspect its structure

        if (
          item &&
          typeof item.section_id !== 'undefined' &&
          typeof item.section_name !== 'undefined' &&
          item.tables &&
          Array.isArray(item.tables)
        ) {
          // Check if the section already exists in the map
          if (!sectionsMap.has(item.section_id)) {
            // If not, create a new section
            sectionsMap.set(item.section_id, {
              id: item.section_id,
              sectionName: item.section_name,
              tables: [],
            });
          }

          // Add the table to the corresponding section
          sectionsMap.get(item.section_id).tables.push(
            ...item.tables.map((table) => ({
              id: table.id,
              tableName: table.table_name,
            }))
          );
        } else {
          console.error('Invalid data structure in the item:', item);
        }
      });

      // Convert the map values to an array
      const options = Array.from(sectionsMap.values());

      // Optionally, you can sort the sections by id
      options.sort((a, b) => a.id - b.id);

      console.log(options);

      setTableList(options);
    } else {
      console.error('Invalid data structure in the API response.');
    }
  })
  .catch((err) => {
    console.error(err);
  });




}

 
 
 
 console.log(tableList,"list from the reservation is as follows===>>")
 



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
      <div className="mx-auto mt-8">
        {sectionsData.map((section) => (
          <div key={section.id} className="flex items-center justify-between p-4 grey-border mb-4">
            <div>
              <h2 className="text-lg font-bold white">{section.sectionName}</h2>
              <Droppable droppableId={section.id.toString()} direction="horizontal">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="flex mt-2 white ">
                    {section.tables.map((table, index) => (
                      <DraggableTableName
                        key={index}
                        name={table}
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

<button className="mx-2 text-blue-500 hover:text-blue-700" onClick={()=>{openEditSectionModal(section.id)}}>
  <span role="img" aria-label="Edit" >
    ✏️
  </span>
</button>
<button className="mx-2 text-red-500 hover:text-red-700 " onClick={()=>{openDeleteModal(section.id)}}>
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
<DeleteSection isOpen={isDeleteOpen} onRequestClose={closeDeleteModal} sectionId={deleteSectionId}/>
<EditSection isOpen={isEditSectionOpen} onRequestClose={closeEditSectionModal} sectionId={editSectionId} />
</div>

            </div>
          </div>
        ))}
      </div>
    </DragDropContext>
    </div>
   
  );
}

export default Reservartion


