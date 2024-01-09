import React, { useState } from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

const Timepicker = ({ value, onChange, placeholder,className }) => {
  // Convert string value to moment object
  

  return (
    <TimePicker
      onChange={onChange}
      value={value ? moment(value) : null}
      showSecond={false}
      format="h:mm A"
      use12Hours
      placeholder={placeholder}
      className={`custom-timepicker ${className}`}
    />
  );
};

export default Timepicker;