import React from "react";

const sizeClasses = {
  txtInterSemiBold36: "font-inter font-semibold",
  txtPoppinsBold32: "font-bold font-poppins",
  txtPoppinsRegular14: "font-normal font-poppins",
  txtPoppinsLight10: "font-light font-poppins",
  txtPoppinsRegular16: "font-normal font-poppins",
  txtPoppinsSemiBold14: "font-poppins font-semibold",
  txtPoppinsSemiBold15: "font-poppins font-semibold",
  txtPoppinsRegular12: "font-normal font-poppins",
  txtPoppinsSemiBold16: "font-poppins font-semibold",
  txtRobotoRegular16: "font-normal font-roboto",
  txtPoppinsMedium32: "font-medium font-poppins",
  txtRubikRomanMedium16: "font-medium font-rubik",
  txtPoppinsSemiBold32: "font-poppins font-semibold",
  txtPoppinsSemiBold22: "font-poppins font-semibold",
  txtPoppinsSemiBold23: "font-poppins font-semibold",
  txtPoppinsSemiBold12: "font-poppins font-semibold",
  txtRobotoRegular16WhiteA70087: "font-normal font-roboto",
  txtInterRegular14: "font-inter font-normal",
  txtPoppinsMedium18: "font-medium font-poppins",
  txtOpenSans12: "font-normal font-opensans",
};

const Text = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
