import React from "react";

const Button = ({ text, type }) => {
  if (type == "primary") {
    return (
      <div>
        <button
          className={`inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg z-10`}
        >
          {text}
        </button>
      </div>
    );
  } else {
    return (
      <button className="ml-4 inline-flex dark:text-gray-400 text-gray-700 bg-gray-100 dark:bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 hover:dark:text-white rounded text-lg z-10">
        {text}
      </button>
    );
  }
};

export default Button;
