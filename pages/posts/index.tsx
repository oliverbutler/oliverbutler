import React from "react";

import Link from "next/link";

import { PostsOrPages } from "@tryghost/content-api";
import { getPosts } from "utils/post";

type PostsProps = {
  posts: PostsOrPages;
  notFound: boolean;
};

const Posts = ({ posts, notFound }: PostsProps) => {
  if (notFound) return <></>;
  return (
    <div>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {posts.map((post) => (
            <div className="p-4 md:w-1/3" key={`post-${post.slug}`}>
              <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src={post.feature_image}
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                    TAGS
                  </h2>
                  <h1 className="title-font text-lg font-medium text-white mb-3">
                    {post.title}
                  </h1>
                  <p className="leading-relaxed mb-3">{post.excerpt}</p>
                  <div className="flex items-center flex-wrap ">
                    <Link href={`/posts/${post.slug}`}>
                      <a className="text-purple-400 inline-flex items-center md:mb-2 lg:mb-0">
                        Learn More
                        <svg
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </Link>
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
                      {post.reading_time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const posts = await getPosts();

  if (!posts) {
    return {
      notFound: true,
    };
  }

  return {
    props: { posts },
  };
};

export default Posts;
