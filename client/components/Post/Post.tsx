import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useRouter } from "next/router";
import Markdown from "components/Typography/Markdown";
import BlurImage from "components/BlurImage";
import Section from "components/Layout/Section";
import { GET_POST_SLUG } from "queries/postQuery";
import {
  PostsBySlug,
  PostsBySlug_posts_dynamic,
} from "queries/types/PostsBySlug";
import { SectionWidth } from "components/Layout/Section/Section";

const renderDynamicContent = (dynamic: PostsBySlug_posts_dynamic) => {
  switch (dynamic.__typename) {
    case "ComponentDisplayText":
      return (
        <Section width={SectionWidth.Narrow}>
          <Markdown>{dynamic.markdown}</Markdown>
        </Section>
      );
    case "ComponentDisplayImage":
      return (
        <>
          {dynamic.images.map((image, index) => (
            <Section width={SectionWidth.Narrow} noPadding>
              <BlurImage
                key={`image-${index}`}
                image={image}
                className="my-6 w-full mx-auto"
                fixed
                caption
              />
            </Section>
          ))}
        </>
      );
    case "ComponentDisplayGif":
      return (
        <Section width={SectionWidth.Narrow}>
          <img src={dynamic.url} className="mx-auto"></img>
          {dynamic.caption && (
            <p className="text-center mt-1">{dynamic.caption}</p>
          )}
        </Section>
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

  const date = new Date(Date.parse(post.createdAt));

  return (
    <>
      <Section width={SectionWidth.Narrow} noPadding>
        <h1 className="title-font text-3xl mb-4 font-medium dark:text-white text-black z-10">
          {post.title}
        </h1>
        <p className="leading-relaxed mb-2">{post.description}</p>
        <p className="leading-relaxed mb-8">
          {date.toDateString()} - {parseInt(post.readingTime.toString())} Min
          Read
        </p>
        <BlurImage image={post.image} className="w-full" fixed caption />
      </Section>
      {post.dynamic.map((dynamic) => renderDynamicContent(dynamic))}
    </>
  );
};

export default Post;
