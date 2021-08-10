import Header from "components/Header";
import Experience from "components/Experience";
import Education from "components/Education";

import { motion } from "framer-motion";
import Projects from "components/Projects";

import profilePicture from "public/profile-photo.jpeg";
import Section from "components/Layout/Section";

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Header
        image={profilePicture}
        title="I'm Oliver - it's nice to meet you 👋"
        subtitle="I'm a full stack developer at Theodo UK specializing with React, Typescript and all things JS"
      />
      <Section className="prose dark:prose-light mx-auto">
        <h2>Experience</h2>
      </Section>
    </motion.div>
  );
}
