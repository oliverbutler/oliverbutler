import React from "react";

import { addApolloState, initializeApollo } from "utils/apollo";
import PostList from "components/Post/PostList/PostList";
import Section from "components/Layout/Section";
import Title from "components/Layout/Title";
import { motion } from "framer-motion";
import { GET_POSTS } from "queries/postQuery";
import { Posts } from "queries/types/Posts";

const PostsPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Title
        title="Welcome to my Blog"
        subtitle="Here you will find posts about loads of good stuff. React, Security, Python, and AWS sounds good?"
      />
      <Section>
        <PostList />
      </Section>
    </motion.div>
  );
};

export const getStaticProps = async () => {
  // Apollo must be initialized on the server
  const apolloClient = initializeApollo();

  await apolloClient.query<Posts>({ query: GET_POSTS });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
};

export default PostsPage;
