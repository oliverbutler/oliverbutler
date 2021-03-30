import { useEffect, useState } from "react";
import Head from "next/head";

import Particles from "components/Particles";

import _ from "lodash";
import axios from "axios";

import Navbar from "components/Navbar";
import Header from "components/Header";
import GitHub from "components/GitHub";
import Experience from "components/Experience";
import Education from "components/Education";
import Footer from "components/Footer";

import { useTheme } from "next-themes";

export default function Home({ github, repos }) {
  const [accent, setAccent] = useState("indigo");

  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  return (
    <div className="App">
      <Head>
        <title>Oliver Butler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <Navbar switchTheme={switchTheme} />
        <Header accent={accent} />
        <GitHub github={github} repos={repos} />
        <Experience />
        <Education />
      </main>

      {/* <Particles /> */}
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const pat = process.env.GITHUB_TOKEN;
  const data = await axios
    .get("https://api.github.com/user", {
      headers: {
        Authorization: "Bearer " + pat,
      },
    })
    .then((res) => res.data)
    .catch((err) => new Error("Issue!"));

  const reduced = _.pick(data, ["public_repos", "total_private_repos"]);

  const reposToShow = [
    "cardcollab/cardcollab-core",
    "oliverbutler/hambleton-paddlers",
    "TeenyChef/TeenyChef",
    "oliverbutler/oliverbutler",
    "oliverbutler/FPVManager",
    "oliverbutler/Hyperledger-Fabric-SBMS",
  ];

  var repos = [];

  for (const name of reposToShow) {
    var individualRepo = await axios
      .get("https://api.github.com/repos/" + name, {
        headers: {
          Authorization: "Bearer " + pat,
        },
      })
      .then((res) => res.data)
      .catch((err) => new Error("Issue!"));

    individualRepo = _.pick(individualRepo, [
      "name",
      "full_name",
      "html_url",
      "description",
      "language",
      "open_issues_count",
      "licence",
      "owner.avatar_url",
    ]);

    await axios
      .get("https://api.github.com/repos/" + name + "/contributors", {
        headers: {
          Authorization: "Bearer " + pat,
        },
      })
      .then((res) => {
        var contrib = res.data.map((c) =>
          _.pick(c, ["login", "contributions", "avatar_url"])
        );

        individualRepo.contributors = contrib;
      })
      .catch((err) => new Error("Issue!"));

    repos.push(individualRepo);
  }

  return {
    props: {
      github: reduced,
      repos: repos,
    },
    revalidate: 60, // In seconds
  };
}
