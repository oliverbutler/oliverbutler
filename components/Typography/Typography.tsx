import classNames from "classnames";
import React from "react";

type TypographyType = "p" | "h1" | "h2" | "h3" | "h4";

interface Props {
  variant: TypographyType;
  className?: string;
}

export const Typography: React.FunctionComponent<Props> = ({
  variant,
  className,
  children,
}) => {
  switch (variant) {
    case "p":
      return (
        <p
          className={classNames(
            "text-gray-600 dark:text-gray-200 mb-4",
            className
          )}
        >
          {children}
        </p>
      );
    case "h1":
      return (
        <h1
          className={classNames(
            "dark:text-white text-black text-4xl font-bold mb-4",
            className
          )}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={classNames(
            "dark:text-white text-black text-3xl font-medium mb-4",
            className
          )}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={classNames(
            "dark:text-white text-black text-2xl font-normal mb-4",
            className
          )}
        >
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4
          className={classNames(
            "dark:text-white text-black text-xl font-normal mb-4",
            className
          )}
        >
          {children}
        </h4>
      );
  }
};
