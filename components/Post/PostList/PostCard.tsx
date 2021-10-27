import Card from "components/Layout/Card/Card";
import React from "react";
import { PostFile } from "utils/getPosts";
import Image from "next/image";

type Props = {
  post: PostFile;
};
const PostCard: React.FunctionComponent<Props> = ({ post }) => {
  return (
    <Card
      key={post.path}
      image={
        <div className="h-64 relative">
          <Image
            src={post.meta.image}
            layout="fill"
            placeholder="blur"
            objectFit="cover"
            alt="post thumbnail"
          />
        </div>
      }
      href={`/blog/${post.path}`}
      tags={post.meta.tags}
      title={post.meta.title}
      topText={post.meta.date}
      content={post.meta.description}
    />
  );
};

export default PostCard;
