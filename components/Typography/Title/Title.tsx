import React from "react";
import { Typography } from "../Typography";

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
    <div className=" w-full flex pt-5 items-center justify-center flex-col ">
      {image}
      <div className="text-center lg:w-2/3 w-full">
        <Typography variant="h1">{title}</Typography>
        <Typography variant="p" className="leading-relaxed mb-8">
          {subtitle}
        </Typography>
      </div>
    </div>
  );
};
