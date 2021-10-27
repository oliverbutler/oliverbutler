import React from "react";

interface Props {
  url: string;
  caption?: string;
}

export const Gif: React.FunctionComponent<Props> = ({ url, caption }) => {
  return (
    <div>
      <img src={url} className="mx-auto" alt="gif"></img>
      {caption && <p className="text-center mt-1">{caption}</p>}
    </div>
  );
};
