import React from "react";

export const Heading = ({ title, subtitle }) => {
  return (
    <div className="w-full sm:p-4 px-4 mb-6">
      <h1 className="title-font font-medium text-xl mb-2 text-black dark:text-white">
        {title}
      </h1>
      <div className="leading-relaxed">{subtitle}</div>
    </div>
  );
};
