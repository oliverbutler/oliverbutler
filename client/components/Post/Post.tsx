import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useRouter } from "next/router";
import Title from "components/Layout/Title";
import Markdown from "components/Typography/Markdown";
import Image from "components/Image";
import Section from "components/Layout/Section";

type ImageType = {
  url: string;
  blurHash: string;
};

export type PostType = {
  title: string;
  slug: string;
  description: string;
  reading_time: number;
  image: ImageType;
  content: string;
};

export type PostsQuery = {
  posts: [PostType];
};

export const GET_POST_SLUG = gql`
  query Posts($slug: String) {
    posts(where: { slug: $slug }) {
      title
      slug
      description
      content
      image {
        url
        blurHash
      }
    }
  }
`;

export const GET_POST_PATHS = gql`
  query Posts {
    posts {
      slug
    }
  }
`;

const Post = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { error, data } = useQuery<PostsQuery>(GET_POST_SLUG, {
    variables: { slug },
  });

  if (error) return <h1>Error Loading Posts </h1>;

  const post = data.posts[0];

  return (
    <>
      <Image
        image={post.image}
        alt="blog"
        blur
        className="h-64 lg:h-96  w-full relative"
      />
      <Title title={post.title} subtitle={post.description} />
      <Section>
        <Markdown>{post.content}</Markdown>
      </Section>
    </>
  );
};

export default Post;
