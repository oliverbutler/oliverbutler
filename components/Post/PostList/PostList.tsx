import React from "react";
import { PostFile } from "utils/getPosts";
import PostCard from "./PostCard";

interface Props {
  posts: PostFile[];
}

const isProduction = process.env.NODE_ENV === "production";

const PostList: React.FunctionComponent<Props> = ({ posts }) => {
  const postsToDisplay = isProduction
    ? posts.filter((post) => !post.meta.draft)
    : posts;

  const orderedPosts = postsToDisplay.sort((a, b) => {
    return b.meta.id - a.meta.id;
  });

  return (
    <div className="flex flex-wrap -m-4 justify-center mt-6">
      {orderedPosts.map((post) => (
        <PostCard key={post.path} post={post} />
      ))}
    </div>
  );
};

export default PostList;
