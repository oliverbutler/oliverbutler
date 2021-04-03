import { useState } from "react";

import _ from "lodash";
import axios from "axios";

import Header from "components/Header";
import GitHub from "components/GitHub";
import Experience from "components/Experience";
import Education from "components/Education";

import Skills from "components/Skills/Skills";
import { motion } from "framer-motion";

export default function Home({ github, repos }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Header />
      <GitHub github={github} repos={repos} />
      <Skills />
      <Experience />
      <Education />
    </motion.div>
  );
}

export async function getStaticProps() {
  var reduced = [];
  var repos = [];

  return {
    props: {
      github: reduced,
      repos: repos,
    },
    revalidate: 60, // In seconds
  };
}
