import Section from "components/Layout/Section";
import Button from "components/Typography/Button/Button";
import { Title } from "components/Typography/Title/Title";
import Image from "next/image";
import Link from "next/link";
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
        <div className="mb-6 ">
          <Image
            className="rounded-full"
            width={128}
            height={128}
            src={image}
          />
        </div>

        <Title title={title} subtitle={subtitle} />

        <div className="flex justify-center z-10">
          <Button variant="primary">My Work</Button>
          <Button variant="secondary" link={{ href: "/posts" }}>
            Blog
          </Button>
        </div>
      </div>
    </Section>
  );
};
