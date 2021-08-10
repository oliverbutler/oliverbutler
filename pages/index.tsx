import { motion } from "framer-motion";
import { Header } from "components/Header/Header";
import { Experience } from "components/Experience/Experience";
import { Education } from "components/Education/Education";
import { Projects } from "components/Projects/Projects";

import profilePicture from "public/profile-photo.jpeg";

import Section from "components/Layout/Section";
import { Typography } from "components/Typography/Typography";

import logoTheodo from "public/logo-theodo.png";
import logoLm from "public/logo-lm.png";

const experiences: Experience[] = [
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
];

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Header
        image={profilePicture}
        title="I'm Oliver - it's nice to meet you 👋"
        subtitle="I'm a full stack developer at Theodo UK specializing with React, Typescript and all things JS"
      />
      <Section>
        <Typography variant="h2">Career Experiences</Typography>
        <Typography variant="p" className="mb-10">
          I am currently working at TheodoUK as a Full Stack Developer having
          graduated from Newcastle University with a first class degree.
        </Typography>
        {experiences.map((experience) => (
          <Experience key={experience.company} experience={experience} />
        ))}
      </Section>
    </motion.div>
  );
}
