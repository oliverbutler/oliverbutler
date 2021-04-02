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
  // const pat = process.env.GITHUB_TOKEN;
  // const data = await axios
  //   .get("https://api.github.com/user", {
  //     headers: {
  //       Authorization: "Bearer " + pat,
  //     },
  //   })
  //   .then((res) => res.data)
  //   .catch((err) => new Error("Issue!"));

  // const reduced = _.pick(data, ["public_repos", "total_private_repos"]);

  // const reposToShow = [
  //   "cardcollab/cardcollab-core",
  //   "oliverbutler/hambleton-paddlers",
  //   "TeenyChef/TeenyChef",
  //   "oliverbutler/oliverbutler",
  //   "oliverbutler/FPVManager",
  //   "oliverbutler/Hyperledger-Fabric-SBMS",
  // ];

  // var repos = [];

  // for (const name of reposToShow) {
  //   var individualRepo = await axios
  //     .get("https://api.github.com/repos/" + name, {
  //       headers: {
  //         Authorization: "Bearer " + pat,
  //       },
  //     })
  //     .then((res) => res.data)
  //     .catch((err) => new Error("Issue!"));

  //   individualRepo = _.pick(individualRepo, [
  //     "name",
  //     "full_name",
  //     "html_url",
  //     "description",
  //     "language",
  //     "open_issues_count",
  //     "licence",
  //     "owner.avatar_url",
  //   ]);

  //   await axios
  //     .get("https://api.github.com/repos/" + name + "/contributors", {
  //       headers: {
  //         Authorization: "Bearer " + pat,
  //       },
  //     })
  //     .then((res) => {
  //       var contrib = res.data.map((c) =>
  //         _.pick(c, ["login", "contributions", "avatar_url"])
  //       );

  //       individualRepo.contributors = contrib;
  //     })
  //     .catch((err) => new Error("Issue!"));

  //   repos.push(individualRepo);
  // }

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
