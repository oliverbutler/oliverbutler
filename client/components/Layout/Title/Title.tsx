import React from "react";

const Title = ({ title, subtitle, image }) => {
  return (
    <section className="body-font w-full">
      <div className="container w-full mx-auto flex px-5 pt-5 items-center justify-center flex-col">
        {image}
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium dark:text-white text-black z-10">
            {title}
          </h1>
          <p className="leading-relaxed mb-8">{subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default Title;
