import React from "react";

interface Props {
  title: string;
  subtitle?: string;
  image?: any;
}

export const Title: React.FunctionComponent<Props> = ({
  title,
  subtitle,
  image,
}) => {
  return (
    <div className="w-full flex pt-5 items-center justify-center flex-col ">
      {image}
      <div className="text-center w-full prose dark:prose-invert max-w-screen-lg px-1">
        <h1 className="text-5xl">{title}</h1>
        <p className="leading-relaxed mb-8">{subtitle}</p>
      </div>
    </div>
  );
};
