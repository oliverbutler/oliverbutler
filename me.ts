import logoTheodo from "public/logo-theodo.png";
import logoLm from "public/logo-lm.png";

import { Experience } from "components/Experience/Experience";
import { Education } from "components/Education/Education";
import { Projects } from "components/Projects/Projects";

export const experiences: Experience[] = [
  {
    company: "Theodo UK",
    image: logoTheodo,
    description: "During my time at Theodo UK I have ",
    tags: ["react", "typescript"],
    dates: "June 2021 - Present",
    role: "Full Stack Web Developer",
  },
  {
    company: "Lockheed Martin RMS",
    image: logoLm,
    description:
      "Worked alongside the team to develop an interoperability layer using React, SSE Events, and Java to compliment the existing infrastructure of a common services data network of an existing project. Also actively worked to design and develop an overhaul of a STEM application focussed to help get school children interested in Cyber.",
    tags: ["react", "java"],
    dates: "June 2021 - Present",
    role: "Software Engineer",
  },
  {
    company: "Freelance",
    image: logoLm,
    description:
      "Ongoing web development for a national dance and drama photography company. Volunteered to develop the web stack for Hambleton Paddlers Canoe Club using React, Nodejs, Strapi, and Stripe.",
    tags: [
      "react",
      "node",
      "python",
      "next",
      "typescript",
      "Apollo",
      "GraphQL",
    ],
    dates: "December 2017 - January 2021",
    role: "Web Developer",
  },
  {
    company: "FIRST Face to Face",
    image: logoLm,
    description:
      "Contributed to host a one-day workshop at University for a group of 30 sixth formers to give information about my University experience and answer any questions. I also gave a tour of both Newcastle and Northumbria University whilst keeping the group attentive and interested, whilst remaining in constant contact with other groups.",
    tags: [],
    dates: "February 2019",
    role: "Volunteering",
  },
  {
    company: "Booths, Supermarket",
    image: logoLm,
    description:
      "I provided assistance to the public whilst working at a local supermarket, on both the Deli and Bakery. I also took pride in my organisational skills and often took it upon myself to ensure the stock room was neat and organized correctly. I also enjoyed helping serve the public and always worked to the best of my ability to help them.",
    tags: [],
    dates: "January 2017 - September 2018",
    role: "Deli Assistant",
  },
];
