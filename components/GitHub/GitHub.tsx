import axios from "axios";
import Section from "components/Layout/Section";
import Heading from "components/Typography/Heading";
import React from "react";

const getColour = (colour) => {
  switch (colour) {
    case "Swift":
      return "#ffac45";
    case "JavaScript":
      return "#f1e05a";
    case "TypeScript":
      return "#2b7489";
    default:
      return "#ffffff";
  }
};

const GitHub = ({ github, repos }) => {
  return (
    <Section>
      <div className="flex flex-wrap -mx-4 mt-auto mb-auto">
        <Heading
          title="Recent GitHub Contributions ❤️"
          subtitle="I work on and contribute to open source applications, see my latest
              statistics below. (Yes, you can see this on GitHub, but isn't this more fun?)"
        />
        <div className="flex">
          <div className="p-4 sm:w-1/2 lg:w-1/4">
            <h2 className="title-font font-medium text-3xl text-white">518</h2>
            <p className="leading-relaxed">Commits</p>
          </div>
          <div className="p-4 sm:w-1/2 lg:w-1/4 ">
            <h2 className="title-font font-medium text-3xl text-white">1.8</h2>
            <p className="leading-relaxed">Issues Created</p>
          </div>
          <div className="p-4 sm:w-1/2 lg:w-1/4">
            <h2 className="title-font font-medium text-3xl text-white">
              {github ? github.public_repos : 0}
            </h2>
            <p className="leading-relaxed">Public Repos</p>
          </div>
          <div className="p-4 sm:w-1/2 lg:w-1/4 ">
            <h2 className="title-font font-medium text-3xl text-white">
              {github ? github.public_repos + github.total_private_repos : 0}
            </h2>
            <p className="leading-relaxed">Total Repos</p>
          </div>
        </div>
        <div className="flex flex-wrap">
          {repos &&
            repos.map((repo) => (
              <div
                className="p-4 md:w-1/3 w-full"
                onClick={() => window.open(repo.html_url)}
              >
                <div className="flex rounded-lg h-full bg-gray-800 bg-opacity-60 hover:bg-opacity-100 cursor-pointer p-8 flex-col">
                  <div className="flex items-center mb-3">
                    <img
                      className="relative z-30 inline object-cover w-10 h-10 rounded-full mr-2"
                      src={repo.owner.avatar_url}
                      alt="Profile image"
                    />
                    <h2 className="text-white text-lg title-font font-medium mr-3">
                      {repo.name}
                    </h2>
                  </div>
                  <div className="flex-grow">
                    <p className="leading-relaxed text-base">
                      {repo.description}
                    </p>
                    <div className="flex mt-2 items-center">
                      <svg width="10" height="10" className="mr-2">
                        <circle
                          cx="5"
                          cy="5"
                          r="5"
                          fill={getColour(repo.language)}
                        />
                      </svg>
                      {repo.language}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Section>
  );
};

export default GitHub;
