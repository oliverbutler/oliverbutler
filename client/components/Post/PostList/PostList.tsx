import { gql, useQuery } from "@apollo/client";
import { GET_POSTS } from "queries/postQuery";
import { Posts } from "queries/types/Posts";
import React from "react";
import PostCard from "../PostCard";

const PostList = () => {
  const { error, data } = useQuery<Posts>(GET_POSTS);

  if (error) return <h1>Error Loading Posts</h1>;

  const { posts } = data;

  return (
    <div className="flex flex-wrap -m-4">
      {posts.map((post) => (
        <PostCard post={post} />
      ))}
    </div>
  );
};

export default PostList;
