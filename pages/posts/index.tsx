import React from "react";

import PostList from "components/Post/PostList/PostList";
import Section from "components/Layout/Section";
import { motion } from "framer-motion";
import { GetStaticProps } from "next";
import { getPosts, PostFile } from "utils/getPosts";

interface Props {
  posts: PostFile[];
}

const PostsPage: React.FunctionComponent<Props> = ({ posts }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Section className="prose dark:prose-light mx-auto">
        <h1>Welcome to my Blog</h1>
        <p>
          Here you will find posts about loads of good stuff. React, Security,
          Python, and AWS sounds good?
        </p>
      </Section>
      <PostList posts={posts} />
    </motion.div>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const posts = getPosts();

  return {
    props: {
      posts,
    },
  };
};

export default PostsPage;
