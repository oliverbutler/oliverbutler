import { motion } from "framer-motion";
import { Header } from "components/Header/Header";
import { Experience } from "components/Experience/Experience";
import { Education } from "components/Education/Education";
import { Projects } from "components/Projects/Projects";

import profilePicture from "public/profile-photo.jpeg";

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Header
        image={profilePicture}
        title="I'm Oliver - it's nice to meet you 👋"
        subtitle="I'm a full stack developer at Theodo UK specializing with React, Typescript and all things JS"
      />
    </motion.div>
  );
}
