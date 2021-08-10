import Section from "components/Layout/Section";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type HeaderProps = {
  title: string;
  subtitle: string;
  image: StaticImageData;
};

const Header = ({ title, subtitle, image }: HeaderProps) => {
  return (
    <Section className="prose dark:prose-light mx-auto">
      <div className="mx-auto flex py-24 items-center justify-center flex-col">
        <div className="mb-6 ">
          <Image
            className="rounded-full"
            width={128}
            height={128}
            src={image}
          />
        </div>

        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium dark:text-white text-black z-10">
            {title}
          </h1>
          <p className="leading-relaxed mb-8">{subtitle}</p>
          <div className="flex justify-center z-10">
            <a
              className={`inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg z-10`}
            >
              My Work
            </a>
            <Link href="/posts">
              <a className="ml-4 inline-flex dark:text-gray-400 text-gray-700 bg-gray-100 dark:bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 hover:dark:text-white rounded text-lg z-10">
                Blog
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Header;
