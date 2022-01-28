import Split from "components/Layout/Split/Split";
import { RenderBadge } from "components/Typography/Badge/Badge";
import Image from "next/image";
import React from "react";

export interface Experience {
  company: string;
  image: StaticImageData;
  type?: string;
  dates: string;
  role: string;
  description: string;
  tags: string[];
}
interface Props {
  experience: Experience;
}

export const Experience: React.FunctionComponent<Props> = ({ experience }) => {
  return (
    <Split
      key={experience.company}
      left={
        <>
          <div className="mr-4">
            <Image
              width={50}
              height={50}
              src={experience.image}
              placeholder="blur"
              objectFit="contain"
              alt="company logo"
            />
          </div>

          <div className="flex flex-col">
            <span className="font-semibold title-font text-black dark:text-white">
              {experience.company}
            </span>
            <span className="font-semibold title-font text-gray-700">
              {experience.type}
            </span>
            <span className="mt-1 text-gray-500 text-sm">
              {experience.dates}
            </span>
          </div>
        </>
      }
      right={
        <div className="ml-4">
          <h3 className="mt-0">{experience.role}</h3>
          <div className="leading-relaxed">{experience.description}</div>
          <div className="flex mt-1 flex-wrap">
            {experience.tags
              .sort((a, b) => a.localeCompare(b))
              .map((tag) => (
                <div className="mr-2 mb-2" key={tag}>
                  <RenderBadge name={tag} />
                </div>
              ))}
          </div>
        </div>
      }
    />
  );
};
