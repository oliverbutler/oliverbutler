/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Post
// ====================================================

export interface Post_post_tags {
  __typename: "Tag";
  name: string | null;
}

export interface Post_post_image {
  __typename: "UploadFile";
  url: string;
  blurHash: string | null;
  width: number | null;
  height: number | null;
  alternativeText: string | null;
}

export interface Post_post {
  __typename: "Post";
  title: string | null;
  slug: string | null;
  description: string | null;
  readingTime: number | null;
  updatedAt: any;
  createdAt: any;
  published_at: any | null;
  tags: (Post_post_tags | null)[] | null;
  image: Post_post_image | null;
}

export interface Post {
  post: Post_post | null;
}

export interface PostVariables {
  id: string;
}
