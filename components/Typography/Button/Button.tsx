import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import React from "react";
import { ConditionalWrapper } from "utils/helpers";

type ButtonVariant = "primary" | "secondary";

const buttonStyleFactory = (variant: ButtonVariant) => {
  switch (variant) {
    case "primary":
      return "inline-flex text-white bg-indigo-600 hover:bg-indigo-700 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg z-10";
    case "secondary":
      return "ml-4 inline-flex dark:text-gray-400 text-gray-700 bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 hover:dark:text-white rounded text-lg z-10";
  }
};

interface Props {
  variant?: ButtonVariant;
  link?: React.PropsWithChildren<LinkProps>;
}

const Button: React.FunctionComponent<Props> = ({
  variant = "primary",
  link,
  children,
}) => {
  return (
    <ConditionalWrapper
      condition={link}
      wrapper={(c) => <Link {...link}>{c}</Link>}
    >
      <button
        className={classNames(buttonStyleFactory(variant), {
          "cursor-pointer": link,
        })}
      >
        {children}
      </button>
    </ConditionalWrapper>
  );
};

export default Button;
