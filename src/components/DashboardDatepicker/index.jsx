import React from "react";

import { Text } from "components";

const DashboardDatepicker = (props) => {
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
                {props?.selecteddate}
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
