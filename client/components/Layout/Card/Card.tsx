import Link from "next/link";
import React from "react";

type CardProps = {
  bodyJSX?: any;
  bottom?: [any];
  image?: any;
  tags?: string;
  title?: string;
  content?: string;
  className?: string;
  key?: string;
  href?: string;
};

const Card = ({
  bodyJSX,
  image,
  tags,
  title,
  content,
  bottom,
  key,
  href,
  className = "sm:w-1/2 lg:w-1/3 xl:w-1/4",
}: CardProps) => {
  return (
    <div className={"p-4 " + className} key={key}>
      <Link href={href}>
        <div
          className="h-full border-2 border-gray-200  dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-lg overflow-hidden flex flex-col"
          onClick={() => {}}
        >
          {image}
          <div className="p-6 flex-grow">
            {bodyJSX ? (
              bodyJSX
            ) : (
              <>
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                  {tags}
                </h2>
                <h1 className="title-font text-lg font-medium dark:text-white text-black mb-3">
                  {title}
                </h1>
                <p className="leading-relaxed mb-auto">{content}</p>
              </>
            )}
          </div>
          <div className="flex items-center flex-wrap">
            {bottom.map((icon) => (
              <div className="text-gray-500 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-md pr-3 py-1 ">
                {icon}
              </div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
