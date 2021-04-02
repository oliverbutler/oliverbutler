import { gql } from "@apollo/client";
import Section from "components/Layout/Section";
import Heading from "components/Typography/Heading";
import client from "utils/apollo";
import Image from "components/Image";

import { PostType } from ".";

type PostProps = {
  post: PostType;
};

const Post = ({ post }: PostProps) => {
  return (
    <Section>
      <Image
        image={post.image}
        alt="blog"
        blur
        className="w-full h-60 relative"
      />
      <Heading title={post.title} subtitle={post.description} />

      <p>{post.content}</p>
    </Section>
  );
};

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query Posts {
        posts {
          id
          slug
        }
      }
    `,
  });

  // Get the paths we want to create based on posts
  const paths = data.posts.map((post) => ({
    params: { slug: post.slug },
  }));

  // { fallback: false } means posts not found should 404.
  return { paths, fallback: false };
}

export const getStaticProps = async (context) => {
  const { data } = await client.query({
    query: gql`
      query Post {
        posts(where: { slug: "better-images-in-strapi-blurhash" }) {
          title
          description
          image {
            url
            blurHash
          }
          content
        }
      }
    `,
  });

  return {
    props: { post: data.posts[0] },
  };
};

export default Post;
