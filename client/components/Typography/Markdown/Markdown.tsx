import React from "react";
import ReactMarkdown, { ReactMarkdownProps } from "react-markdown";

const renderers = {
  heading: ({ children, level }) => {
    switch (level) {
      case 1:
        return (
          <h1 className="dark:text-white text-black text-2xl mt-4">
            {children}
          </h1>
        );
      case 2:
        return (
          <h2 className="dark:text-white text-black text-xl">{children}</h2>
        );
      case 3:
        return (
          <h3 className=" dark:text-white text-black text-lg">{children}</h3>
        );
      case 4:
        return (
          <h4 className=" dark:text-white text-blacktext-mg">{children}</h4>
        );
    }
  },
};

const Markdown = ({ children }) => {
  return <ReactMarkdown source={children} renderers={renderers} />;
};

export default Markdown;
