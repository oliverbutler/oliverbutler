import React from "react";
import ReactMarkdown, { ReactMarkdownProps } from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

import styles from "./Markdown.module.scss";

const renderers = {
  link: (props) => {
    return (
      <a
        className="text-indigo-600 dark:text-indigo-400 underline"
        href={props.href}
      >
        {props.children}
      </a>
    );
  },
  inlineCode: (props) => {
    return (
      <code className="dark:bg-gray-800 bg-gray-100 px-1 text-indigo-400 dark:text-indigo-300 break-all">
        {props.value}
      </code>
    );
  },
  code: (props) => {
    return (
      <pre className="my-4 ">
        <SyntaxHighlighter
          language={props.language}
          style={dracula}
          showLineNumbers
        >
          {props.value}
        </SyntaxHighlighter>
      </pre>
    );
  },
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
  return (
    <ReactMarkdown
      source={children}
      renderers={renderers}
      className={styles.markdown}
    />
  );
};

export default Markdown;
