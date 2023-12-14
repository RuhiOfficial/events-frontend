
// import React ,{useState,useEffect} from 'react';
// import * as yup from "yup";
// import { Button, Input, Text,SelectBox ,Img} from "components";
// import useForm from "hooks/useForm";
// import {  ToastContainer,toast } from "react-toastify";

// function Reservation() {
//     const formValidationSchema = yup.object().shape({
//               name: yup.string().required("Name is required"),
//               no_of_seats: yup.string().required("Seats count is required"),
//               minimum_order: yup.string().required("Minimum Order is required"),
//               });
        
//     const form = useForm(
//                 {
//                   name: "",
//                   no_of_seats: "",
//                   minimum_order: "",
                
//                 },
//                 {
//                   validate: true,
//                   validateSchema: formValidationSchema,
//                   validationOnChange: true,
//                 },
//               );
// /// Hiiting the Api to to save data /////////


//      async function addTable(data) {

//       // console.log(data,"data from modal is ");
//         const req = {
    
//           data: {
//             vid:1,
//             eid:2,
//             name: data?.name,
//             no_of_seats: data?.no_of_seats,
//             minimum_order: data?.minimum_order,
//           },
    
//         };
//     // console.log(req,"req is ======>>>")
//     //  await   postAddVenue(req)
//     //       .then((res) => {
//     //         // console.log(res)
            
        
            
//     //         toast.success("Venue is added Succesfully!");
//     //         setTimeout(() => {
//     //           window.location.href="/"
//     //         }, 3000);
          
//     //       })
//     //       .catch((err) => {
//     //         console.error(err);
//     //         toast.error("Something Went Wrong!");
//     //       });
//       }
     







  // return (
  //   <div>  
       
  //          {/* {/ Your modal content /} */}
  //          <div className="flex flex-col font-poppins items-center justify-start mx-auto w-full ">
           
  //          <div className="flex flex-col font-poppins items-center justify-start mx-auto w-full ">
  //            <div className="bg-no-repeat flex flex-col items-center justify-start p-10 md:p-5 w-full">
  //              <div className="bg-[#292e34] flex flex-col items-start justify-start max-w-[716px] p-[3.5rem] rounded-[24px] w-full ">
  //                <div className='text-center w-full flex justify-between items-center'>
  //                <div className="flex flex-col items-center justify-center w-[534px] sm:w-full">
  //                  <Text
  //                   className="md:text-3xl sm:text-[28px] text-[32px] text-white-A700 w-auto"
  //                   size="txtPoppins"
  //                 >
  //                  Add Table 
  //                 </Text>
                  
  //               </div>
              

  //               </div>
               
                
  //               <div className="flex flex-col items-start justify-start mt-[38px] w-full">
  //                 <Input
  //                       name="input"
  //                       placeholder=" Table Name"
  //                       className="capitalize font-roboto p-0  placeholder-white-900 text-base text-left w-full h-[50px] pl-4 "
  //                       wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
  //                       style={{color:"white"}}
  //                       onChange={(e) => {
  //                         form.handleChange("name", e);
  //                       }}
  //                       errors={form?.errors?.name}
  //                       value={form?.values?.name}
                      
  //                       size="md"
  //                       variant="fill"
  //               />

  //                 {/* {/ Add more input fields as needed /} */}
  //               </div>
               
  //               <div className="flex flex-col items-start justify-start mt-[38px] w-full">
  //                 <Input
  //                   name="input"
  //                   placeholder="No Of Seats "
  //                   className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
  //                   wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
  //                   type="number"
  //                   onChange={(e) => {
  //                     form.handleChange("no_of_seats", e);
  //                   }}
  //                   errors={form?.errors?.["no_of_seats"]}
  //                   value={form?.values?.["no_of_seats"]}
  //                   style={{color:"white"}}
                   
  //                   size="md"
  //                   variant="fill"
  //                 />
  //                 {/* {/ Add more input fields as needed /} */}
  //               </div>
  //               <div className="flex flex-col items-start justify-start mt-[38px] w-full">
  //                 <Input
  //                   name="input"
  //                   placeholder="Minimum Order"
  //                   className="capitalize font-roboto p-0 placeholder:text-white-900 text-base text-left w-full h-[50px] pl-4"
  //                   wrapClassName="common-pointer border border-white-700_99 border-solid w-full bg-[#292e34]"
  //                   type="number"
  //                   onChange={(e) => {
  //                     form.handleChange("minimum_order", e);
  //                   }}
  //                   errors={form?.errors?.["minimum_order"]}
  //                   value={form?.values?.["minimum_order"]}
  //                   style={{color:"white"}}
                   
  //                   size="md"
  //                   variant="fill"
  //                 />
  //                 {/* {/ Add more input fields as needed /} */}
  //               </div>
                
                

  //               <div className="flex flex-col items-start justify-start w-full mt-20">
  //                 <Button
  //                   className="common-pointer cursor-pointer font-bold leading-[normal] min-w-[459px] sm:min-w-full text-center text-xl w-full"
  //                   shape="round"
  //                   size="md"
  //                   variant="gradient"
  //                   color="blue_600_indigo_900"
  //                   // onClick={() => {
  //                   //   form.handleSubmit(addvenue);
  //                   // }}
  //                 >
  //                   Add 
  //                 </Button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>


  //         </div>
        
     
  //     <ToastContainer />
  //   </div>
    
  // )
// }

// export default Reservation




// Import necessary libraries and styles
import React, { useMemo,useEffect,useState } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import { matchSorter } from 'match-sorter';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import { Button ,Text} from 'components';
import Section from 'pages/Section';

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

// // Sample data
const data = [
  { id: 1, name: 'John Doe', age: 25, city: 'New York' },
  { id: 2, name: 'Jane Smith', age: 30, city: 'Los Angeles' },
  // Add more data as needed
];

// Define columns for the table
const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Name', accessor: 'name' },
  { Header: 'Age', accessor: 'age' },
  { Header: 'City', accessor: 'city' },
  // Add more columns as needed
];

// Define a global filter function
const globalFilterFunction = (rows, columns, filterValue) => {
  const filteredRows = matchSorter(rows, filterValue, {
    keys: columns.map((column) => column.id),
  });

  return filteredRows;
};

function Reservartion() {
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const openModal = () => {
    setIsSectionOpen(true);
  };

  const closeModal = () => {
    setIsSectionOpen(false);
  };
  // Create a table instance using react-table hooks
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    usePagination
  );

  // Destructure state for easier use
  const { globalFilter, pageIndex, pageSize } = state;

  // Memoize the filtered and paginated data for performance
  const memoizedData = useMemo(() => {
    return page;
  }, [page]);

  return (
    <div className='p-[50px] m-[50px] bg-[#1f2327]'>
      <div  className='flex justify-between items-center'>
      <Text
                    className="md:text-3xl sm:text-[25px] text-[20px] text-white-A700 w-auto"
                    size="txtPoppins"
                  >
                   TABLE
                  </Text>
             
      {/* Search Bar */}
    <div className='flex flex-row  items-start justify-end'>

    <input
        type="text"
        placeholder="Search..."
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="white  mb-4 p-2 border rounded-md bg-transparent "
      />
    <Button
    className=" ml-3 mr-3 cursor-pointer font-inter font-semibold leading-[normal] min-w-[128px] rounded-lg text-center text-sm "
    color="indigo_A400"
    size="sm"
    onClick={openModal}
    >
    Add Section
    </Button>
    <Section isOpen={isSectionOpen} onRequestClose={closeModal} />
    {/* <Button
    className="cursor-pointer font-inter font-semibold leading-[normal] min-w-[128px] rounded-lg text-center text-sm "
    color="indigo_A400"
    size="sm"
    // onClick={logout}
    >
    Add Table
    </Button> */}

    

    </div>
    </div>
     
    <div className=" mx-auto mt-8">
      {sections.map((section) => (
        <div key={section.id} className="flex items-center justify-between p-4 border mb-4 grey">
          <div>
            <h2 className="text-lg font-bold">{section.sectionName}</h2>
            <div className="flex mt-2">
              {section.tables.map((table) => (
                <span key={table.id} className="mr-4">
                  {table}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <button className="mx-2 text-blue-500 hover:text-blue-700">
              <span role="img" aria-label="Edit">
                ✏️
              </span>
            </button>
            <button className="mx-2 text-red-500 hover:text-red-700">
              <span role="img" aria-label="Delete">
                🗑️
              </span>
            </button>
            <button className="mx-2 text-green-500 hover:text-green-700">
              <span role="img" aria-label="Add">
                ➕
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>

    

      {/* Pagination */}
      {/* <div className="mt-4 flex justify-between items-center grey">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {Math.ceil(rows.length / pageSize)}
          </strong>{' '}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div> */}
    </div>
   
  );
}

export default Reservartion


