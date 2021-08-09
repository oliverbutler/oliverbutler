import classNames from "classnames";
import { RenderBadge } from "components/Typography/Badge/Badge";
import Link from "next/link";
import React, { useState } from "react";

type CardProps = {
  bodyJSX?: any;
  bottomJSX?: any;
  ExteriorDiv?: any;
  bottom?: [any];
  image?: any;
  title?: string;
  topText?: string;
  content?: string;
  contentJSX?: any;
  className?: string;
  key?: string;
  href?: string;
};

type LinkWrapperProps = {
  href: string;
  children?: any;
};

const LinkWrapper = ({ href, children }: LinkWrapperProps) => {
  if (href) {
    return <Link href={href}>{children}</Link>;
  } else {
    return children;
  }
};

const MotionWrapper = ({ ExteriorDiv, children, className, key }) => {
  if (ExteriorDiv) {
    return (
      <ExteriorDiv className={"p-4 " + className} key={key}>
        {children}
      </ExteriorDiv>
    );
  } else {
    return (
      <div className={"p-4 " + className} key={key}>
        {children}
      </div>
    );
  }
};

const Card = ({
  bodyJSX,
  bottomJSX,
  ExteriorDiv,
  image,
  title,
  topText,
  content,
  contentJSX,
  bottom,
  key,
  href,
  className = "sm:w-1/2 lg:w-1/3 xl:w-1/4 w-full",
}: CardProps) => {
  return (
    <MotionWrapper ExteriorDiv={ExteriorDiv} className={className} key={key}>
      <LinkWrapper href={href}>
        <div
          className={classNames(
            "h-full border-2 border-gray-200  dark:border-gray-800 rounded-lg overflow-hidden flex flex-col prose",
            { "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800": href }
          )}
          onClick={() => {}}
        >
          {image}
          <div className="p-6 flex-grow">
            {bodyJSX ? (
              bodyJSX
            ) : (
              <>
                <small className="tracking-widest  text-gray-400 mb-1">
                  {topText}
                </small>
                <h2>{title}</h2>
                {/* <div className="mb-1 -mt-1 flex flex-row flex-wrap">
                  {tags &&
                    tags.map((tag, index) => (
                      <div
                        className="mr-2 mt-2"
                        key={`tag-${tag.name}-${index}`}
                      >
                        <RenderBadge name={tag.name} />
                      </div>
                    ))}
                </div> */}
                {contentJSX}
                {content && (
                  <p className="leading-relaxed mb-auto">{content}</p>
                )}
              </>
            )}
          </div>
          {/* {bottomJSX && bottomJSX}
          <div className="flex items-center flex-wrap">
            {bottom &&
              bottom.map((icon) => (
                <div className="text-gray-500 inline-flex items-center  ml-auto leading-none text-md pr-3 pb-3 ">
                  {icon}
                </div>
              ))}
          </div> */}
        </div>
      </LinkWrapper>
    </MotionWrapper>
  );
};

export default Card;
