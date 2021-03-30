import React from "react";

const Header = ({ accent }) => {
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <img
          className="inline object-cover w-32 h-32 mb-4 rounded-full"
          alt="hero"
          src="https://avatars.githubusercontent.com/u/47489826?v=4"
        />
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            I'm Oliver - it's nice to meet you.
          </h1>
          <p className="leading-relaxed mb-8">
            I'm a passionate and solution-orientated computer scientist with
            previous industry experience and diverse knowledge of multiple
            technology stacks.
          </p>
          <div className="flex justify-center">
            <button
              className={`inline-flex text-white bg-${accent}-500 border-0 py-2 px-6 focus:outline-none hover:bg-${accent}-600 rounded text-lg z-10`}
            >
              My Work
            </button>
            <button className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg z-10">
              Blog
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
