import Section from "components/Layout/Section";
import Split from "components/Layout/Split";
import { RenderBadge } from "components/Typography/Badge/Badge";
import Heading from "components/Typography/Heading";
import {
  HomePage_homePage_dynamicContent_ComponentDisplayExperience,
  HomePage_homePage_dynamicContent_ComponentDisplayExperience_experiences,
} from "queries/types/HomePage";
import React from "react";

import Image from "components/Image";
import BlurImage from "components/BlurImage";

type IndividualExperienceProps = {
  experience: HomePage_homePage_dynamicContent_ComponentDisplayExperience_experiences;
};

const IndividualExperience = ({ experience }: IndividualExperienceProps) => {
  return (
    <Split
      left={
        <>
          <BlurImage
            className="w-16 h-16 mr-4"
            image={experience.image}
            rounded
          />
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
        <>
          <h2 className="title-font font-medium text-black dark:text-white title-font mb-2 w-full">
            {experience.role}
          </h2>
          <div className="leading-relaxed">{experience.description}</div>
          <div className="flex mt-1">
            {experience.tags.map((tag, index) => (
              <div className="mr-2" key={`tag-${index}`}>
                <RenderBadge name={tag.name} />
              </div>
            ))}
          </div>
        </>
      }
    />
  );
};

type ExperienceProps = {
  experience: HomePage_homePage_dynamicContent_ComponentDisplayExperience;
};

const Experience = ({ experience }: ExperienceProps) => {
  return (
    <Section>
      <Heading title={experience.title} subtitle={experience.subtitle} />

      {experience.experiences.map((e) => (
        <IndividualExperience experience={e} />
      ))}
    </Section>
  );
};

export default Experience;
