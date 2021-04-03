import Section from "components/Layout/Section";
import Post from "components/Post";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  GET_POST_PATHS,
  GET_POST_SLUG,
  PostsQuery,
} from "components/Post/Post";

import React from "react";
import { addApolloState, initializeApollo } from "utils/apollo";

const IndividualPost = () => {
  return (
    <Section>
      <Post />
    </Section>
  );
};

// In order to build all the posts at build we *must* first figure out what all
// of the posts are, as such, we do a query to search through them all
export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<PostsQuery>({
    query: GET_POST_PATHS,
  });

  const paths = data.posts.map((post) => ({ params: { slug: post.slug } }));

  return { paths, fallback: false };
};

// At build time (and max every second) we fetch the data into the apollo cache
export const getStaticProps: GetStaticProps = async (context) => {
  const apolloClient = initializeApollo();

  const slug = context.params.slug;

  await apolloClient.query<PostsQuery>({
    query: GET_POST_SLUG,
    variables: { slug },
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
};

export default IndividualPost;
