import classNames from "classnames";
import React from "react";

interface Props {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}

const Split: React.FunctionComponent<Props> = ({ left, right, className }) => {
  return (
    <div
      className={classNames(
        "flex flex-row flex-wrap mb-10 md:mb-4 px-4 w-full",
        className
      )}
    >
      <div className="flex md:w-5/12 lg:w-3/12 w-full mb-4 md:mb-0">{left}</div>
      <div className="flex flex-col md:w-7/12 lg:w-9/12 w-full">{right}</div>
    </div>
  );
};

export default Split;
