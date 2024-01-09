import React ,{useState} from "react";

import { Text } from "components";

const DashboardDatepicker = (props) => {
const[customDate,setCustomDate]=useState();
  useEffect(() => {
    // Convert the given date string to a JavaScript Date object
    const rawDate= props?.selecteddate;
    const dateObject = new Date(rawDate);

    // Format the date according to the desired format: Sun, Dec 02, 2023
    const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
    const formattedDateString = dateObject.toLocaleDateString('en-US', options);

    // Update the state with the formatted date
    setCustomDate(formattedDateString);
  }, [props.selecteddate]);




console.log(customDate)
  return (
    <>
      <div className={props.className}>
        <div className="flex flex-col items-center justify-start p-0.5 rounded-[10px] w-full">
          <div className="flex flex-col items-center justify-start w-full">
            <div className="flex flex-col items-start justify-start p-[11px] w-full">
              <Text
                className="ml-0.5 md:ml-[0] text-base text-white-A700_87"
                size="txtRobotoRegular16WhiteA70087"
              >
                {customDate}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

DashboardDatepicker.defaultProps = { selecteddate: "Select Date" };

export default DashboardDatepicker;
