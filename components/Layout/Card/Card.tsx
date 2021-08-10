import classNames from "classnames";
import { RenderBadge } from "components/Typography/Badge/Badge";
import Link from "next/link";
import React from "react";
import { ConditionalWrapper } from "utils/helpers";

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
  tags?: string[];
  href?: string;
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
  tags,
  href,
}: CardProps) => {
  return (
    <ConditionalWrapper
      condition={href}
      wrapper={(c) => <Link href={href}>{c}</Link>}
    >
      <div
        className={classNames(
          "h-full border-2 border-gray-200  dark:border-gray-800 rounded-lg overflow-hidden flex flex-col sm:w-1/2 lg:w-1/3 xl:w-1/4 w-full m-4",
          {
            "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800": href,
          }
        )}
        onClick={() => {}}
      >
        {image}
        <div className="p-6 flex-grow">
          {bodyJSX ? (
            bodyJSX
          ) : (
            <>
              <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                {topText}
              </h2>
              <h1 className="title-font text-lg font-medium dark:text-white text-black mb-3">
                {title}
              </h1>
              <div className="mb-1 -mt-1 flex flex-row flex-wrap">
                {tags &&
                  tags.map((tag) => (
                    <div className="mr-2 mt-2" key={tag}>
                      <RenderBadge name={tag} />
                    </div>
                  ))}
              </div>
              {contentJSX}
              {content && <p className="leading-relaxed mb-auto">{content}</p>}
            </>
          )}
        </div>
        {bottomJSX && bottomJSX}
        <div className="flex items-center flex-wrap">
          {bottom &&
            bottom.map((icon) => (
              <div className="text-gray-500 inline-flex items-center  ml-auto leading-none text-md pr-3 pb-3 ">
                {icon}
              </div>
            ))}
        </div>
      </div>
    </ConditionalWrapper>
  );
};

export default Card;
