import React from "react";
import { PostFile } from "utils/getPosts";
import PostCard from "./PostCard";

interface Props {
  posts: PostFile[];
}

const PostList: React.FunctionComponent<Props> = ({ posts }) => {
  return (
    <div className="flex flex-wrap -m-4 justify-center mt-6">
      {posts.map((post) => (
        <PostCard key={post.path} post={post} />
      ))}
    </div>
  );
};

export default PostList;
