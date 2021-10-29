import Section from "components/Layout/Section/Section";
import Button from "components/Typography/Button/Button";
import { Title } from "components/Typography/Title/Title";
import Image from "next/image";
import React from "react";

type HeaderProps = {
  title: string;
  subtitle: string;
  image: StaticImageData;
};

export const Header = ({ title, subtitle, image }: HeaderProps) => {
  return (
    <Section>
      <div className="mx-auto flex py-24 items-center justify-center flex-col">
        <div className="mb-6 rounded-full">
          <Image
            className="rounded-full"
            width={200}
            height={200}
            src={image}
            alt="Profile Picture"
            placeholder="blur"
          />
        </div>

        <Title title={title} subtitle={subtitle} />

        <div className="flex justify-center z-10">
          <Button variant="primary">My Work</Button>
          <Button variant="secondary" link={{ href: "/blog" }}>
            Blog
          </Button>
        </div>
      </div>
    </Section>
  );
};
