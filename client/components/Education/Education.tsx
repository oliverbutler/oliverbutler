import Split from "components/Layout/Split";
import {
  HomePage_homePage_dynamicContent_ComponentDisplayEducation,
  HomePage_homePage_dynamicContent_ComponentDisplayEducation_educations,
} from "queries/types/HomePage";
import React from "react";
import Image from "components/Image";
import Section from "components/Layout/Section";
import Heading from "components/Typography/Heading";
import { RenderBadge } from "components/Typography/Badge/Badge";
import BlurImage from "components/BlurImage";

type IndividualEducationProps = {
  education: HomePage_homePage_dynamicContent_ComponentDisplayEducation_educations;
};

const IndividualEducation = ({ education }: IndividualEducationProps) => {
  return (
    <Split
      left={
        <>
          <BlurImage
            className="w-16 h-16 mr-4 "
            image={education.image}
            rounded
          />
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
          {education.modules.map((module) => (
            <div className="mb-4" key={"module-" + module.title}>
              <h2 className="title-font font-medium text-black dark:text-white title-font">
                {module.title}
              </h2>
              <h2 className="text-gray-500 text-sm mb-1">{module.grades}</h2>
              <div className="leading-relaxed">{module.description}</div>
              {module.tags.map((tag, index) => (
                <div className="mr-2" key={`tag-${index}`}>
                  <RenderBadge name={tag.name} />
                </div>
              ))}
            </div>
          ))}
        </>
      }
    />
  );
};

type EducationProps = {
  education: HomePage_homePage_dynamicContent_ComponentDisplayEducation;
};

const Education = ({ education }: EducationProps) => {
  return (
    <Section>
      <Heading title={education.title} subtitle={education.subtitle} />
      {education.educations.map((e) => (
        <IndividualEducation education={e} />
      ))}
    </Section>
  );
};

export default Education;
