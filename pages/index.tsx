import { motion } from "framer-motion";
import { Header } from "components/Header/Header";
import { Experience } from "components/Experience/Experience";
import { Education } from "components/Education/Education";
import { Projects } from "components/Projects/Projects";

import profilePicture from "public/profile-photo.jpeg";

import Section from "components/Layout/Section";
import { Typography } from "components/Typography/Typography";
import { experiences } from "me";

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
        <Typography variant="h2">Education 🎓</Typography>
        <Typography variant="p" className="mb-10">
          Below explains my education to date; through University and High
          School.
        </Typography>
      </Section>
    </motion.div>
  );
}
