import React from "react";

import Link from "next/link";

import { gql } from "@apollo/client";
import client from "utils/apollo";
import Image from "components/Image";

type ImageType = {
  url: string;
  blurHash: string;
};

export type PostType = {
  title: string;
  slug: string;
  description: string;
  image: ImageType;
  content: string;
};

type PostsProps = {
  posts: [PostType];
  notFound: boolean;
};

const Posts = ({ posts, notFound }: PostsProps) => {
  if (notFound) return <></>;
  return (
    <div>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {posts.map((post) => (
            <div
              className="p-4 sm:w-1/2 lg:w-1/3 xl:w-1/4"
              key={`post-${post.slug}`}
            >
              <Link href={`/posts/${post.slug}`}>
                <div
                  className="h-full border-2 border-gray-200  dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer
               rounded-lg overflow-hidden"
                  onClick={() => {}}
                >
                  <Image
                    image={post.image}
                    alt="blog"
                    blur
                    className="h-60 w-full relative"
                  />
                  <div className="p-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                      TAGS
                    </h2>
                    <h1 className="title-font text-lg font-medium dark:text-white text-black mb-3">
                      {post.title}
                    </h1>
                    <p className="leading-relaxed mb-3">{post.description}</p>
                    <div className="flex items-center flex-wrap ">
                      <span className="text-gray-500 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 ">
                        <svg
                          className="w-4 h-4 mr-1"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        2min
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query Posts {
        posts {
          title
          slug
          description
          image {
            url
            blurHash
          }
        }
      }
    `,
  });

  return {
    props: { posts: data.posts },
  };
};

export default Posts;
