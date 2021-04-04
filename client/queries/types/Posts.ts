/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Posts
// ====================================================

export interface Posts_posts_tags {
  __typename: "Tag";
  name: string | null;
}

export interface Posts_posts_image {
  __typename: "UploadFile";
  url: string;
  blurHash: string | null;
}

export interface Posts_posts {
  __typename: "Post";
  title: string | null;
  slug: string | null;
  description: string | null;
  readingTime: number | null;
  updatedAt: any;
  createdAt: any;
  published_at: any | null;
  tags: (Posts_posts_tags | null)[] | null;
  image: Posts_posts_image | null;
}

export interface Posts {
  posts: (Posts_posts | null)[] | null;
}
