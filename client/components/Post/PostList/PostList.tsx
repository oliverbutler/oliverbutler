import { gql, useQuery } from "@apollo/client";
import { GET_POSTS } from "queries/postQuery";
import React from "react";
import { PostsQuery } from "../Post";
import PostCard from "../PostCard";

const PostList = () => {
  const { error, data } = useQuery<PostsQuery>(GET_POSTS, {
    notifyOnNetworkStatusChange: true,
  });

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
