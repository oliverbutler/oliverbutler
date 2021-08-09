import React from "react";

import PostList from "components/Post/PostList/PostList";
import Section from "components/Layout/Section";
import Title from "components/Layout/Title";
import { motion } from "framer-motion";

const PostsPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Section className="prose mx-auto">
        <h1>Welcome to my Blog</h1>
        <p>
          Here you will find posts about loads of good stuff. React, Security,
          Python, and AWS sounds good?
        </p>
        <PostList />
      </Section>
    </motion.div>
  );
};

export default PostsPage;
