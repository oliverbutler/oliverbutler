import React from "react";
import { MDXProvider, MDXProviderComponentsProp } from "@mdx-js/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const slugify = (str: string) => {
  str = str.replace(/^\s+|\s+$/g, "");
  str = str.toLowerCase();
  var from =
    "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
  var to =
    "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }
  str = str
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return str;
};

const components: MDXProviderComponentsProp = {
  link: (props) => (
    <a
      className="text-indigo-600 dark:text-indigo-400 underline"
      href={props.href}
    >
      {props.children}
    </a>
  ),
  inlineCode: (props) => (
    <code className="dark:bg-gray-800 bg-gray-200 p-0.5 text-indigo-600 dark:text-indigo-300 break-all">
      {props.children}
    </code>
  ),
  code: (props) => (
    <SyntaxHighlighter
      language={props.className.substr(9)}
      style={dracula}
      showLineNumbers
      customStyle={{
        padding: 0,
        margin: 0,
        backgroundColor: "transparent",
      }}
      lineNumberStyle={{
        minWidth: "2em",
      }}
    >
      {props.children}
    </SyntaxHighlighter>
  ),
  h1: (props) => <h1 id={slugify(props.children)}>{props.children}</h1>,
  h2: (props) => <h2 id={slugify(props.children)}>{props.children}</h2>,
  h3: (props) => <h3 id={slugify(props.children)}>{props.children}</h3>,
  h4: (props) => <h4 id={slugify(props.children)}>{props.children}</h4>,
  h5: (props) => <h5 id={slugify(props.children)}>{props.children}</h5>,
  h6: (props) => <h6 id={slugify(props.children)}>{props.children}</h6>,
};

export const MarkdownProvider: React.FunctionComponent = (props) => {
  return <MDXProvider components={components}>{props.children}</MDXProvider>;
};
