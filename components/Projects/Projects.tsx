import Card from "components/Layout/Card/Card";
import Section from "components/Layout/Section/Section";
import React, { useState } from "react";
import { motion } from "framer-motion";

type MotionComponentProps = {
  children: any;
  className: any;
  key: any;
};

const ExteriorDiv = ({ className, key, children }: MotionComponentProps) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      key={key}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const Projects = ({ projects }) => {
  return (
    <Section>
      <div className="flex flex-wrap -mx-4 mt-auto mb-auto">
        {/* <Heading title={projects.title} subtitle={projects.subtitle} /> */}

        <div className="flex flex-wrap w-full justify-center">
          {projects.projects.map((project) => (
            <Card
              key={project.name}
              // image={
              //   <BlurImage image={project.image} className="h-64 w-full" />
              // }
              title={project.name}
              tags={project.tags}
              contentJSX={
                <>
                  <p className="leading-relaxed mb-auto">
                    {project.description}
                  </p>
                  {project.project_url && (
                    <a
                      className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 mt-2"
                      href={project.project_url}
                    >
                      View Project
                      <ion-icon name="arrow-forward-outline"></ion-icon>
                    </a>
                  )}
                </>
              }
              ExteriorDiv={ExteriorDiv}
              bottomJSX={
                <a
                  className="flex flex-wrap ml-auto text-4xl hover:text-white cursor-pointer mr-2 mb-2 -mt-5"
                  href={project.github_url}
                >
                  <ion-icon name="logo-github" />
                </a>
              }
            />
          ))}
        </div>
      </div>
    </Section>
  );
};
