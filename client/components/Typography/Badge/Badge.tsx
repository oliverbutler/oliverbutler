import React from "react";

export const ReactBadge = () => (
  <Badge tag="React" bg="bg-yellow-200" text="text-yellow-700" />
);

export const NodeBadge = () => (
  <Badge tag="Node" bg="bg-purple-300" text="text-purple-800" />
);

export const PythonBadge = () => (
  <Badge tag="Python" bg="bg-blue-200" text="text-blue-700" />
);

export const JavaBadge = () => (
  <Badge tag="Java" bg="bg-red-200" text="text-red-700" />
);

export const CSharpBadge = () => (
  <Badge tag="C# / Unity" bg="bg-gray-200" text="text-gray-700" />
);

export const CPPBadge = () => (
  <Badge tag="C++" bg="bg-gray-200" text="text-gray-700" />
);

export const SwiftBadge = () => (
  <Badge tag="Swift" bg="bg-yellow-200" text="text-yellow-700" />
);

const Badge = ({ tag, bg, text }) => {
  return (
    <span
      className={`px-2  ${bg} ${text} bg-opacity-90 rounded-lg w-min font-semibold `}
    >
      {tag}
    </span>
  );
};

export default Badge;
