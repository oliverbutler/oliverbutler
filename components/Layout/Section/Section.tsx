import React from "react";

const Section = ({ children }) => {
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-12 mx-auto flex flex-wrap">
        {children}
      </div>
    </section>
  );
};

export default Section;
