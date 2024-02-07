// DateRangePicker.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../pages/Custom.css'; // Custom styles for DateRangePicker

const CustomInput = ({ value, onClick }) => (
  <input
    type="text"
    value={value}
    onClick={onClick}
    readOnly
    placeholder="Select Date"
    className="rounded-md px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
  />
);

const DateRangePicker = ({ startDate, endDate, onChange }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    onChange(date, selectedEndDate);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
    onChange(selectedStartDate, date);
  };

  return (
    <div className="flex justify-between">
      <DatePicker
        selected={selectedStartDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={selectedStartDate}
        endDate={selectedEndDate}
        customInput={<CustomInput />}
        dateFormat="yyyy-MM-dd"
        showTimeInput={false}
      />
      <DatePicker
        selected={selectedEndDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={selectedStartDate}
        endDate={selectedEndDate}
        minDate={selectedStartDate}
        customInput={<CustomInput />}
        dateFormat="yyyy-MM-dd"
        showTimeInput={false}
      />
    </div>
  );
};

export default DateRangePicker;
