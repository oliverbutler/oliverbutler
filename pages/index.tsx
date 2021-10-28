import { motion } from "framer-motion";
import { Header } from "components/Header/Header";
import { Experience } from "components/Experience/Experience";
import { Education } from "components/Education/Education";
import { Projects } from "components/Projects/Projects";

import profilePicture from "public/profile-photo.jpg";

import Section from "components/Layout/Section/Section";
import { Typography } from "components/Typography/Typography";
import { educations, experiences } from "me";
import { Particles } from "components/Particles/Particles";

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Particles />
      <Header
        image={profilePicture}
        title="I'm Oliver - it's nice to meet you 👋"
        subtitle="I'm a full stack developer at Theodo UK specializing with React, Typescript and all things JS"
      />
      <Section>
        <Typography variant="h2" className="relative">
          Career Experiences{" "}
          <div className="w-16 h-1 bg-indigo-600 absolute -bottom-2  " />
        </Typography>

        <Typography variant="p" className="mb-10">
          I am currently working at TheodoUK as a Full Stack Developer having
          graduated from Newcastle University with a first class degree.
        </Typography>
        {experiences.map((experience) => (
          <Experience key={experience.company} experience={experience} />
        ))}
      </Section>
      <Section>
        <Typography variant="h2" className="relative">
          Education 🎓
          <div className="w-16 h-1 bg-indigo-600 absolute -bottom-2  " />
        </Typography>
        <Typography variant="p" className="mb-10">
          Below explains my education to date; through University and High
          School.
        </Typography>
        {educations.map((education) => (
          <Education key={education.name} education={education} />
        ))}
      </Section>
    </motion.div>
  );
}
