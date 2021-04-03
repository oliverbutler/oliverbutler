import Card from "components/Layout/Card";
import Icon from "components/Typography/Icon";
import Image from "components/Image";
import React from "react";
import { PostType } from "../Post";

type PostCardProps = {
  post: PostType;
};

const PostCard = ({ post }: PostCardProps) => {
  return (
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
      bottom={[
        <Icon
          icon="hourglass-outline"
          text={parseInt(post.reading_time.toString()) + " mins"}
        />,
      ]}
    />
  );
};

export default PostCard;
