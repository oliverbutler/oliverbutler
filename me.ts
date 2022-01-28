import logoTheodo from "public/logo-theodo.png";
import logoLm from "public/logo-lm.png";
import logoLaptop from "public/logo-laptop.png";
import logoFirst from "public/logo-first.png";
import logoBooths from "public/logo-booths.png";
import logoNewcastle from "public/logo-newcastle.png";
import logoRgs from "public/logo-rgs.jpg";

import { Experience } from "components/Experience/Experience";
import { Education } from "components/Education/Education";
import { Projects } from "components/Projects/Projects";

export const educations: Education[] = [
  {
    name: "Newcastle University",
    dates: "2018 - 2021",
    image: logoNewcastle,
    modules: [
      {
        title: "BSc (Hons) Computer Science",
        description:
          "Includes algorithm design and analysis, databases, operating systems, and networking. Was the lead developer for a stage 2 client development project. \nWriting a dissertation on utilizing blockchain (Hyperledger Fabric) to manage smart buildings through the use of incentive mechanisms.",
        grades: "First Class Honours",
        tags: ["algorithms", "java", "c++"],
      },
    ],
  },
  {
    name: "Ripon Grammar School",
    dates: "2017 - 2018",
    image: logoRgs,
    modules: [
      {
        title: "A Levels",
        grades: "B, B, C",
        description: "Mathematics, Physics, and ICT",
        tags: [],
      },
      {
        title: "AS Levels",
        grades: "A* ",
        description: "Chemistry",
        tags: [],
      },
      {
        title: "GCSEs",
        grades: "A* A* A*, A, A, A, B, B",
        description: "Maths, Chemistry, Physics, DT, English Language etc.",
        tags: [],
      },
    ],
  },
];

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
    dates: "July 2020 - August 2020",
    role: "Software Engineer",
  },
  {
    company: "Freelance",
    image: logoLaptop,
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
    image: logoFirst,
    description:
      "Contributed to host a one-day workshop at University for a group of 30 sixth formers to give information about my University experience and answer any questions. I also gave a tour of both Newcastle and Northumbria University whilst keeping the group attentive and interested, whilst remaining in constant contact with other groups.",
    tags: [],
    dates: "February 2019",
    role: "Volunteering",
  },
  {
    company: "Booths, Supermarket",
    image: logoBooths,
    description:
      "I provided assistance to the public whilst working at a local supermarket, on both the Deli and Bakery. I also took pride in my organisational skills and often took it upon myself to ensure the stock room was neat and organized correctly. I also enjoyed helping serve the public and always worked to the best of my ability to help them.",
    tags: [],
    dates: "January 2017 - September 2018",
    role: "Deli Assistant",
  },
];
