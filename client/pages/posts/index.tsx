import React from "react";

import { addApolloState, initializeApollo } from "utils/apollo";
import PostList, { GET_POSTS } from "components/Post/PostList/PostList";
import Heading from "components/Typography/Heading";
import Section from "components/Layout/Section";
import { PostsQuery } from "components/Post/Post";

const Posts = () => {
  return (
    <Section>
      <Heading title="Posts" subtitle="My latest blog posts" />
      <PostList />
    </Section>
  );
};

export const getStaticProps = async () => {
  // Apollo must be initialized on the server
  const apolloClient = initializeApollo();

  await apolloClient.query<PostsQuery>({ query: GET_POSTS });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
};

export default Posts;
