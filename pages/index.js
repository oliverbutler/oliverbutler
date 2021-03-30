import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import Particles from "../components/Particles";

import _ from "lodash";
import axios from "axios";

const getColour = (colour) => {
  switch (colour) {
    case "Swift":
      return "#ffac45";
    case "JavaScript":
      return "#f1e05a";
    case "TypeScript":
      return "#2b7489";
    default:
      return "#ffffff";
  }
};

export default function Home({ github, repos }) {
  const [accent, setAccent] = useState("indigo");

  return (
    <div className="App">
      <Head>
        <title>Oliver Butler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <div>
          <header class="text-gray-400 bg-gray-900 body-font">
            <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
              <nav class="flex lg:w-2/5 flex-wrap items-center text-base mr-auto">
                <a class="mr-5 hover:text-white">Projects</a>
                <a class="mr-5 hover:text-white">Blog</a>
              </nav>
              <div class="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
                <button class="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
                  Contact Me
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 ml-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </header>

          <section class="text-gray-400 bg-gray-900 body-font">
            <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
              <img
                class="inline object-cover w-32 h-32 mb-4 rounded-full"
                alt="hero"
                src="https://avatars.githubusercontent.com/u/47489826?v=4"
              />
              <div class="text-center lg:w-2/3 w-full">
                <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                  I'm Oliver - it's nice to meet you.
                </h1>
                <p class="leading-relaxed mb-8">
                  I'm a passionate and solution-orientated computer scientist
                  with previous industry experience and diverse knowledge of
                  multiple technology stacks.
                </p>
                <div class="flex justify-center">
                  <button
                    class={`inline-flex text-white bg-${accent}-500 border-0 py-2 px-6 focus:outline-none hover:bg-${accent}-600 rounded text-lg`}
                  >
                    My Work
                  </button>
                  <button class="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">
                    Blog
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section class="text-gray-400 bg-gray-900 body-font">
          <div class="container px-5 py-24 mx-auto flex flex-wrap">
            <div class="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
              <div class="w-full sm:p-4 px-4 mb-6">
                <h1 class="title-font font-medium text-xl mb-2 text-white">
                  Recent GitHub Contributions ❤️
                </h1>
                <div class="leading-relaxed">
                  I frequently contribute to open source applications, see my
                  latest statistics below.
                </div>
              </div>
              <div class="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                <h2 class="title-font font-medium text-3xl text-white">518</h2>
                <p class="leading-relaxed">Commits</p>
              </div>
              <div class="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                <h2 class="title-font font-medium text-3xl text-white">1.8</h2>
                <p class="leading-relaxed">Issues Created</p>
              </div>
              <div class="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                <h2 class="title-font font-medium text-3xl text-white">
                  {github ? github.public_repos : 0}
                </h2>
                <p class="leading-relaxed">Public Repos</p>
              </div>
              <div class="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                <h2 class="title-font font-medium text-3xl text-white">
                  {github
                    ? github.public_repos + github.total_private_repos
                    : 0}
                </h2>
                <p class="leading-relaxed">Total Repos</p>
              </div>
            </div>
            <div class="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
              <img
                class="object-cover object-center w-full h-full"
                src="https://dummyimage.com/600x300"
                alt="stats"
              />
            </div>
          </div>
          <div className="flex flex-wrap">
            {repos.map((repo) => (
              <div
                class="p-4 md:w-1/3"
                onClick={() => window.open(repo.html_url)}
              >
                <div class="flex rounded-lg h-full bg-gray-800 bg-opacity-60 hover:bg-opacity-100 cursor-pointer p-8 flex-col">
                  <div class="flex items-center mb-3">
                    <img
                      class="relative z-30 inline object-cover w-10 h-10 rounded-full mr-2"
                      src={repo.owner.avatar_url}
                      alt="Profile image"
                    />
                    <h2 class="text-white text-lg title-font font-medium mr-3">
                      {repo.name}
                    </h2>
                  </div>
                  <div class="flex-grow">
                    <p class="leading-relaxed text-base">{repo.description}</p>
                    <div className="flex mt-2 items-center">
                      <svg width="10" height="10" className="mr-2">
                        <circle
                          cx="5"
                          cy="5"
                          r="5"
                          fill={getColour(repo.language)}
                        />
                      </svg>
                      {repo.language}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* <section class="text-gray-400 bg-gray-900 body-font">
          <div class="container px-5 py-24 mx-auto">
            <div class="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="inline-block w-8 h-8 text-gray-500 mb-8"
                viewBox="0 0 975.036 975.036"
              >
                <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
              </svg>
              <p class="leading-relaxed text-lg">
                The first rule of any technology used in a business is that
                automation applied to an efficient operation will magnify the
                efficiency. The second is that automation applied to an
                inefficient operation will magnify the inefficiency.
              </p>
              <span
                class={`inline-block h-1 w-10 rounded bg-${accent}-500 mt-8 mb-6`}
              ></span>
              <h2 class="text-white font-medium title-font tracking-wider text-sm">
                Bill Gates
              </h2>
              <p class="text-gray-500">Philanthropist and Ex CEO Microsoft</p>
            </div>
          </div>
        </section> */}
      </main>

      <footer class="text-gray-400 bg-gray-900 body-font">
        <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a class="flex title-font font-medium items-center md:justify-start justify-center text-white">
            <span class="ml-3 text-xl">Oliver Butler</span>
          </a>
          <p class="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">
            © {new Date().getFullYear()} Oliver Butler
          </p>
          <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a class="text-gray-400">
              <svg
                fill="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a class="ml-3 text-gray-400">
              <svg
                fill="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a class="ml-3 text-gray-400">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a class="ml-3 text-gray-400">
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="0"
                class="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </footer>
      {/* <Particles /> */}
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
