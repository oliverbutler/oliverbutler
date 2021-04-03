import { useState } from "react";

import _ from "lodash";
import axios from "axios";

import Header from "components/Header";
import GitHub from "components/GitHub";
import Experience from "components/Experience";
import Education from "components/Education";

import Skills from "components/Skills/Skills";

export default function Home({ github, repos }) {
  const [accent, setAccent] = useState("indigo");

  return (
    <>
      <Header accent={accent} />
      <GitHub github={github} repos={repos} />
      <Skills />
      <Experience />
      <Education />
    </>
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
