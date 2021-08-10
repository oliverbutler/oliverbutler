import classNames from "classnames";
import React from "react";

export enum SectionWidth {
  Normal,
  Narrow,
}

type SectionProps = {
  children: any;
  id?: string;
  width?: SectionWidth;
  noPadding?: boolean;
};

const Section = ({
  children,
  id,
  width = SectionWidth.Normal,
  noPadding = false,
}: SectionProps) => {
  return (
    <section className="body-font" id={id}>
      {width == SectionWidth.Normal ? (
        <div
          className={classNames("container px-3 mx-auto", {
            "py-12": !noPadding,
          })}
        >
          {children}
        </div>
      ) : (
        <div
          className={classNames("container px-3 md:px-0 max-w-3xl mx-auto", {
            "py-12": !noPadding,
          })}
        >
          {children}
        </div>
      )}
    </section>
  );
};

export default Section;
