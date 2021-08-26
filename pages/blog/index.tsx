import React from "react";

import PostList from "components/Post/PostList/PostList";
import Section from "components/Layout/Section";
import { motion } from "framer-motion";
import { GetStaticProps } from "next";
import { getPosts, PostFile } from "utils/getPosts";
import { Title } from "components/Typography/Title/Title";
import { populateBlogsFromMDXFiles } from "utils/db/blog";

interface Props {
  posts: PostFile[];
}

const PostsPage: React.FunctionComponent<Props> = ({ posts }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Title
        title="Welcome to my Blog"
        subtitle="Here you will find posts about loads of good stuff. React, Security,
          Python, and AWS sounds good?"
      />
      <PostList posts={posts} />
    </motion.div>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const posts = getPosts();

  // For each blog file, populate the DB if it doesn't already exist
  populateBlogsFromMDXFiles(posts);

  return {
    props: {
      posts,
    },
  };
};

export default PostsPage;
