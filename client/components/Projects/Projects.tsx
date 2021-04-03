import Card from "components/Layout/Card";
import Section from "components/Layout/Section";
import Heading from "components/Typography/Heading";
import Image from "components/Image";
import { HomePage_homePage_dynamicContent_ComponentDisplayProjects } from "queries/types/HomePage";
import React from "react";

type ProjectsProps = {
  projects: HomePage_homePage_dynamicContent_ComponentDisplayProjects;
};

const Projects = ({ projects }: ProjectsProps) => {
  return (
    <Section>
      <div className="flex flex-wrap -mx-4 mt-auto mb-auto">
        <Heading title={projects.title} subtitle={projects.subtitle} />

        <div className="flex flex-wrap">
          {projects.projects.map((project) => (
            <Card
              image={
                <Image image={project.image} blur className="h-52 w-full" />
              }
              title={project.name}
              tags={project.project_url}
              content={project.description}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Projects;
