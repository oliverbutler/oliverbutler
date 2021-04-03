import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useRouter } from "next/router";
import Title from "components/Layout/Title";
import Markdown from "components/Typography/Markdown";
import Image from "components/Image";
import Section from "components/Layout/Section";
import { GET_POST_SLUG } from "queries/postQuery";
import { PostsBySlug } from "queries/types/PostsBySlug";

const Post = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { error, data } = useQuery<PostsBySlug>(GET_POST_SLUG, {
    variables: { slug },
  });

  if (error) return <h1>Error Loading Posts </h1>;

  const post = data.posts[0];

  return (
    <>
      <Title
        title={post.title}
        subtitle={post.description}
        image={
          <Image
            image={post.image}
            alt="blog"
            blur
            className="h-64 lg:h-96 mb-4 w-2/3 relative"
          />
        }
      />
      <Section>
        <Markdown>{post.content}</Markdown>
      </Section>
    </>
  );
};

export default Post;
