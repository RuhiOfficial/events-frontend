import React, { useState, useMemo, useEffect } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import { getBookingList } from 'service/api';
import { Button,Text } from 'components';
import '../Custom.css';
import { css } from '@emotion/react';
import { ScaleLoader } from 'react-spinners';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;



const TicketReservations = () => {
    const storedVenueId = localStorage.getItem('Venue');
    const [venueId, setVenueId] = useState(storedVenueId)
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const cardStyles = {
    boxShadow: '0 0 20px rgba(255, 105, 180, 0.8)', // Bright pink shadow
    borderRadius: '8px',
    padding: '16px',
    backgroundColor:'transparent'
    // Set the desired background color
    // Other styling properties...
  };

  useEffect(() => {
    const loadBooking = async () => {
      const req = {
        data: {
          venue_id: venueId,
        },
      };
      try {
        const res = await getBookingList(req);
        setData(res.data.data);
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    loadBooking();
  }, [venueId]);

  const columns = useMemo(
    () => [
      { Header: 'EVENT', accessor: 'event_name' },
      {
        Header: 'NAME',
        accessor: 'first_name',
        Cell: ({ row }) => {
          const fullName = `${row.original.first_name} ${row.original.last_name}`;
          return <span>{fullName}</span>;
        },
      },
      { Header: 'EMAIL', accessor: 'email' },
      { Header: 'CONTACT NO', accessor: 'phone' },
      { Header: 'SECTION', accessor: 'section' },
      { Header: 'GUEST COUNT', accessor: 'no_of_seats' },
      { Header: 'ARRIVAL TIME', accessor: 'arrival_time' },
      { Header: 'BOOKING NOTES', accessor: 'booking_note' },
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
    <div  style={cardStyles} className="backdrop-opacity-[0.5] bg-gray-900  flex flex-col items-center justify-end   w-full">
    <div   className="flex md:flex-col flex-row  items-start justify-between mx-auto md:px-5 w-full">
    
      {isLoading ? (
        <div style={{ display: 'flex', flexDirection:"column", justifyContent: 'center', alignItems: 'center', height: 'auto', width:"100%", margin:"20px"}}>
          <ScaleLoader css={override} color={'#5051f9'} loading={isLoading} />
          <h1 style={{color:'#5051f9', fontSize:"20px"}}> Loading!</h1>
        </div>
      ) : ( 
          data.length!==0?(
            <div  style={cardStyles} className="bg-blue_gray-900_01 flex flex-col font-poppins  justify-start sm:px-5 px-[26px] rounded shadow-bs1 m-10 w-full">
      <div className="flex-1 overflow-x-auto  ">
        <div className='grid gap-x-8 gap-y-4'>

     
        <div className="flex flex-row font-poppins booking_serch items-center justify-between mt-10 ">
          <Text
            className="text-[22px] sm:text-lg text-white-A700 md:text-xl "
            size="txtPoppinsSemiBold22"
          >
            Bookings
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
    </div>):
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

export default TicketReservations;
