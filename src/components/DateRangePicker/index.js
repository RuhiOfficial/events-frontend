import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../pages/Custom.css'; // Custom styles for DateRangePicker

const DateRangePicker = ({ startDate, endDate, onChange, onReset }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);

  const CustomInputStartDate = ({ value, onClick }) => (
    <input
      type="text"
      value={value}
      onClick={onClick}
      readOnly
      placeholder="Start Date"
      className="rounded-md px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
    />
  );

  const CustomInputEndDate = ({ value, onClick }) => (
    <input
      type="text"
      value={value}
      onClick={onClick}
      readOnly
      placeholder="End Date"
      className="rounded-md px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
    />
  );

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    onChange(date, selectedEndDate);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
    onChange(selectedStartDate, date);
  };

  const resetDatePicker = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    // You can add additional reset logic if needed
    onReset();
  };

  useEffect(() => {
    // Reset the DateRangePicker when the modal is closed
    if (!startDate && !endDate) {
      resetDatePicker();
    }
  }, [startDate, endDate]);

  return (
    <div className="flex justify-between">
      <DatePicker
        selected={selectedStartDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={selectedStartDate}
        endDate={selectedEndDate}
        customInput={<CustomInputStartDate />}
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
        customInput={<CustomInputEndDate />}
        dateFormat="yyyy-MM-dd"
        showTimeInput={false}
      />
    </div>
  );
};

export default DateRangePicker;
