import Section from "components/Layout/Section";
import Split from "components/Layout/Split";
import Badge from "components/Typography/Badge";
import {
  JavaBadge,
  NodeBadge,
  PythonBadge,
  ReactBadge,
} from "components/Typography/Badge/Badge";
import Heading from "components/Typography/Heading";
import {
  HomePage_homePage_dynamicContent_ComponentDisplayExperience,
  HomePage_homePage_dynamicContent_ComponentDisplayExperience_experiences,
} from "queries/types/HomePage";
import React from "react";

import Image from "components/Image";

type IndividualExperienceProps = {
  experience: HomePage_homePage_dynamicContent_ComponentDisplayExperience_experiences;
};

const IndividualExperience = ({ experience }: IndividualExperienceProps) => {
  return (
    <Split
      left={
        <>
          <Image
            className="inline object-cover w-16 h-16 rounded-full mr-4"
            image={experience.image}
            blur
            rounded
          ></Image>
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
            {/* {stack.map((tag, index) => (
              <div className="mr-2" key={`tag-${index}`}>
                {tag}
              </div>
            ))} */}
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
