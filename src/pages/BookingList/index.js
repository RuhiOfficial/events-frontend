import React, { useState, useMemo } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import { Text } from "components";
import "../Custom.css"

const BookingList = ({ columns, data }) => {
  console.log(data,"data from booking page is ====>>")
  const [globalFilter, setGlobalFilter] = useState('');

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    pageIndex,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    
    setGlobalFilter: setTableGlobalFilter, // Renamed to avoid conflicts
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex:0, pageSize: 5 },
    },
    useGlobalFilter,
    usePagination
  );

  const handleGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value);
    setTableGlobalFilter(e.target.value); // Apply global filter to the table
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
    [data, columns, globalFilter,data, columns, globalFilter, pageIndex]
  );
  console.log(pageIndex,"index is ==>>")
  return (
    <div className="flex w-full">
      <div className="flex-1 overflow-x-auto">
      <div className="flex flex-row font-poppins booking_serch items-center justify-between">
                              <Text
                                className="text-[22px] sm:text-lg text-white-A700 md:text-xl"
                                size="txtPoppinsSemiBold22"
                              >
                                Bookings
                              </Text>
                              <div className="bg-transparent  w-[200px]">
          <input
            type="text"
            value={globalFilter}
            onChange={handleGlobalFilterChange}
            placeholder="Search...."
            className="w-full p-2"
          />
        </div>
                            </div>
      
        <table {...getTableProps()} className="w-full border-collapse bg-transparent text-white" style={{color:"white"}}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id} className="p-4">
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
                <tr {...row.getRowProps()} className="border-t hover:bg-gray-700  ">
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
                <tr {...row.getRowProps()} className="border-t hover:bg-gray-700 text-sm">
                  {row.cells.map((cell) => (
                    <td key={cell.column.id} {...cell.getCellProps()} className="p-4 text-center">
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
        {/* {page.length > 0 && (
  <div className="pagination mt-4 text-end">
    <button
      onClick={() => previousPage()}
      disabled={!canPreviousPage}
      className="px-3 py-2 bg-[#5051f9]"
      style={{ color: 'white' }}
    >
      Previous
    </button>{' '}
    <span style={{ color: 'white' }} className="ml-5 mr-5">
      Page{' '}
      <strong>
        {pageIndex + 1} of {pageOptions.length}
      </strong>{' '}
    </span>
    <button
      onClick={() => nextPage()}
      disabled={!canNextPage}
      className="px-3 py-2 bg-[#5051f9]"
      style={{ color: 'white' }}
    >
      Next
    </button>{' '}
  </div>
)} */}

        </div>
      </div>
      </div>

     
    </div>
  );
};

export default BookingList;
