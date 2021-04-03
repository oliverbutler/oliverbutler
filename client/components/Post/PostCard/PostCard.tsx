import Card from "components/Layout/Card";
import Icon from "components/Typography/Icon";
import Image from "components/Image";
import React from "react";
import { Post } from "queries/types/Post";

/**
 * Render a Post within a card.
 */
const PostCard = ({ post }: Post) => {
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
          text={parseInt(post.readingTime.toString()) + " mins"}
        />,
      ]}
    />
  );
};

export default PostCard;
