import React from "react";

/**
 * Make sure the splits are consistent, e.g. the education and
 * experience sections
 */
const Split = ({ left, right }) => {
  return (
    <div className="flex flex-row flex-wrap mb-10 md:mb-4 px-4 w-full">
      <div className="flex md:w-4/12 lg:w-3/12 w-full mb-4 md:mb-0">{left}</div>
      <div className="flex flex-col  md:w-8/12  lg:w-9/12 w-full">{right}</div>
    </div>
  );
};

export default Split;
