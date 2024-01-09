import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../pages/Custom.css'; // Custom styles for DateRangePicker
import { Placeholder } from 'react-bootstrap';
const Date = ({ startDate, onChange,placeholder }) => {

    const [selectedStartDate, setSelectedStartDate] = useState(startDate);
    console.log(placeholder,"coming placeholder ")

    const handleStartDateChange = (date) => {
      setSelectedStartDate(date);
      
      
    };
  
   
  
    return (
      
        <DatePicker
  selected={selectedStartDate}
  onChange={handleStartDateChange}
  selectsStart
  startDate={selectedStartDate}
  showMonthDropdown
  showYearDropdown
  placeholderText={placeholder}
  dateFormat="yyyy-MM-dd"
  className="rounded-l-md px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 flex-grow"
  showTimeInput={false}
  popperClassName="dark-popper" 

/>

    )









}
export default Date;