import React, { useState, useMemo, useEffect } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import { getBookingList } from 'service/api';
import { Text } from 'components';
import '../Custom.css';

const TicketReservations = () => {
    const storedVenueId = localStorage.getItem('Venue');
    const [venueId, setVenueId] = useState(storedVenueId)
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [index, setIndex] = useState(0);

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
        accessor: 'full_name',
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

  return (
    <div className='p-[50px] m-[50px] bg-[#1f2327]'>
    <div className="flex w-full">
      <div className="flex-1 overflow-x-auto  ">
        <div className='grid gap-x-8 gap-y-4'>

     
        <div className="flex flex-row font-poppins booking_serch items-center justify-between m-2 ">
          <Text
            className="text-[22px] sm:text-lg text-white-A700 md:text-xl"
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
          <div className="pagination mt-4 text-end">
            {page.length > 0 && (
              <div className="pagination mt-4 text-end">
                <button
                  onClick={() => {
                    previousPage();
                    setIndex(index - 1);
                  }}
                  disabled={!canPreviousPage}
                  className="px-3 py-2 bg-[#5051f9]"
                  style={{ color: 'white' }}
                >
                  Previous
                </button>{' '}
                <span style={{ color: 'white' }} className="ml-5 mr-5">
                  Page{' '}
                  <strong>
                    {index + 1} of {pageOptions.length}
                  </strong>{' '}
                </span>
                <button
                  onClick={() => {
                    nextPage();
                    setIndex(index + 1);
                  }}
                  disabled={!canNextPage}
                  className="px-3 py-2 bg-[#5051f9]"
                  style={{ color: 'white' }}
                >
                  Next
                </button>{' '}
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TicketReservations;
