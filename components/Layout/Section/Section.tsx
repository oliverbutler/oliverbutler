import classNames from "classnames";
import React from "react";

type SectionProps = {
  children: any;
  id?: string;
  className?: string;
};

const Section = ({ children, id, className }: SectionProps) => {
  return (
    <section className={classNames(className)} id={id}>
      {children}
    </section>
  );
};

export default Section;
