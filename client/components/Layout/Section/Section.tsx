import React from "react";

type SectionProps = {
  children: any;
  id?: string;
};

const Section = ({ children, id }: SectionProps) => {
  return (
    <section className="body-font" id={id}>
      <div className="container px-5 py-12 mx-auto">{children}</div>
    </section>
  );
};

export default Section;
