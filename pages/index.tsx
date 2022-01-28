import { motion } from "framer-motion";
import { Header } from "components/Header/Header";
import { Experience } from "components/Experience/Experience";
import { Education } from "components/Education/Education";
import dynamic from "next/dynamic";

import profilePicture from "public/profile-photo.jpg";

import { educations, experiences } from "me";

const DynamicParticlesBackground = dynamic(
  () => import("components/Particles/Particles")
);

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* <DynamicParticlesBackground /> */}
      <Header
        image={profilePicture}
        title="I'm Oliver - it's nice to meet you 👋"
        subtitle="I'm a full stack developer at Theodo UK specializing with React, Typescript and all things JS"
      />
      <div className="prose dark:prose-invert max-w-screen-lg px-3 mx-auto">
        <h2 className="relative">
          Career Experiences{" "}
          <div className="w-16 h-1 bg-indigo-600 absolute -bottom-2  " />
        </h2>

        <p className="mb-10">
          I am currently working at TheodoUK as a Full Stack Developer having
          graduated from Newcastle University with a first class degree.
        </p>
        {experiences.map((experience) => (
          <Experience key={experience.company} experience={experience} />
        ))}
        <h2 className="relative">
          Education 🎓
          <div className="w-16 h-1 bg-indigo-600 absolute -bottom-2  " />
        </h2>
        <p className="mb-10">
          Below explains my education to date; through University and High
          School.
        </p>
        {educations.map((education) => (
          <Education key={education.name} education={education} />
        ))}
      </div>
    </motion.div>
  );
}
