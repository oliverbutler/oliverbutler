import React from "react";

type RenderBadgeProps = {
  name: string;
};

export const RenderBadge = ({ name }: RenderBadgeProps) => {
  switch (name) {
    case "react":
      return <Badge tag="React" bg="bg-blue-200" text="text-blue-700" />;
    case "next":
      return <Badge tag="Next.js" bg="bg-blue-200" text="text-blue-700" />;
    case "typescript":
      return <Badge tag="TypeScript" bg="bg-green-200" text="text-green-700" />;
    case "node":
      return <Badge tag="Node" bg="bg-purple-300" text="text-purple-800" />;
    case "python":
      return <Badge tag="Python" bg="bg-blue-200" text="text-blue-700" />;
    case "java":
      return <Badge tag="Java" bg="bg-red-200" text="text-red-700" />;
    case "c#":
      return <Badge tag="C#" bg="bg-gray-200" text="text-gray-700" />;
    case "c++":
      return <Badge tag="C++" bg="bg-gray-200" text="text-gray-700" />;
    case "swift":
      return <Badge tag="Swift" bg="bg-yellow-200" text="text-yellow-700" />;
    default:
      return (
        <Badge
          tag={name.charAt(0).toUpperCase() + name.substr(1)}
          bg="bg-gray-200"
          text="text-gray-700"
        />
      );
  }
};

export const Badge = ({ tag, bg, text }) => {
  return (
    <div
      className={`px-2  ${bg} ${text} bg-opacity-90 rounded-lg w-min font-semibold  `}
    >
      {tag}
    </div>
  );
};
