import Split from "components/Layout/Split/Split";
import React from "react";
import { RenderBadge } from "components/Typography/Badge/Badge";
import Image from "next/image";

export interface Education {
  name: string;
  dates: string;
  image: StaticImageData;
  modules: {
    title: string;
    description: string;
    grades: string;
    tags: string[];
  }[];
}

interface Props {
  education: Education;
}

export const Education: React.FunctionComponent<Props> = ({ education }) => {
  return (
    <Split
      left={
        <>
          <div className="mr-4">
            <Image
              width={50}
              height={50}
              src={education.image}
              placeholder="blur"
              objectFit="contain"
              alt="company logo"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold title-font text-black dark:text-white">
              {education.name}
            </span>
            <span className="mt-1 text-gray-500 text-sm">
              {education.dates}
            </span>
          </div>
        </>
      }
      right={
        <>
          {education.modules.map((uniModule) => (
            <div className="mb-4" key={"module-" + uniModule.title}>
              <h2 className="title-font font-medium text-black dark:text-white title-font">
                {uniModule.title}
              </h2>
              <h2 className="text-gray-500 text-sm mb-1">{uniModule.grades}</h2>
              <div className="leading-relaxed">{uniModule.description}</div>
              <div className="mt-1 flex flex-row flex-wrap">
                {uniModule.tags
                  .sort((a, b) => a.localeCompare(b))
                  .map((tag) => (
                    <div className="mr-2 mb-2" key={tag}>
                      <RenderBadge name={tag} />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </>
      }
    />
  );
};
