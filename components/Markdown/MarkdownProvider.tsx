import React from "react";
import { MDXProvider, MDXProviderComponentsProp } from "@mdx-js/react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Typography } from "components/Typography/Typography";

const components: MDXProviderComponentsProp = {
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
      <code className="dark:bg-gray-800 bg-gray-100 px-1 text-indigo-600 dark:text-indigo-300 break-all">
        {props.children}
      </code>
    );
  },
  code: (props) => {
    return (
      <pre className="my-6 ">
        <SyntaxHighlighter
          language={props.className.substr(9)}
          style={dracula}
          showLineNumbers
        >
          {props.children}
        </SyntaxHighlighter>
      </pre>
    );
  },
  p: (props) => <Typography variant="p">{props.children}</Typography>,
  h1: (props) => <Typography variant="h1">{props.children}</Typography>,
  h2: (props) => <Typography variant="h2">{props.children}</Typography>,
  h3: (props) => <Typography variant="h3">{props.children}</Typography>,
  h4: (props) => <Typography variant="h4">{props.children}</Typography>,
};

interface Props {}
export const MarkdownProvider: React.FunctionComponent<Props> = (props) => {
  return <MDXProvider components={components}>{props.children}</MDXProvider>;
};
