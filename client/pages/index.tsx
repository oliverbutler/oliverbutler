import { useState } from "react";

import _ from "lodash";

import Header from "components/Header";
import Experience from "components/Experience";
import Education from "components/Education";

import { motion } from "framer-motion";
import { addApolloState, initializeApollo } from "utils/apollo";
import {
  HomePage,
  HomePage_homePage_dynamicContent,
} from "queries/types/HomePage";
import { GET_HOME } from "queries/homeQuery";
import { useQuery } from "@apollo/client";
import Projects from "components/Projects";

const renderDynamicContent = (dynamic: HomePage_homePage_dynamicContent) => {
  switch (dynamic.__typename) {
    case "ComponentDisplayEducation":
      return <Education education={dynamic} />;

    case "ComponentDisplayExperience":
      return <Experience experience={dynamic} />;

    case "ComponentDisplayProjects":
      return <Projects projects={dynamic} />;
  }
};

export default function Home() {
  const { data } = useQuery<HomePage>(GET_HOME);
  const { homePage } = data;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Header
        image={homePage.image}
        title={homePage.title}
        subtitle={homePage.subtitle}
      />
      {homePage.dynamicContent.map((dynamic) => renderDynamicContent(dynamic))}
    </motion.div>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query<HomePage>({ query: GET_HOME });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 60, // In seconds
  });
}
