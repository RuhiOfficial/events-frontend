import React, { useState, useMemo, useEffect } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import { getBookingList ,getEvent,getRecurringEvent} from 'service/api';
import { Button,Text ,Img} from 'components';
import '../Custom.css';
import { css } from '@emotion/react';
import { ScaleLoader } from 'react-spinners';
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import DeleteEvent from 'pages/DeleteEvent';
import DeleteRecurringEvent from 'pages/DeleteRecurringEvent';
import EditRecurringEvent from 'pages/EditRecurringEvent';
import { stubTrue } from 'lodash';



const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;



const RecurringEvents = () => {
    const storedVenueId = localStorage.getItem('Venue');
    const [venueId, setVenueId] = useState(storedVenueId)
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true)
   const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editEventId, setEditEventId] = useState();




  

 

  const openDeleteModal = (eventId) => {
    setDeleteEventId(eventId)
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteEventId(null)
    setIsDeleteOpen(false);
    // section();
  };

  const openEditModal = (eventId) => {
    console.log("opennnnnnnn======>>>>>")
    setEditEventId(eventId)
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setEditEventId(null)
    setIsEditOpen(false);
    // section();
  };


  // const cardStyles = {
  //   boxShadow: '0 0 20px rgba(255, 105, 180, 0.8)', // Bright pink shadow
  //   borderRadius: '8px',
  //   padding: '16px',
  //   backgroundColor:'transparent'
  //   // Set the desired background color
  //   // Other styling properties...
  // };

  useEffect(() => {
    const fetchData=async()=>{
      
    const req = { 
        data:{venue_id:venueId }};
  
      try {
        const res = await getRecurringEvent(req);
        console.log(res.data,"list of events on the bases of venue id ")
        
        setData(res.data.data);
       
        setIsLoading(false);
         
        }
  
        
      
      catch (error) {
        console.error('Error fetching data:', error);
      }
    
    }
    fetchData()
},[]
)
const formatReadableDate = (isoDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(isoDate).toLocaleDateString('en-US', options);
  };

  const columns = useMemo(
    () => [
      { Header: 'EVENT', accessor: 'name' },
      {
        Header: 'IMAGE',
        accessor: 'featured_image',
        Cell: ({ row }) => (
          <img
            src={row.original.featured_image} // Assuming 'featured_image' is the property containing the image URL
            alt={`Image for event ${row.original.name}`}
            style={{ width: '150px', height: '150px',marginRight: '10px', display: 'block', margin: 'auto'}}
          />
        ),
      },
    
      { Header: 'START DATE', accessor: 'date_from', Cell: ({ row }) => formatReadableDate(row.original.date_from) },
   
       {
        Header: 'TIME',
        accessor: 'time_from',
        Cell: ({ row }) => {
          const time = `${row.original.time_from} - ${row.original.time_to}`;
          return <span>{time}</span>;
        },
      },
      { Header: 'ORGANISER', accessor: 'event_organiser' },
      { Header: 'STATUS', accessor: 'event_status' },
      {
        Header: 'ACTION',
        accessor: 'id', // Assuming 'id' is the property containing the event ID
        Cell: ({ value }) => (
          
           <div className="flex items-center justify"  style={{ marginRight: '10px', display: 'block', margin: 'auto'}}>
            {/* <Button
            // onClick={() => handleButtonClick(value)}
            className="your-button-styles"
            color="your-button-color"
          >
            Click Me
          </Button> */}
           <button className="mx-2 text-[white] hover:text-blue-700 text-[25px]"  onClick={()=>{
 openEditModal(value)
           }   
           }>
             <MdEdit />
           </button>
           <button className="mx-2 text-[white] hover:text-red-700 text-[25px]" onClick={()=>{
            openDeleteModal(value)
           }}>
           <RiDeleteBin5Fill />
           </button>
           
         
           {/* <AddTable isTableOpen={isTableOpen} onRequestTableClose={closeTableModal} />
           <DeleteSection isOpen={isDeleteOpen} onRequestClose={closeDeleteModal} sectionId={deleteSectionId}/>
           <EditSection isOpen={isEditSectionOpen} onRequestClose={closeEditSectionModal} sectionId={editSectionId} /> */}
           </div>
        ),
      },
      // Add more columns as needed
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    pageIndex: currentPageIndex,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    setGlobalFilter: setTableGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    usePagination
  );

  const pageIndex = currentPageIndex !== undefined ? currentPageIndex : 0;

  const handleGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value);
    setTableGlobalFilter(e.target.value);
  };

  const filteredData = useMemo(
    () =>
      data.filter((row) =>
        columns.some(
          (column) =>
            row[column.id] !== undefined &&
            String(row[column.id]).toLowerCase().includes(globalFilter.toLowerCase())
        )
      ),
    [data, columns, globalFilter, pageIndex]
  );
  console.log(data,"data coming from the bookings ")

  return (

    <div className="flex flex-col font-roboto items-center justify-start mx-auto w-full">
    <div  className="backdrop-opacity-[0.5] bg-gray-900  flex flex-col items-center justify-end   w-full">
    <div   className="flex md:flex-col flex-row  items-start justify-between mx-auto md:px-5 w-full">
    
      {isLoading ? (
        <div style={{ display: 'flex', flexDirection:"column", justifyContent: 'center', alignItems: 'center', height: 'auto', width:"100%", margin:"20px"}}>
          <ScaleLoader css={override} color={'#5051f9'} loading={isLoading} />
          <h1 style={{color:'#5051f9', fontSize:"20px"}}> Loading!</h1>
        </div>
      ) : ( 
          data.length!==0?(
            <div  className="bg-blue_gray-900_01 flex flex-col font-poppins  justify-start sm:px-5 px-[26px] rounded shadow-bs1 m-10 w-full">
      <div className="flex-1 overflow-x-auto  ">
        <div className='grid gap-x-8 gap-y-4'>


        <div className='flex flex-row m-10 '>
        <Button
        id="generalEventsButton"
        className="cursor-pointer font-inter font-semibold leading-[normal] min-w-[128px] rounded-lg text-center text-sm mr-10"
        color="indigo_A400"
        size="sm"
        onClick={() => {
          window.location.href = '/AllEvents';
        }}
      >
        General Events
      </Button>

      <Button
        id="recurringEventsButton"
        className="cursor-pointer font-inter font-semibold leading-[normal] min-w-[128px] rounded-lg text-center text-sm bg-[green] text-[white]"
        
        size="sm"
        onClick={() => {
          window.location.href = '/RecurringEvents';
        }}
      >
        Recurring Events
      </Button>
     
  </div>

       
        <div className="flex flex-row font-poppins booking_serch items-center justify-between mt-10 ">
          <Text
            className="text-[22px] sm:text-lg text-white-A700 md:text-xl "
            size="txtPoppinsSemiBold22"
          >
            Events 
          </Text>
          <div className="bg-transparent w-[200px]">
            <input
              type="text"
              value={globalFilter}
              onChange={handleGlobalFilterChange}
              placeholder="Search...."
              className="w-full p-2"
            />
          </div>
        </div>

        <table {...getTableProps()} className="w-full border-collapse bg-transparent text-white" style={{ color: 'white' }}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id} className="p-4 font-poppins">
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          
          <tbody {...getTableBodyProps()}>
            {filteredData.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="border-t border-[#626262] border-solid hover:bg-gray-700 bg-opacity-25 text-[14px]">
                  {row.cells.map((cell) => (
                    <td key={cell.column.id} {...cell.getCellProps()} className="p-4">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="border-t border-[#626262] border-solid hover:bg-gray-700 bg-opacity-25  text-[14px]">
                  {row.cells.map((cell) => (
                    <td key={cell.column.id} {...cell.getCellProps()} className="p-4 text-center justify-center">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex-shrink-0 p-4">
        <div className="pagination mt-4 mb-10 text-end">
      <Button
    className=" ml-3 mr-3 cursor-pointer font-inter font-semibold leading-[normal] min-w-[128px] rounded-lg text-center text-sm "
    color="indigo_A400"
    size="sm"
    onClick={() => {previousPage()
      setIndex(index - 1)}}
      disabled={!canPreviousPage}
    > Previous
    
    </Button>
    
    {' '}
    <span style={{ color: 'white' }} className="ml-5 mr-5">
      Page{' '}
      <strong>
        {index + 1} of {pageOptions.length}
      </strong>{' '}
    </span>

    <Button
    className=" ml-3 mr-3 cursor-pointer font-inter font-semibold leading-[normal] min-w-[128px] rounded-lg text-center text-sm "
    color="indigo_A400"
    size="sm"
    onClick={() => {nextPage();
      setIndex(index + 1)}}
    disabled={!canNextPage}
    > Next
    
    </Button>
    
    {' '}
  </div>
        </div>
        </div>
      </div>
      <DeleteRecurringEvent isOpen={isDeleteOpen} onRequestClose={closeDeleteModal} eventId={deleteEventId} />
      <EditRecurringEvent isOpen={isEditOpen} onRequestClose={closeEditModal} eventId={editEventId} />

    </div>
    
    ):
      <div style={{ display: 'flex', flexDirection:"column", justifyContent: 'center', alignItems: 'center', height: '350px', width:"100%"}}>
      
      <h1 className='messages'> No Bookings Available For This Venue!</h1>
    </div>
  
    
    
    
    
    
    
    
    )
    
    
    
    
    }




</div>
 
    </div>
    
    </div>
  );
};

export default RecurringEvents;
