import { gql, useQuery } from "@apollo/client";
import Image from "components/Image";
import Card from "components/Layout/Card";
import Icon from "components/Typography/Icon/Icon";
import Link from "next/link";
import React from "react";
import { PostsQuery } from "../Post";

export const GET_POSTS = gql`
  query Posts {
    posts {
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

const PostList = () => {
  const { loading, error, data } = useQuery<PostsQuery>(GET_POSTS, {
    notifyOnNetworkStatusChange: true,
  });

  if (error) return <h1>Error Loading Posts</h1>;

  const { posts } = data;

  return (
    <div className="flex flex-wrap -m-4">
      {posts.map((post) => (
        <Card
          image={
            <Image
              image={post.image}
              alt="blog"
              blur
              className="h-52 w-full relative"
            />
          }
          key={`post-${post.slug}`}
          href={`/posts/${post.slug}`}
          tags="TAGS"
          title={post.title}
          content={post.description}
          bottom={[<Icon icon="hourglass-outline" text="5 Mins" />]}
        />
      ))}
    </div>
  );
};

export default PostList;
