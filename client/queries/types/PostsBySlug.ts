/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PostsBySlug
// ====================================================

export interface PostsBySlug_posts_image {
  __typename: "UploadFile";
  url: string;
  blurHash: string | null;
}

export interface PostsBySlug_posts {
  __typename: "Post";
  title: string | null;
  slug: string | null;
  description: string | null;
  content: string | null;
  image: PostsBySlug_posts_image | null;
}

export interface PostsBySlug {
  posts: (PostsBySlug_posts | null)[] | null;
}

export interface PostsBySlugVariables {
  slug: string;
}