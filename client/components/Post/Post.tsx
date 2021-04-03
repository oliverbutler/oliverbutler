import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useRouter } from "next/router";

type ImageType = {
  url: string;
  blurHash: string;
};

export type PostType = {
  title: string;
  slug: string;
  description: string;
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
    <div>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
    </div>
  );
};

export default Post;
