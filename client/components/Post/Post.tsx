import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useRouter } from "next/router";
import Title from "components/Layout/Title";
import Markdown from "components/Typography/Markdown";
import BlurImage from "components/BlurImage";
import NextImage from "next/image";
import Section from "components/Layout/Section";
import { GET_POST_SLUG } from "queries/postQuery";
import {
  PostsBySlug,
  PostsBySlug_posts_dynamic,
} from "queries/types/PostsBySlug";
import Image from "components/Image";

const renderDynamicContent = (dynamic: PostsBySlug_posts_dynamic) => {
  switch (dynamic.__typename) {
    case "ComponentDisplayText":
      return <Markdown>{dynamic.markdown}</Markdown>;
    case "ComponentDisplayImage":
      return (
        <>
          {dynamic.images.map((image, index) => (
            <BlurImage
              key={`image-${index}`}
              image={image}
              className="my-6 w-full md:w-2/3 mx-auto"
              fixed
            />
          ))}
        </>
      );
  }
};

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
          <BlurImage
            image={post.image}
            className="mb-4 -mt-4 w-full md:w-2/3"
            fixed
          />
        }
      />
      <Section>
        {post.dynamic.map((dynamic) => renderDynamicContent(dynamic))}
      </Section>
    </>
  );
};

export default Post;
