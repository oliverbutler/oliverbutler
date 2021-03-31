import React from "react";

const TAG_COLOURS = {
  react: ["bg-yellow-200", "text-yellow-800"],
  javascript: ["bg-blue-400", "text-gray-900"],
  default: ["bg-blue-400", "text-gray-900"],
};

export const whitelistedClasses = () => {
  Object.values(TAG_COLOURS).reduce(
    (whitelistedColors, currentColors) => [
      ...whitelistedColors,
      ...currentColors,
    ],
    []
  );
};

export const ReactBadge = () => (
  <Badge tag="React" bg="bg-yellow-200" text="text-yellow-700" className="" />
);

export const PythonBadge = () => (
  <Badge tag="Python" bg="bg-blue-200" text="text-blue-700" className="" />
);

const Badge = ({ tag, bg, text, className }) => {
  return (
    <span
      className={
        `px-2  ${bg} ${text} bg-opacity-90 rounded-lg w-min font-semibold ` +
        className
      }
    >
      {tag}
    </span>
  );
};

export default Badge;
