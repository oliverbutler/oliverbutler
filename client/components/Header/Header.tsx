import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <section className="body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <img
          className="inline object-cover w-32 h-32 mb-4 rounded-full z-10"
          alt="hero"
          src="https://avatars.githubusercontent.com/u/47489826?v=4"
        />
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium dark:text-white text-black z-10">
            I'm Oliver - it's nice to meet you.
          </h1>
          <p className="leading-relaxed mb-8">
            I'm a passionate and solution-orientated computer scientist with
            previous industry experience and diverse knowledge of multiple
            technology stacks.
          </p>
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
    </section>
  );
};

export default Header;
