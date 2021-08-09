import Card from "components/Layout/Card";
import Icon from "components/Typography/Icon";
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
        <Image
          src={post.meta.image}
          width={1000}
          height={600}
          className="h-64 w-full"
        />
      }
      href={`/posts/${post.path}`}
      // tags={post.tags}
      title={post.meta.title}
      topText={post.meta.date}
      content={post.meta.description}
      bottom={[
        <Icon
          icon="hourglass-outline"
          text={parseInt(post.meta.readTime.toString()) + " mins"}
        />,
      ]}
    />
  );
};

export default PostCard;
