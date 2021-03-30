import React from "react";

const Badge = ({ text, colour = "gray", className }) => {
  return (
    <span
      className={
        `px-2  bg-${colour}-100 text-${colour}-700 bg-opacity-90 rounded-lg w-min ` +
        className
      }
    >
      {text}
    </span>
  );
};

export default Badge;
