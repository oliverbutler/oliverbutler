import React from "react";

const Section = ({ children }) => {
  return (
    <section className="body-font">
      <div className="container px-5 py-12 mx-auto flex flex-wrap">
        {children}
      </div>
    </section>
  );
};

export default Section;
