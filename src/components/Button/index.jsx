import React from "react";
import PropTypes from "prop-types";

const shapes = { round: "rounded-[28px]" };
const variants = {
  gradient: {
    blue_600_indigo_900: "bg-gradient1  text-white-A700",
    blue_A400_indigo_900_01: "bg-gradient  text-white-A700",
  },
  fill: { indigo_A400: "bg-indigo-A400 text-white-A700" },
};
const sizes = { xs: "p-[5px]", sm: "p-[11px]", md: "p-3.5", lg: "p-[17px]" };

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape = "",
  size = "xs",
  variant = "fill",
  color = "",
  ...restProps
}) => {
  return (
    <button
      className={`${className} ${(shape && shapes[shape]) || ""} ${
        (size && sizes[size]) || ""
      } ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg"]),
  variant: PropTypes.oneOf(["gradient", "fill"]),
  color: PropTypes.oneOf([
    "blue_600_indigo_900",
    "blue_A400_indigo_900_01",
    "indigo_A400",
  ]),
};

export { Button };
