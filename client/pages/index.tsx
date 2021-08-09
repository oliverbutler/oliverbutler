import { useState } from "react";

import _ from "lodash";

import Header from "components/Header";
import Experience from "components/Experience";
import Education from "components/Education";

import { motion } from "framer-motion";
import {
  HomePage,
  HomePage_homePage_dynamicContent,
} from "queries/types/HomePage";
import { useQuery } from "@apollo/client";
import Projects from "components/Projects";

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* <Header
        image={homePage.image}
        title={homePage.title}
        subtitle={homePage.subtitle}
      /> */}
      {/* {homePage.dynamicContent.map((dynamic) => renderDynamicContent(dynamic))} */}
    </motion.div>
  );
}
