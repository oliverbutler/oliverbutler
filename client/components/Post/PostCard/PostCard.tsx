import Card from "components/Layout/Card";
import Icon from "components/Typography/Icon";
import BlurImage from "components/BlurImage";
import React from "react";
import { Posts_posts } from "queries/types/Posts";

type Props = {
  post: Posts_posts;
  ExteriorDiv?: any;
};
const PostCard: React.FunctionComponent<Props> = ({ post, ExteriorDiv }) => {
  const date = new Date(Date.parse(post.createdAt));

  return (
    <Card
      key={post.slug}
      ExteriorDiv={ExteriorDiv}
      image={<BlurImage image={post.image} className="h-64 w-full" />}
      href={`/posts/${post.slug}`}
      tags={post.tags}
      title={post.title}
      topText={date.toLocaleDateString("en-GB")}
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
